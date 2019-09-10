import React from 'react';
import './nav.css';

function Nav() {
  return (
    <nav>
    <a href='/medLog' className='medLog'>Medication Log</a>
    <a href='/upcomingAppts' className='upcomingAppts'>Upcoming Appointments</a>
    <a href='/pastAppts' className='pastAppts'>Past Appointments</a>
    </nav>
  );
}

export default Nav;