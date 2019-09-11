import React, { Component } from 'react';
import './addMedForm.css';

class AddMedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medDate: '',
            time: '',
            medName: '',
            amountTaken: '',
            reasonForIntake: '',

        };
    }

    handleChangeMedDate = e => {
        this.setState({ medDate: e.target.value })
      };
    
      handleChangeTime = e => {
        this.setState({ time: e.target.value })
      };
    
      handleChangeMedName = e => {
        this.setState({ medName: e.target.value })
      };
    
      handleChangeAmountTaken = e => {
        this.setState({ amountTaken: e.target.value })
      };
      handleChangeReasonForIntake = e => {
        this.setState({ reasonForIntake: e.target.value })
      };


    render() {
      
  return (
     <form id='addMedForm' onSubmit={this.handleSubmit}>
         <h3>New Entry</h3>
         <div className='medDate'>
             <label htmlFor='addMedForm_medDate'>
                 Date 
                 <input 
                 name='medDate'
                 type='date'
                 value={this.state.medDate}
                 onChange={this.handleChangeMedDate}
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
                 value={this.state.time}
                 onChange={this.handleChangeTime}
                 required
                 id='addMedForm_time'>
                 </input>
             </label>
         </div>
         <div className='medName'>
             <label htmlFor='addMedForm_medName'>
                 Medication Name
                 <input 
                 name='medName'
                 type='text'
                 value={this.state.medName}
                 onChange={this.handleChangeMedName}
                 required
                 id='addMedForm_medName'>
                 </input>
             </label>
         </div>
         <div className='amountTaken'>
             <label htmlFor='addMedForm_amountTaken'>
                 Amount Taken
                 <input 
                 name='amountTaken'
                 type='number'
                 value={this.state.amountTaken}
                 onChange={this.handleChangeAmountTaken}
                 required
                 id='addMedForm_amountTaken'>
                 </input>
             </label>
         </div>
         <div className='reasonForIntake'>
             <label htmlFor='addMedForm_reasonForIntake'>
                 Reason For Intake
                 <input 
                 name='reasonForIntake'
                 type='text'
                 value={this.state.reasonForIntake}
                 onChange={this.handleChangeReasonForIntake}
                 required
                 id='addMedForm_reasonForIntake'>
                 </input>
             </label>
         </div>
         <button type='submit'>
             Add Entry
         </button>
        
     </form>
  );
}
}

export default AddMedForm;