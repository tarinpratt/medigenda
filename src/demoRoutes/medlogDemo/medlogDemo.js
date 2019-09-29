import React, { Component } from 'react';



class MedLogDemo extends Component {

    tConvert (time) {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) { // If time format correct
          time = time.slice (1); // Remove full string match value
          time = time.slice (0, 3);
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
          
        }
        return time.join (''); // return adjusted time or original string
      }

      handleAlert () {
          alert("You must register for an account to create your own entries.")
      }
    


    render() {
        const medLog =  [
            {
                id: '1',
                date: '2019-08-11T11:55:00-05:00',
                time: '9:35 am',
                medName: 'Promethazine',
                amountTaken: '1 pill',
                reason: 'Nausea',
            },
            {
                id: '2',
                date: '2019-08-11T11:55:00-05:00',
                time: '10:00 am',
                medName: 'Pantoprazole',
                amountTaken: '1 pill',
                reason: 'Acid Reflux',
            },
            {
                id: '3',
                date: '2019-08-11T11:55:00-05:00',
                time: '12:00 pm',
                medName: 'Lorazepam',
                amountTaken: '1/2 pill',
                reason: 'Anxiety',
            },
            {
                id: '4',
                date: '2019-08-11T11:55:00-05:00',
                time: '5:00 pm',
                medName: 'Ondansentron',
                amountTaken: '1 pill',
                reason: 'Nausea',
            },
            {
                id: '5',
                date: '2019-08-11T11:55:00-05:00',
                time: '9:25 pm',
                medName: 'Ambien',
                amountTaken: '1/2 pill',
                reason: 'Sleep',
            },
        ]
        const medList = medLog.map((listing, index) => (
      
            <tr key={index}>
            <td>{(new Date(listing.date).toLocaleDateString("en-US"))}</td>
            <td>{this.tConvert(listing.time)}</td>
            <td>{listing.medName}</td>
            <td>{listing.amountTaken}</td>
            <td>{listing.reason}</td>
            </tr> 
        ))


       
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
         <button onClick={this.handleAlert} className="addMedLink">
             + Add New Entry
         </button>

      </div>

        )
    }
}
export default MedLogDemo;


