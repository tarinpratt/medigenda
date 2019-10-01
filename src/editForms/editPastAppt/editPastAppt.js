import React, { Component } from 'react'
import config from '../../config'
import { formatTime } from '../../functionHelpers'
import TokenService from '../../services/token-service'
import { faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment'
import './editPastAppt.css'

class EditPastAppt extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pastAppts: [],
          copay: '',
          doc_bill: '',
          insurance_bill: '',
          appt_notes: '',
          showAppt: false
        };
        this.renderAppts = this.renderAppts.bind(this)
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
           copay: responseData.copay,
           doc_bill: responseData.doc_bill,
           insurance_bill: responseData.insurance_bill,
           app_notes: responseData.appt_notes,
           pastAppts: [...this.state.pastAppts, responseData]
          })
        })
        .catch(error => {
            console.error(error)
            this.setState({error})
        })
    }

      handleChangeCopay = e => {
        this.setState({ copay: e.target.value })
      };
      handleChangeDocBill = e => {
        this.setState({ doc_bill : e.target.value })
      };
      handleChangeInsuranceBill = e => {
        this.setState({ insurance_bill: e.target.value })
      };
      handleChangeOtherNotes = e => {
        this.setState({ appt_notes: e.target.value })
      };

      handleSubmit = e => {
        e.preventDefault()
        const { upcomingApptId } = this.props.match.params
        const { id, copay, doc_bill, insurance_bill, appt_notes } = this.state
        const updatedAppt = {id, copay, doc_bill, insurance_bill, appt_notes }

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
            this.props.history.push('/pastAppts')
        })
        .catch(error => {
            console.error(error)
            this.setState({error})
        })
    }
        resetFields = (newFields) => {
          this.setState({
            id: newFields.id || '',
            copay: newFields.copay || '',
            doc_bill: newFields.doc_bill || '',
            insurance_bill: newFields.insurance_bill || '',
            appt_notes: newFields.appt_notes || '',
          })
    }

        handleDelete = e =>  {
          e.preventDefault()
          const { upcomingApptId } = this.props.match.params
          fetch(`${config.API_ENDPOINT}/upcoming_appts/${upcomingApptId}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
            }
          })
          .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
            this.props.history.push('/pastAppts')
          })
          .catch(error => {
            console.error(error)
          })
        }


  renderAppts() { 
    this.setState({ showAppt: !this.state.showAppt })
  }

    render() {

      const pastApptDate = this.state.pastAppts.map((listing, index) => (
        <h4 key={index} className="apptDate">
            {(moment(new Date(listing.appt_date)).add(1, 'day').format('MM / DD / YYYY'))}
        </h4>
        )
      )

      const fullPastAppt = this.state.pastAppts.map((listing, index) => (
        <ul key={index} className="editApptCardListing">
             <li className="apptTime">
                 {formatTime(listing.appt_time)}
             </li>
             <li className="apptLocation">
                 {listing.appt_location}
             </li>
             <li className="apptDoctor">
                 {listing.appt_doctor}
             </li>
             <li className="apptPurpose">
                 {listing.appt_purpose}
             </li>
             <li className="apptNotes">
             {listing.appt_notes}
             </li>
             </ul>
        )
      )
    
      const { error } = this.state

        return (
          <form id='editPastApptForm' onSubmit={this.handleSubmit}>
            <div className='EditBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
            </div>
            <section className="editPastApptDate" onClick={this.renderAppts}>{pastApptDate}</section>
            { this.state.showAppt ?
            fullPastAppt
            : null
            }
            <section className="editBilling">
         <div className='editCopay'>
             <label htmlFor='editPastApptForm_copay'>
                 Copay
                 <input 
                 name='copay'
                 type='text'
                 value={this.state.copay}
                 onChange={this.handleChangeCopay}
                 id='editPastApptForm_copay'>
                 </input>
             </label>
         </div>
         <div className='editDocBill'>
             <label htmlFor='editPastApptForm_docBill'>
                 Bill From Doctor
                 <input 
                 name='doc_bill'
                 type='text'
                 value={this.state.doc_bill}
                 onChange={this.handleChangeDocBill}
                 id='editPastApptForm_docBill'>
                 </input>
             </label>
         </div>
         <div className='insuranceBill'>
             <label htmlFor='editPastApptForm_insuranceBill'>
                 Insurance Says I owe
                 <input 
                 name='insurance_bill'
                 type='text'
                 value={this.state.insurance_bill}
                 onChange={this.handleChangeInsuranceBill}
                 id='editPastApptForm_insuranceBill'>
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
                 onChange={this.handleChangeOtherNotes}
                 id='editPastApptForm_apptNotes'>
                 </textarea>
             </label>
         </div>
         <button type='submit' onClick={this.handleSubmit} className="editPastApptButton">
           <span><FontAwesomeIcon icon={faSave} size="1x" className="addNote" />
           </span>
             Save
         </button>
         <button type='submit' onClick={this.handleDelete} className="editPastApptButton">
           <span><FontAwesomeIcon icon={faTrashAlt} size="1x" className="addNote" />
           </span>
             Delete
         </button>
         </section>
     </form>
      
        )
}
}
export default EditPastAppt;