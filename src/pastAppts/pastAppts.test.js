import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import PastAppts from './pastAppts';

const props = {
pastAppts: [
  {
      id: '1',
      apptDate: '2019-09-08',
      apptTime: '11:30 am',
      apptDoctor: 'Dr.Nagaiah',
      apptLocation: 'Arizona Oncology',
      apptPurpose: 'bloodwork',
      copay: '$30',
      docBill: '$0',
      insuranceBill: '$0',
      otherNotes: 'Still waiting on bill from doctor',
  },
  {
      id: '2',
      apptDate: '2019-09-10',
      apptTime: '10:30 am',
      apptDoctor: 'Dr.Nagaiah',
      apptLocation: 'Arizona Oncology',
      apptPurpose: 'chemo treatment #3',
      copay: '$45',
      docBill: '$75.26',
      insuranceBill: '$0',
      otherNotes: 'Waiting to hear from insurance about amount covered',
  }
]
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><PastAppts store={props}/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});