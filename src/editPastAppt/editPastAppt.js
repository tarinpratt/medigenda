import React, { Component } from 'react'
import config from '../config'
import TokenService from '../services/token-service'
import moment from 'moment'
import './editPastAppt'

class EditPastAppt extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pastAppts: [],
          copay: '',
          doc_bill: '',
          insurance_bill: '',
          appt_notes: '',
        };
        this.tConvert = this.tConvert.bind(this);
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
        //return res.json()
      })
      .catch(error => {
        console.error(error)
      })
  }

  tConvert (time) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { // If time format correct
      time = time.slice (1); 
      time = time.slice (0, 3); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }



    

    


    render() {
      const editPastAppt = this.state.pastAppts.map((listing, index) => (
        <ul key={index} className="apptCardListing">
        <li onClick={e => this.onSort(e, 'appt_date')}className="apptDate">
                {(moment(new Date(listing.appt_date)).add(1, 'day').format('MM / DD / YYYY'))}
             </li>
             <li className="apptTime">
                 {this.tConvert(listing.appt_time)}
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
      ))
    
      const { error } = this.state
        return (
          <form id='editPastApptForm' onSubmit={this.handleSubmit}>
            <div className='EditBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
            </div>
            {editPastAppt}
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
                 <input 
                 name='appt_notes'
                 type='text'
                 value={this.state.appt_notes}
                 onChange={this.handleChangeOtherNotes}
                 id='editPastApptForm_apptNotes'>
                 </input>
             </label>
         </div>
         <button type='submit' onClick={this.handleSubmit}>
             Save
         </button>
         <button type='submit' onClick={this.handleDelete}>
             Delete
         </button>
     </form>
      
        )
}
}
export default EditPastAppt;