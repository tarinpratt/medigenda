import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import UpcomingAppts from './upcomingAppts';

const props = 
{ upcomingAppts: [
  {
      id: '1',
      apptDate: '2019-09-20',
      apptTime: '10:30 am',
      apptDoctor: 'Dr.Nagaiah',
      apptLocation: 'Arizona Oncology',
      apptPurpose: 'chemo treatment #4',
      apptNotes: 'Dont forget to ask why copay was more during last visit',
  }
]
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><UpcomingAppts store={props} /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});