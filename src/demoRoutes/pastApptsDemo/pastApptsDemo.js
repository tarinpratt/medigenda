import React, { Component } from 'react';
import { faNotesMedical, faTimes, faArrowDown, faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment'


class PastApptsDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            showAppts: true
        };
        this.tConvert = this.tConvert.bind(this)
        this.handleAlert = this.handleAlert.bind(this)
    }

    handleChangeDate = e => {
        this.setState({ date: e.target.value })
      };

    handleAlert() {
        alert("You must register for an account to alter appointments.")
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

        const pastAppts= [
            {
                id: '1',
                appt_date: '2019-09-13',
                appt_time: '11:30 am',
                appt_doctor: 'Dr.Nagaiah',
                appt_location: 'Arizona Oncology',
                appt_purpose: 'bloodwork',
                appt_notes: `Still haven't heard from insurance`,
                copay: '$30',
                doc_bill: '$0',
                insurance_bill: '$0',
                upcoming_appt: false  
            },
            {
                id: '2',
                appt_date: '2019-09-15',
                appt_time: '10:30 am',
                appt_doctor: 'Dr.Nagaiah',
                appt_location: 'Arizona Oncology',
                appt_purpose: 'chemo treatment #2',
                appt_notes: '',
                copay: '$45',
                doc_bill: '$75.26',
                insurance_bill: '$0',
                upcoming_appt: false            
            }
        ]

        const searchDates = pastAppts
        .filter((dates) => dates.appt_date === this.state.date)

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
            <li className="billingPrice">{listing.copay}</li>
            <li className="billingPrice">{listing.doc_bill}</li>
            <li className="billingPrice">{listing.insurance_bill}</li>
            </ul>
        <div className="pastApptCardButtons">
            <button onClick={this.handleAlert} className="pastApptCardButtonsList" type="submit">
                Edit
            </button>
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
            </section>
            <ul className="billing">
            <li className="billingPrice">{listing.copay}</li>
            <li className="billingPrice">{listing.doc_bill}</li>
            <li className="billingPrice">{listing.insurance_bill}</li>
            </ul>
          <div className="pastApptCardButtons">
             <button onClick={this.handleAlert} className="pastApptCardButtonsList" type="submit">
                 Edit
             </button>
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
                : <form role="search" >
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
            
 
         <div className="pastApptCard">
             {!this.state.showAppts ?
             dateSearch
            : null}
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

export default PastApptsDemo;