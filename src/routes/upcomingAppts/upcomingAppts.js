import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { formatTime } from '../../functionHelpers'
import { faNotesMedical, faTimes, faArrowDown, faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpcomingApptsApiService from'../../services/upcoming_appts-api-service'
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

    render() {
      const apptState = this.state.upcoming_appts;
      const sortedByDate = apptState.sort((a, b) => new Date(...a.appt_date.split('/').reverse())
       - new Date(...b.appt_date.split('/').reverse()));
      const upcomingAppts = sortedByDate
        .filter((appt) => appt.upcoming_appt === true)
      const upcomingApptList = upcomingAppts.map((listing, index) => (
          <section key={index} className="upcomingApptCard">

              <div className="upcomingAppt">
            <ul className="apptCardListing">
              <li className="apptDate"><span><FontAwesomeIcon icon={faCalendarAlt} size="1x" className="addNote" /></span>
                {(moment(new Date(listing.appt_date)).add(1, 'day').format('MM / DD / YYYY'))}
              </li>
              <li className="apptTime"><span><FontAwesomeIcon icon={faClock} size="1x" className="addNote" /></span>
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
            </ul>

            <ul className="otherNotes">
              <li className="apptNotes">
                 {listing.appt_notes}
              </li>
            </ul>
              </div>

            <div className="apptCardButtons">
              <Link to={`/editUpcomingAppt/${listing.id}`} upcoming_appts = {this.state.upcoming_appts}>
                <button type="submit" className="upApptEdit">
                  Edit
                </button>
              </Link>
            </div>  
          </section>
        )
      )

      const searchDates = upcomingAppts
          .filter((dates) => dates.appt_date === this.state.date+'T00:00:00.000Z')
      const dateSearched = searchDates.map((listing, index) => (          
        <section key={index} className="upcomingApptCard">
            <div className="upcomingAppt">
          <ul className="apptCardListing">
            <li className="apptDate"><span><FontAwesomeIcon icon={faCalendarAlt} size="1x" className="addNote" /></span>
                  {(moment(new Date(listing.appt_date)).add(1, 'day').format('MM / DD / YYYY'))}
            </li>
            <li className="apptTime"><span><FontAwesomeIcon icon={faClock} size="1x" className="addNote" /></span>
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
          </ul>

          <ul className="otherNotes">
            <li className="apptNotes">
               {listing.appt_notes}
            </li>
          </ul>
            </div>

          <div className="apptCardButtons">
            <Link to={`/editUpcomingAppt/${listing.id}`} upcoming_appts = {this.state.upcoming_appts}>
              <button type="submit" className="upApptEdit">
                Edit
              </button>
            </Link>
          </div>  
        </section>
      )
    )

      const dateSearch = dateSearched.length >= 1 ?
        dateSearched : "No appointments on this date";

  return (
     <section className="myUpcomingAppts">
         <h1 className="myUpcomingApptsHeader"> My Upcoming Appointments</h1>

            {
              this.state.showAppts ?
            <button className="viewAllButton" onClick={()=>this.renderAppts()}>
              <span><FontAwesomeIcon icon={faTimes} size="1x" className="addNote" />
              </span>
              Close Appointment List
            </button>
            : <button className="viewAllButton" onClick={()=>this.renderAppts()}>
              <span><FontAwesomeIcon icon={faArrowDown} size="1x" className="addNote" />
              </span>
              View All Appointments
            </button>
            }

            {
              this.state.showAppts ?
              null     
             : <form role="search" className="inputDate">
                <label htmlFor="date-search">
                  Search By Date
                </label>
                  <input 
                  className="inputDate"
                  name="date"
                  type="date"
                  value={this.state.date}
                  onChange={this.handleChangeDate}
                    > 
                  </input>
                </form>
            }

         <div className='searchedAppts'>
           { 
             !this.state.showAppts ?
              dateSearch
             : null
            }
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
         
         <Link to='/addAppt' className="addApptLink"><span><FontAwesomeIcon icon={faNotesMedical} size="1x" className="addNote" /></span>Add New Appointment</Link>

      </section>
    );
  }
}
export default UpcomingAppts;