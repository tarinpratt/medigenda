import React from 'react';
import { Link } from 'react-router-dom'
import '../Nav/nav.css'


function PublicNav() {
  return (
    <nav>
    <Link to='/medlogDemo' className='medLog'>Medication Log</Link>
    <Link to='/upcomingApptsDemo' className='upcomingAppts'>Upcoming Appointments</Link>
    <Link to='/pastApptsDemo' className='pastAppts'>Past Appointments</Link>
    </nav>
  );
}

export default PublicNav;