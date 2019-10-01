import React, { Component } from 'react';
import MedLogApiService from'../../services/medlog-api-service'
import moment from 'moment'
import { formatTime } from '../../functionHelpers'
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
      <td className="medlogtd">{(moment(new Date(listing.date)).add(1, 'day').format('MM/DD/YYYY'))}</td>
      <td className="medlogtd">{formatTime(listing.time)}</td>
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
              <th className="date">Date</th>
              <th className="time">Time</th>
              <th className="medName">Medication</th>
              <th className="amountTaken">Amount</th>
              <th className="reason">Reason For Intake</th>
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