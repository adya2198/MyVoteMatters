import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './Navbar';
import { A11yProvider } from '../context/A11yContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

describe('Navbar Component', () => {
  it('renders the brand name', () => {
    render(
      <BrowserRouter>
        <A11yProvider>
          <I18nextProvider i18n={i18n}>
            <Navbar />
          </I18nextProvider>
        </A11yProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('VoteSathi')).toBeInTheDocument();
  });
});
