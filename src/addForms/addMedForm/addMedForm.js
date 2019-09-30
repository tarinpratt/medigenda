import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './addMedForm.css';
import MedLogApiService from './../../services/medlog-api-service';
import { faPrescription, faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddMedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medlog: []
        };
    }
      handleSubmit = ev => {
        ev.preventDefault()
        const { date, time, medname, amounttaken, reason } = ev.target
        MedLogApiService.postEntry(
            date.value,
            time.value,
            medname.value,
            amounttaken.value, 
            reason.value )
        .then((med) => {
            this.setState({
                medlog: [...this.state.medlog, med]
            })
            this.props.history.push('/medlog')
        })
      }
    
    render() {
      
  return (
     <form id='addMedForm' onSubmit={this.handleSubmit}>
         <h3>New Medication Entry <span><FontAwesomeIcon icon={faPrescription} size="2x" className="rx" /></span></h3>
         
         <div className='medDate'>
             <label htmlFor='addMedForm_medDate'>
                 Date 
                 <input 
                 name='date'
                 type='date'
                 required
                 id='addMedForm_medDate'>
                 </input>
             </label>
         </div>
         <div className='time'>
             <label htmlFor='addMedForm_time'>
                 Time
                 <input 
                 name='time'
                 type='time'
                 required
                 id='addMedForm_time'>
                 </input>
             </label>
         </div>
         <div className='medName'>
             <label htmlFor='addMedForm_medName'>
                 Medication Name
                 <input 
                 name='medname'
                 type='text'
                 required
                 id='addMedForm_medName'>
                 </input>
             </label>
         </div>
         <div className='amountTaken'>
             <label htmlFor='addMedForm_amountTaken'>
                 Amount Taken
                 <input 
                 name='amounttaken'
                 type='text'
                 placeholder='1/2 pill'
                 required
                 id='addMedForm_amountTaken'>
                
                 </input>
             </label>
         </div>
         <div className='reasonForIntake'>
             <label htmlFor='addMedForm_reasonForIntake'>
                 Reason For Intake
                 <input 
                 name='reason'
                 type='text'
                 placeholder='pain'
                 required
                 id='addMedForm_reasonForIntake'>
                 </input>
             </label>
         </div>
         <Link to='/medlog'><button className="addApptButtons" type="submit">Back</button></Link>
         <button type='submit'><span><FontAwesomeIcon icon={faNotesMedical} size="1x" className="addNote" /></span>
             Add Entry
         </button>
        
     </form>
  );
}
}

export default AddMedForm;