import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './pastAppts.css';


class PastAppts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
        };
    }

    handleChangeDate = e => {
        this.setState({ date: e.target.value })
      };


    render(){
        const apptArray = this.props.store.pastAppts;

        const findByDate = (apptArray=[], apptDate) => 
        apptArray.find(date => date.apptDate === apptDate) 

        const date = findByDate(apptArray, this.state.date);
        console.log('date', date)
//want to implement find card by date feature here. Currently able to match values of
//date with the appt card, just need to figure out how to render only that appt card
        
        const pastApptList = this.props.store.pastAppts.map((listing, index) => (
            
            <div key={index} className="pastApptCard">
                <div className="pastAppt">
            <ul className="pastApptCardListing">
            <li className="apptDate">
                { (new Date(listing.apptDate)).toLocaleDateString("en-US") }
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
        <ul className="otherNotes">
            <li>
                {listing.otherNotes}
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
            <td>{listing.copay}</td>
            <td>{listing.docBill}</td>
            <td>{listing.insuranceBill}</td>
            
            </tr>
              </tbody>
          </table>
          <div className="pastApptCardButtons">
             <button className="pastApptCardButtonsList" type="submit">
                 Save
             </button>
             <Link to='/editPastAppt'><button className="pastApptCardButtonsList" type="submit">
                 Edit
             </button></Link>
             <button className="pastApptCardButtonsList" type="submit">
                 Delete
             </button>
             </div>
             </div>
          )
          )
        

  return (
     <div className="myPastAppts">
         <h1 className="myPastApptsHeader"> My Past Appointments</h1>
         <form role="search">
             <label htmlFor="date-search">Date</label>
             <input 
             name="date"
             type="date"

             value={this.state.date}
             onChange={this.handleChangeDate}
              ></input>
             <button className="findButton" type="submit">Find</button>
         </form>
         
         <div className="pastApptCard">
             {pastApptList}
      </div>
      </div>
 
  );
}
}

export default PastAppts;