import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import AddMedForm from './addMedForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AddMedForm /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});