import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Calendar from '../calendar/calendar'
import './upcomingAppts.css';

class UpcomingAppts extends Component {



    render() {

        const upcomingApptList = this.props.store.upcomingAppts.map((listing, index) => (
            
            <ul key={index} className="apptCardListing">
            <li className="apptDate">
                    {(new Date(listing.apptDate)).toLocaleDateString()}
                 </li>
                 <li className="apptTime">
                     {listing.apptTime}
                 </li>
                 <li className="apptLocation">
                     {listing.apptLocation}
                 </li>
                 <li className="apptDoctor">
                     {listing.apptDoctor}
                 </li>
                 <li className="apptPurpose">
                     {listing.apptPurpose}
                 </li>
            </ul>
          )
          )
          const additionalNotes = this.props.store.upcomingAppts.map((listing, index) => (
              <ul key={index}>
            <li>
                {listing.apptNotes}
            </li> 
            </ul> 
          ))
        
  return (
     <div className="myUpcomingAppts">
         <h1 className="myUpcomingApptsHeader"> My Upcoming Appointments</h1>
         <Calendar
          />
          <div className="apptCard">
         <div className="apptCardInfo">
             {upcomingApptList}
             <div className="dropNoteContent">
                 {additionalNotes}
            </div>
            </div>
             <div className="apptCardButtons">
             <button className="apptCardButtonsList" type="submit">
                 Edit
             </button>
             <button className="apptCardButtonsList" type="submit">
                 Attended
             </button>
             </div>
             </div>
         
         <Link to='/addAppt' className="addApptLink">+ Add New Appointment</Link>

      </div>
 
  );
}
}
export default UpcomingAppts;