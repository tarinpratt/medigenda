import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './addAppt.css';

class AddAppt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apptDate: '',
            time: '',
            apptLocation: '',
            apptDoctor: '',
            purposeForVisit: '',
            apptNotes: '',
        };
    }

    handleChangeApptDate = e => {
        this.setState({ apptDate: e.target.value })
      };
      handleChangeTime = e => {
        this.setState({ time: e.target.value })
      };
      handleChangeApptLocation = e => {
        this.setState({ apptLocation: e.target.value })
      };
      handleChangeApptDoctor = e => {
        this.setState({ apptDoctor: e.target.value })
      };
      handleChangePurposeForVisit = e => {
        this.setState({ purposeForVisit: e.target.value })
      };
      handleChangeApptNotes = e => {
        this.setState({ apptNotes: e.target.value })
      };

    render() {
        
  return (
     <form id='addApptForm'>
         <h3>Add My Appointment</h3>
         <div className='apptDate'>
             <label htmlFor='addApptForm_apptDate'>
                 Date 
                 <input 
                 name='apptDate'
                 type='date'
                 value={this.state.apptDate}
                 onChange={this.handleChangeApptDate}
                 required
                 id='addApptForm_apptDate'>
                 </input>
             </label>
         </div>
         <div className='apptTime'>
             <label htmlFor='addApptForm_apptTime'>
                 Time
                 <input 
                 name='time'
                 type='time'
                 value={this.state.time}
                 onChange={this.handleChangeTime}
                 required
                 id='addApptForm_apptTime'>
                 </input>
             </label>
         </div>
         <div className='apptLocation'>
             <label htmlFor='addApptForm_apptLocation'>
                 Location
                 <input 
                 name='apptLocation'
                 type='text'
                 value={this.state.apptLocation}
                 onChange={this.handleChangeApptLocation}
                 required
                 id='addApptForm_apptLocation'>
                 </input>
             </label>
         </div>
         <div className='apptDoctor'>
             <label htmlFor='addApptForm_apptDoctor'>
                 Doctor
                 <input 
                 name='apptDoctor'
                 type='text'
                 value={this.state.apptDoctoe}
                 onChange={this.handleChangeApptDoctor}
                 required
                 id='addApptForm_apptDoctor'>
                 </input>
             </label>
         </div>
         <div className='purposeForVisit'>
             <label htmlFor='addApptForm_purposeForVisit'>
                 Purpose For Visit
                 <input 
                 name='purposeForVisit'
                 type='text'
                 value={this.state.purposeForVisit}
                 onChange={this.handleChangePurposeForVisit}
                 required
                 id='addApptForm_purposeForVisit'>
                 </input>
             </label>
         </div>
         <div className='apptNotes'>
             <label htmlFor='addApptForm_apptNotes'>
                 Additional Notes
                 <input 
                 name='apptNotes'
                 type='text'
                 value={this.state.apptNotes}
                 onChange={this.handleChangeApptNotes}
                 required
                 id='addApptForm_apptNotes'>
                 </input>
             </label>
         </div>
        
         <button className="addApptButtons" type='submit'>
             Submit
         </button>
         <Link to='/upcomingAppts'><button className="addApptButtons" type="submit">Back</button></Link>
        
     </form>
  );
}
}

export default AddAppt;