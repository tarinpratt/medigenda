import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import MedLog from './medLog';

const props = {
  medLog: [
    {
        id: '1',
        date: '2019-08-11',
        time: '9:35 am',
        medName: 'Promethazine',
        amountTaken: '1 pill',
        reason: 'Nausea',
    },
    {
        id: '2',
        date: '2019-08-11',
        time: '10:00 am',
        medName: 'Pantoprazole',
        amountTaken: '1 pill',
        reason: 'Acid Reflux',
    },
    {
        id: '3',
        date: '2019-08-11',
        time: '12:00 pm',
        medName: 'Lorazepam',
        amountTaken: '1/2 pill',
        reason: 'Anxiety',
    },
    {
        id: '4',
        date: '2019-08-11',
        time: '5:00 pm',
        medName: 'Ondansentron',
        amountTaken: '1 pill',
        reason: 'Nausea',
    },
    {
        id: '5',
        date: '2019-08-11',
        time: '9:25 pm',
        medName: 'Ambien',
        amountTaken: '1/2 pill',
        reason: 'Sleep',
    },
]
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><MedLog store={props}/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});