import React, { Component } from 'react';
import MedLogApiService from'../../services/medlog-api-service'
import moment from 'moment'
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import './medLog.css';



class MedLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        medlog: [],
    };
    this.onSort = this.onSort.bind(this)
    this.tConvert = this.tConvert.bind(this)
}

onSort(sortKey) {
  const medlog = this.state.medlog;
  medlog.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
   this.setState({medlog})
}

tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) { // If time format correct
    time = time.slice (1); // Remove full string match value
    time = time.slice (0, 3);
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
    
  }
  return time.join (''); // return adjusted time or original string
}

  componentDidMount(){
    MedLogApiService.getEntries()
    .then((medlog) => {
      return medlog
    })
    .then((medlogList) => {
      this.setState({
        medlog: medlogList
      })
    })
    
  }
  render() {
    const medState = this.state.medlog;
    const sortedByDate = medState.sort((a, b) => new Date(...a.date.split('/').reverse())
     - new Date(...b.date.split('/').reverse()));

    const medList = sortedByDate.map((listing, index) => (
      
      <tr key={index} className="medlogtr">
      <td className="medlogtd">{(moment(new Date(listing.date)).add(1, 'day').format('MM/DD'))}</td>
      <td className="medlogtd">{this.tConvert(listing.time)}</td>
      <td className="medlogtd">{listing.medname}</td>
      <td className="medlogtd">{listing.amounttaken}</td>
      <td className="medlogtd">{listing.reason}</td>
      </tr>
  
    )
    
    )
    
  return (
      <div className="medLog_page">
          <h1 className="myMeds">My Medications</h1>
          
          <table className="medlogtable">
              <thead className="medloghead">
              <tr className="medlogtr">
              <th onClick={e => this.onSort(e, 'date')} className="date">Date</th>
              <th onClick={e => this.onSort(e, 'time')}className="time">Time</th>
              <th onClick={e => this.onSort(e, 'medname')}className="medName">Medication</th>
              <th onClick={e => this.onSort(e, 'amounttaken')}className="amountTaken">Amount</th>
              <th onClick={e => this.onSort(e, 'reason')}className="reason">Reason For Intake</th>
              </tr>
              </thead>
              <tbody className="medlogtbody">
                {medList}
              </tbody>
          </table>
          
         <Link to='/addMed' className="addMedLink"><button type='submit'><span><FontAwesomeIcon icon={faNotesMedical} size="1x" className="addNote" /></span>
             Add New Entry
         </button></Link>

      </div>
 
  );
}
}

export default MedLog;