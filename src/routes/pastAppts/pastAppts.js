import React, { Component } from 'react';
import UpcomingApptsApiService from'../../services/upcoming_appts-api-service'
import { Link } from 'react-router-dom'
import { faTimes, faArrowDown, faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment'
import './pastAppts.css';


class PastAppts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            past_appts: [],
            date: '',
            upcoming_appt: false,
            showAppts: true
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
                past_appts: apptList
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
              time = time.slice (0, 3); // Remove full string match value
              time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
              time[0] = +time[0] % 12 || 12; // Adjust hours
            }
            return time.join (''); // return adjusted time or original string
          }


    render(){
        
        const apptState = this.state.past_appts;
        const sortedByDate = apptState.sort((a, b) => new Date(...a.appt_date.split('/').reverse())
        - new Date(...b.appt_date.split('/').reverse()));
        const pastAppts = sortedByDate
        .filter((appt) => appt.upcoming_appt === false)
        const searchDates = pastAppts
        .filter((dates) => dates.appt_date === this.state.date+'T00:00:00.000Z')

        const entirePastApptList = pastAppts.map((listing, index) => (    
            <div key={index} className="pastApptCard">
                <div className="pastAppt">
            <ul className="pastApptCardListing">
            <li className="apptDate" onClick={e => this.onSort(e, 'appt_date')}><span><FontAwesomeIcon icon={faCalendarAlt} size="1x" className="addNote" /></span>
                {(moment(new Date(listing.appt_date)).add(1, 'day').format('MM / DD / YYYY'))}
            </li>
            <li className="apptTime"><span><FontAwesomeIcon icon={faClock} size="1x" className="addNote" /></span>
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
            <li>
                {listing.appt_notes}
            </li>
        </ul>
        </div>
   

<section className="pastApptBillingCard">
            <div className="headings">
            <h4 className="copay">Co-pay</h4>
            <h4 className="docBill">Bill From Doctor</h4>
            <h4 className="insuranceBill">Insurance says I owe</h4>
            </div>
            </section>
            <ul className="billing">
            <li className="billingPrice">$ {listing.copay}</li>
            <li className="billingPrice">$ {listing.doc_bill}</li>
            <li className="billingPrice">$ {listing.insurance_bill}</li>
            </ul>
        
        
        <div className="pastApptCardButtons">
            <Link to={`/editPastAppt/${listing.id}`}><button className="pastApptCardButtonsList" type="submit">
                Edit
            </button></Link>
            </div>
            </div>
        )
        )
        
        const pastApptList = searchDates.map((listing, index) => (    
            <div key={index} className="pastApptCard">
                <div className="pastAppt">
            <ul className="pastApptCardListing">
            <li className="apptDate"><span><FontAwesomeIcon icon={faCalendarAlt} size="1x" className="addNote" /></span>
                {(moment(new Date(listing.appt_date)).add(1, 'day').format('MM / DD / YYYY'))}
            </li>
            <li className="apptTime"><span><FontAwesomeIcon icon={faClock} size="1x" className="addNote" /></span>
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
            <li>
                {listing.appt_notes}
            </li>
        </ul>
        </div>
        <section className="pastApptBillingCard">
            <div className="headings">
            <h4 className="copay">Co-pay</h4>
            <h4 className="docBill">Bill From Doctor</h4>
            <h4 className="insuranceBill">Insurance says I owe</h4>
            </div>
            <ul className="billing">
            <li>$ {listing.copay}</li>
            <li>$ {listing.doc_bill}</li>
            <li>$ {listing.insurance_bill}</li>
            </ul>
        </section>

          <div className="pastApptCardButtons">
             <Link to={`/editPastAppt/${listing.id}`}><button className="pastApptCardButtonsList" type="submit">
                 Edit
             </button></Link>
             </div>
             </div>
          )
          )

          const dateSearch = pastApptList.length >= 1 ?
          pastApptList : "No appointments on this date";


  return (
     <div className="myPastAppts">
         <h1 className="myPastApptsHeader"> My Past Appointments</h1>
            {
              this.state.showAppts ?
            <button className="viewAllButton" onClick={()=>this.renderAppts()}><span><FontAwesomeIcon icon={faTimes} size="1x" className="addNote" /></span>Close Appointment List
            </button>
            : <button className="viewAllButton" onClick={()=>this.renderAppts()}><span><FontAwesomeIcon icon={faArrowDown} size="1x" className="addNote" /></span>View All Appointments
            </button>
            }

            {
                this.state.showAppts ?
                null
                : <form role="search" className="pastApptDateSearch">
                <label htmlFor="date-search">Search By Date</label>
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

            <div className="searchedAppts">
             {
                 !this.state.showAppts ?
                 dateSearch 
                 : null
             }
            </div>

      <div className="searchedPastAppts">
            {
              this.state.showAppts ?
         <div className="apptCardInfo">
             {entirePastApptList}
            </div>
            : null
            }
      </div>

      </div>
 
  );
}
}

export default PastAppts;