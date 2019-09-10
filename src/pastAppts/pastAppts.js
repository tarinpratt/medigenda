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
        console.log(apptArray)
        console.log('past appt date', this.state.date)
        const findByDate = (apptArray=[], apptDate) => 
        apptArray.find(date => date.apptDate === apptDate) 
        const date = findByDate(apptArray, this.state.date);
        console.log('date', date)
      

        
        const pastApptList = this.props.store.pastAppts.map((listing, index) => (
            <div key={index} className="pastApptCard">
            <ul key={index} className="pastApptCardListing">
            <li className="apptDate">
                {listing.apptDate}
            </li>
            <span> - </span>
            <li className="apptTime">
                {listing.apptTime}
            </li>
            <span> - </span>
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
        <table className="pastApptBillingCard">
              <thead>
              <tr>
              <th className="copay">Co-pay</th>
              <th className="docBill">Bill From Doctor</th>
              <th className="insuranceBill">Bill From Insurance</th>
              <th className="otherNotes">Other Notes</th>
              </tr>
              </thead>
              <tbody>
            <tr>
            <td>{listing.copay}</td>
            <td>{listing.docBill}</td>
            <td>{listing.insuranceBill}</td>
            <td>{listing.otherNotes}</td>
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
              placeholder="Search for date.."
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