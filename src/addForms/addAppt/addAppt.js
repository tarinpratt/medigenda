import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { faNotesMedical, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpcomingApptsApiService from './../../services/upcoming_appts-api-service';
import './addAppt.css';

class AddAppt extends Component {
       constructor(props) {
        super(props);
        this.state = {
            apptEntries: []
        };
    }
    
    static defaultProps = {
        copay: '0',
        doc_bill: '0',
        insurance_bill: '0',
        upcoming_appt: true
      }

      handleSubmit = ev => {
        ev.preventDefault()
        const { appt_date, appt_time, appt_doctor, appt_location, appt_purpose, appt_notes } = ev.target

        UpcomingApptsApiService.postEntry(
            appt_date.value, 
            appt_time.value, 
            appt_doctor.value, 
            appt_location.value, 
            appt_purpose.value, 
            appt_notes.value, 
            this.props.copay,
            this.props.doc_bill,
            this.props.insurance_bill,
            this.props.upcoming_appt
            )
            .then((appt) => {
            this.setState({
                apptEntries: [...this.state.apptEntries, appt]
            })
            this.props.history.push('/upcomingAppts')
        })
        
      }

    render() {
             
  return (
     <form id='addApptForm' role='post' onSubmit={this.handleSubmit}>
         <h3>Add My Appointment</h3>
         <section className="addAppt">
         <div className='apptDate'>
             <label htmlFor='addApptForm_apptDate'>
                 Date 
                 <input 
                 name='appt_date'
                 type='date'
                 required
                 id='addApptForm_apptDate'>
                 </input>
             </label>
         </div>
         <div className='apptTime'>
             <label htmlFor='addApptForm_apptTime'>
                 Time
                 <input 
                 name='appt_time'
                 type='time'
                 required
                 id='addApptForm_apptTime'>
                 </input>
             </label>
         </div>
         <div className='apptLocation'>
             <label htmlFor='addApptForm_apptLocation'>
                 Location
                 <input 
                 name='appt_location'
                 type='text'
                 required
                 id='addApptForm_apptLocation'>
                 </input>
             </label>
         </div>
         <div className='apptDoctor'>
             <label htmlFor='addApptForm_apptDoctor'>
                 Doctor
                 <input 
                 name='appt_doctor'
                 type='text'
                 required
                 id='addApptForm_apptDoctor'>
                 </input>
             </label>
         </div>
         <div className='purposeForVisit'>
             <label htmlFor='addApptForm_purposeForVisit'>
                 Purpose For Visit
                 <textarea 
                 wrap="soft"
                 name='appt_purpose'
                 type='text'
                 required
                 id='addApptForm_purposeForVisit'>
                 </textarea>
             </label>
         </div>
         <div className='apptNotes'>
             <label htmlFor='addApptForm_apptNotes'>
                 Additional Notes
                 <textarea 
                 wrap="soft"
                 name='appt_notes'
                 type='text'
                 id='addApptForm_apptNotes'
                 > 
                 </textarea>
             </label>
         </div>
         <section className="submitApptButtons">
         <Link to='/upcomingAppts'><button className="addApptButtons" type="submit"><span><FontAwesomeIcon icon={faArrowLeft} className="addNote" /></span>Back</button></Link>
         <button className="addApptButtons" type='submit'><span><FontAwesomeIcon icon={faNotesMedical} size="1x" className="addNote" /></span>Submit
         </button>
         </section>
         </section>
         
        
     </form>
  );
}
}

export default AddAppt;