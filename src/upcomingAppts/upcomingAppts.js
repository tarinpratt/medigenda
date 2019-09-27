import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import UpcomingApptsApiService from'../services/upcoming_appts-api-service'
import './upcomingAppts.css';

class UpcomingAppts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upcoming_appts: [],
            date: '',
            showAppts: true,
            upcoming_appt: true     
        };

        this.tConvert = this.tConvert.bind(this)      
    }

    handleChangeDate = e => {
        this.setState({ date: e.target.value })
      };

    componentDidMount(){
        UpcomingApptsApiService.getEntries()
        .then((appts) => {
          return appts
        })
        .then((apptList) => {
          this.setState({
            upcoming_appts: apptList
          })
        })      
      }
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

    

    render() {
      const apptState = this.state.upcoming_appts;
      const sortedByDate = apptState.sort((a, b) => new Date(...a.appt_date.split('/').reverse())
       - new Date(...b.appt_date.split('/').reverse()));
        //filter appt status to render only upcoming
        const upcomingAppts = sortedByDate
          .filter((appt) => appt.upcoming_appt === true)
        //map through only upcoming appts  
         const upcomingApptList = upcomingAppts.map((listing, index) => (
           <div key={index} className="upcomingApptCard">
              <div className="upcomingAppt">
            <ul className="apptCardListing">
            <li className="apptDate">
                    {(new Date(listing.appt_date).toLocaleDateString("en-US", {timeZone: 'America/Phoenix'}))}
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
                  <Link to={`/editUpcomingAppt/${listing.id}`} upcoming_appts = {this.state.upcoming_appts}><button type="submit" className="upApptEdit">
                  Edit
                  </button>
                  </Link>
                  </div>
            
            </div>
            )
          )

          //filter through dates that match input date to render
          const searchDates = upcomingAppts
          .filter((dates) => dates.appt_date === this.state.date+'T07:00:00.000Z')
          //map through only the selected input date for rendering
          const dateSearched = searchDates.map((listing, index) => (          
            <div className="upcomingApptCard">
            <div className="upcomingAppt">
          <ul key={index} className="apptCardListing">
          <li className="apptDate">
                  {(new Date(listing.appt_date).toLocaleDateString("en-US", {timeZone: 'America/Phoenix'}))}
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
                <Link to={`/editUpcomingAppt/${listing.id}`} upcoming_appts = {this.state.upcoming_appts}><button type="submit" className="upApptEdit">
                Edit
                </button>
                </Link>
                </div>
          
          </div>
          )
        )

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
             {/* <button className="findButton" type="submit">Clear Date</button> */}
         </form>
            }

         <div className='searchedAppts'>
           { !this.state.showAppts ?
           dateSearched
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
         
         <Link to='/addAppt' className="addApptLink">+ Add New Appointment</Link>

      </div>
 
    );
  }
}
export default UpcomingAppts;