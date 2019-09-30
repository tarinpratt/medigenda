import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import moment from 'moment'
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './editUpcomingAppt.css'

class EditUpcomingAppt extends Component {
    constructor(props) {
        super(props);
        this.state = {
          upcomingAppts: [],
          appt_date: '', 
          appt_time: '', 
          appt_doctor: '', 
          appt_location: '', 
          appt_purpose: '', 
          appt_notes: '',
          upcoming_appt: ''
        };
    }
    componentDidMount() {
        const upcomingApptId = this.props.match.params.upcomingApptId
        fetch(`${config.API_ENDPOINT}/upcoming_appts/${upcomingApptId}`, {
          method: 'GET',
          headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`
        }
     })
      .then(res => {
          if(!res.ok)
             return res.json().then(error => Promise.reject(error))
             return res.json()
      })
          .then(responseData => {
            this.setState({
                id: responseData.id,
                appt_date: responseData.appt_date, 
                appt_time: responseData.appt_time, 
                appt_doctor: responseData.appt_doctor, 
                appt_location: responseData.appt_location, 
                appt_purpose: responseData.appt_purpose, 
                appt_notes: responseData.appt_notes,
                upcoming_appt: responseData.upcoming_appt,
                upcomingAppts: [...this.state.upcomingAppts, responseData]
            })
          })
          .catch(error => {
              console.error(error)
              this.setState({error})
          })
      }

      handleChangeApptDate = e => {
        this.setState({ appt_date: e.target.value })
      };
      handleChangeApptTime = e => {
        this.setState({ appt_time : e.target.value })
      };
      handleChangeApptLocation = e => {
        this.setState({ appt_location: e.target.value })
      };
      handleChangeApptDoctor = e => {
        this.setState({ appt_doctor: e.target.value })
      };
      handleChangeApptPurpose = e => {
        this.setState({ appt_purpose: e.target.value })
      };
      handleChangeApptNotes = e => {
        this.setState({ appt_notes: e.target.value })
      };
      handleChangeUpcomingAppt = e => {
        this.setState({ upcoming_appt: e.target.value })
      };

      handleSubmit = e => {
        e.preventDefault()
        const { upcomingApptId } = this.props.match.params
        const { id, appt_date, appt_time, appt_doctor, appt_location, appt_purpose, appt_notes, upcoming_appt } = this.state
        const updatedAppt = {id, appt_date, appt_time, appt_doctor, appt_location, appt_purpose, appt_notes, upcoming_appt }

        fetch(`${config.API_ENDPOINT}/upcoming_appts/${upcomingApptId}`, {
       method: 'PATCH',
       body: JSON.stringify(updatedAppt),
       headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
     }
  })
  .then(res => {
      if(!res.ok)
          return res.json().then(error => Promise.reject(error))
  })
  .then(() => {
      this.resetFields(updatedAppt)
      this.props.history.push('/UpcomingAppts')
  })
  .catch(error => {
      console.error(error)
      this.setState({error})
  })

    }
    resetFields = (newFields) => {
      this.setState({
        id: newFields.id || '',
        appt_date: newFields.appt_date || '',
        appt_time: newFields.appt_time || '',
        appt_doctor: newFields.appt_doctor || '',
        appt_location: newFields.appt_location || '',
        appt_purpose: newFields.appt_purpose || '',
        appt_notes: newFields.appt_notes || '',
        upcoming_appt: newFields.upcoming_appt || ''
      })
    }

  

    render() {

      const editUpcomingAppt = this.state.upcomingAppts.map((listing, index) => (
        <ul key={index} className="appt_date">
                <li>{(moment(new Date(listing.appt_date)).add(1, 'day').format('MM / DD / YYYY'))}</li>
             </ul>
      ))

        return(
            <form id='editUpcomingApptForm' onSubmit={this.handleSubmit}>
              <h3>{editUpcomingAppt}</h3>
         <div className='editApptDate'>
             <label htmlFor='editApptForm_appt_date'>
                 New Date
                 <input 
                 name='appt_date'
                 type='date'
                 value={this.state.appt_date}
                 onChange={this.handleChangeApptDate}
                 id='editApptForm_appt_date'>
                 </input>
             </label>
         </div>
         <div className='editApptTime'>
             <label htmlFor='editApptForm_appt_time'>
                 New Time
                 <input 
                 name='appt_time'
                 type='time'
                 value={this.state.appt_time}
                 onChange={this.handleChangeApptTime}
                 id='editApptForm_appt_time'>
                 </input>
             </label>
         </div>
         <div className='editApptDoctor'>
             <label htmlFor='editApptForm_appt_doctor'>
                 New Doctor
                 <input 
                 name='appt_doctor'
                 type='text'
                 value={this.state.appt_doctor}
                 onChange={this.handleChangeApptDoctor}
                 id='editApptForm_appt_doctor'>
                 </input>
             </label>
         </div>
         <div className='editApptLocation'>
             <label htmlFor='editApptForm_apptLocation'>
                 New Location
                 <input 
                 name='appt_location'
                 type='text'
                 value={this.state.appt_location}
                 onChange={this.handleChangeApptLocation}
                 id='editApptForm_apptLocation'>
                 </input>
             </label>
         </div>
         <div className='editApptPurpose'>
             <label htmlFor='editApptForm_apptPurpose'>
                 New Purpose
                 <input 
                 name='appt_purpose'
                 type='text'
                 value={this.state.appt_purpose}
                 onChange={this.handleChangeApptPurpose}
                 id='editApptForm_apptPurpose'>
                 </input>
             </label>
         </div>
         <div className='editApptNotes'>
             <label htmlFor='editPastApptForm_apptNotes'>
                 Other Notes
                 <textarea 
                 wrap="soft"
                 name='appt_notes'
                 type='text'
                 value={this.state.appt_notes}
                 onChange={this.handleChangeApptNotes}
                 id='editApptForm_apptNotes'>
                 </textarea>
             </label>
         </div>
         <div className='editUpcomingAppt'>
            <label htmlFor='edit_upcoming_appt'>
                Attended?
                <input
                 type='radio'
                 name='upcoming_appt' 
                 value={this.state.upcoming_appt}
                 onChange={this.handleChangeUpcomingAppt}
                 value="true"
                 required>
                </input>
                No
                <input
                 type='radio'
                 name='upcoming_appt' 
                 value={this.state.upcoming_appt}
                 onChange={this.handleChangeUpcomingAppt}
                 value="false">
                </input>
                Yes
            </label>
         </div>
         <button type='submit'><span><FontAwesomeIcon icon={faNotesMedical} size="1x" className="addNote" /></span>
             Save
         </button>
         {/* <button className="apptCardButtonsList" >
                 Attended
             </button> */}
     </form>

        )
    }


        
    }

export default EditUpcomingAppt;