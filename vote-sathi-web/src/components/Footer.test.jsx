import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('renders footer copyright text', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/VoteSathi/i).length).toBeGreaterThan(0);
  });
});
