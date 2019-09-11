import React, { Component } from 'react';

import AddMedForm from '../addMedForm/addMedForm'
import './medLog.css';

class MedLog extends Component {

  render() {
    const medList = this.props.store.medLog.map((listing, index) => (
      <tr key={index}>
      <td>{(new Date(listing.date)).toLocaleDateString()}</td>
      <td>{listing.time}</td>
      <td>{listing.medName}</td>
      <td>{listing.amountTaken}</td>
      <td>{listing.reason}</td>
      </tr>
    )
    )
    
  return (
      <div className="medLog_page">
          <h1 className="myMeds">My Medications</h1>
          <table>
              <thead>
              <tr>
              <th className="date">Date</th>
              <th className="time">Time</th>
              <th className="medName">Medication</th>
              <th className="amountTaken">Amount</th>
              <th className="reason">Reason For Intake</th>
              </tr>
              </thead>
              <tbody>
                {medList}
              </tbody>
          </table>
          <div className="medForm">
            <AddMedForm />
        </div>

      </div>
 
  );
}
}

export default MedLog;