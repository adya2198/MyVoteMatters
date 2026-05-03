import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders the button with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies the primary variant style correctly', () => {
    render(<Button variant="primary">Submit</Button>);
    const button = screen.getByText('Submit');
    expect(button.style.backgroundColor).toBe('var(--primary)');
  });

  it('renders with an icon if provided', () => {
    const MockIcon = () => <svg data-testid="mock-icon" />;
    render(<Button icon={MockIcon}>With Icon</Button>);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });
});
