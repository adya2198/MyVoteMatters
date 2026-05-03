import React from 'react';
import { render, screen } from '@testing-library/react';
import { A11yControls } from './A11yControls';
import { vi } from 'vitest';

// Mock the context and translation hooks
vi.mock('../context/A11yContext', () => ({
  useA11y: () => ({
    highContrast: false,
    toggleHighContrast: vi.fn(),
    increaseFontSize: vi.fn(),
    decreaseFontSize: vi.fn(),
  })
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: vi.fn(),
    }
  })
}));

describe('A11yControls Component', () => {
  it('renders accessibility toggle buttons', () => {
    render(<A11yControls />);
    expect(screen.getByTitle(/Toggle High Contrast/i)).toBeInTheDocument();
  });
});
