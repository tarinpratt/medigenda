import React from 'react';
import { Link } from 'react-router-dom'
import './nav.css';

function Nav() {
  return (
    <nav>
    <Link to='/medLog' className='medLog'>Medication Log</Link>
    <Link to='/upcomingAppts' className='upcomingAppts'>Upcoming Appointments</Link>
    <Link to='/pastAppts' className='pastAppts'>Past Appointments</Link>
    </nav>
  );
}

export default Nav;