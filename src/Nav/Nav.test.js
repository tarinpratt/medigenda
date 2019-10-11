import React from './node_modules/react';
import ReactDOM from './node_modules/react-dom';
import { BrowserRouter } from './node_modules/react-router-dom'
import Nav from './Nav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><Nav /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});