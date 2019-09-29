import React, { Component } from 'react';
import moment from 'moment'

class UpcomingApptsDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            showAppts: true
        };
        this.tConvert = this.tConvert.bind(this)      
    }

    handleChangeDate = e => {
        this.setState({ date: e.target.value })
      };
      renderAppts() {
        this.setState({
          showAppts: !this.state.showAppts
        })
      }

      tConvert (time) {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];    
        if (time.length > 1) { // If time format correct
          time = time.slice (1);
          time = time.slice (0, 3);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }

      handleAlert() {
          alert("You must register for an account to add or alter appointments.")
      }

   
    

    render() {
       const upcomingAppts= [
            {
                id: '1',
                appt_date: '2019-11-23',
                appt_time: '11:30 am',
                appt_doctor: 'Dr.Nagaiah',
                appt_location: 'Arizona Oncology',
                appt_purpose: 'bloodwork',
                appt_notes: `Don't forget to ask why copay was more on last visit.`,
                copay: '$30',
                doc_bill: '$0',
                insurance_bill: '$0',
                upcoming_appt: true  
            },
            {
                id: '2',
                appt_date: '2019-11-15',
                appt_time: '10:30 am',
                appt_doctor: 'Dr.Nagaiah',
                appt_location: 'Arizona Oncology',
                appt_purpose: 'chemo treatment #3',
                appt_notes: 'Take lorazepam 30 min before to avoid anxiety attack.',
                copay: '$45',
                doc_bill: '$75.26',
                insurance_bill: '$0',
                upcoming_appt: true            
            }
        ]
              
         const upcomingApptList = upcomingAppts.map((listing, index) => (
           <div key={index} className="upcomingApptCard">
              <div className="upcomingAppt">
            <ul className="apptCardListing">
            <li className="apptDate">
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
                 </ul>
                 <ul className="otherNotes">
                 <li className="apptNotes">
                 {listing.appt_notes}
                 </li>
                 </ul>
                 </div>
                  <div className="apptCardButtons">
                  <button className="upApptEdit" onClick={this.handleAlert}>
                  Edit
                  </button>
                  </div>
            
            </div>
            )
          )

          const searchDates = upcomingAppts
          .filter((dates) => dates.appt_date === this.state.date)
          //map through only the selected input date for rendering
          const dateSearched = searchDates.map((listing, index) => (          
            <div key={index} className="upcomingApptCard">
            <div className="upcomingAppt">
          <ul className="apptCardListing">
          <li className="apptDate">
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
               </ul>
               <ul className="otherNotes">
               <li className="apptNotes">
               {listing.appt_notes}
               </li>
               </ul>
               </div>
                <div className="apptCardButtons">
                <button onClick={this.handleAlert} className="upApptEdit">
                Edit
                </button>
                </div>
          
          </div>
          )
          )
          const dateSearch = dateSearched.length >= 1 ?
          dateSearched : "No appointments on this date";

  return (
     <div className="myUpcomingAppts">
         <h1 className="myUpcomingApptsHeader"> My Upcoming Appointments</h1>

            {
              this.state.showAppts ?
            <button className="viewAllButton" onClick={()=>this.renderAppts()}>Close Appointment List
            </button>
            : <button className="viewAllButton" onClick={()=>this.renderAppts()}>View All Appointments
            </button>
            }

            {
              this.state.showAppts ?
              null
              :
              <form role="search">
             <label htmlFor="date-search">Search By Date</label>
             <input 
             name="date"
             type="date"
             value={this.state.date}
             onChange={this.handleChangeDate}
              ></input>
         </form>
            }

         <div className='searchedAppts'>
           { !this.state.showAppts ?
           dateSearch
          : null}
         </div>

          <div className="apptCard">
            {
              this.state.showAppts ?
            <div className="apptCardInfo">
             {upcomingApptList}
            </div>
            : null
            }
          </div>
         
         <button onClick={this.handleAlert} className="addApptLink">+ Add New Appointment</button>

      </div>
 
    );
  }
}
export default UpcomingApptsDemo;