import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './Home';

describe('Home Page', () => {
  it('renders the hero heading', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Your Vote/i)).toBeInTheDocument();
  });

  it('renders the call to action buttons', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Learn Voting/i)).toBeInTheDocument();
    expect(screen.getByText(/Quick Services/i)).toBeInTheDocument();
  });
});
