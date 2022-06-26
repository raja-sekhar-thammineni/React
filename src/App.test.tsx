import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import Strore from "./store"
test('Discover Latest Courses on React', () => {
  render(<Provider store={Strore}><App /></Provider>);
  const linkElement = screen.getByText(/Discover Latest Courses on React/i,{exact:true});
  expect(linkElement).toBeInTheDocument();
});
