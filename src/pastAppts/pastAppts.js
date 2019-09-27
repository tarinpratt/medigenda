import React, { Component } from 'react';
import UpcomingApptsApiService from'../services/upcoming_appts-api-service'
import { Link } from 'react-router-dom'
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
       // this.onSort = this.onSort.bind(this)
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

        //   onSort(e, sortKey) {
        //     const past_appts = this.state.past_appts;
        //     past_appts.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
        //     this.setState({past_appts})
        //   }
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
        .filter((dates) => dates.appt_date === this.state.date+'T07:00:00.000Z')

        const entirePastApptList = pastAppts.map((listing, index) => (    
            <div key={index} className="pastApptCard">
                <div className="pastAppt">
            <ul className="pastApptCardListing">
            <li className="apptDate" onClick={e => this.onSort(e, 'appt_date')}>
                {(new Date(listing.appt_date)).toLocaleDateString("en-US") }
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
            <li>
                {listing.appt_notes}
            </li>
        </ul>
        </div>
        <table className="pastApptBillingCard">
            <thead>
            <tr>
            <th className="copay">Co-pay</th>
            <th className="docBill">Bill From Doctor</th>
            <th className="insuranceBill">Insurance says I owe</th>
            
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>$ {listing.copay}</td>
            <td>$ {listing.doc_bill}</td>
            <td>$ {listing.insurance_bill}</td>
            
            </tr>
            </tbody>
        </table>
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
            <li className="apptDate">
                { (new Date(listing.appt_date)).toLocaleDateString("en-US") }
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
            <li>
                {listing.appt_notes}
            </li>
        </ul>
        </div>
        <table className="pastApptBillingCard">
              <thead>
              <tr>
              <th className="copay">Co-pay</th>
              <th className="docBill">Bill From Doctor</th>
              <th className="insuranceBill">Insurance says I owe</th>
              
              </tr>
              </thead>
              <tbody>
            <tr>
            <td>${listing.copay}</td>
            <td>${listing.doc_bill}</td>
            <td>${listing.insurance_bill}</td>
            
            </tr>
              </tbody>
          </table>
          <div className="pastApptCardButtons">
             <Link to={`/editPastAppt/${listing.id}`}><button className="pastApptCardButtonsList" type="submit">
                 Edit
             </button></Link>
             </div>
             </div>
          )
          )
  return (
     <div className="myPastAppts">
         <h1 className="myPastApptsHeader"> My Past Appointments</h1>
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
                : <form role="search">
                <label htmlFor="date-search">Search By Date</label>
                <input 
                name="date"
                type="date"
                value={this.state.date}
                onChange={this.handleChangeDate}
                 >
                 </input>
            </form>
            } 
            
 
         <div className="pastApptCard">
             {pastApptList}
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