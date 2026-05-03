import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card><p>Card Content</p></Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies standard card styles', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild.style.borderRadius).toBe('var(--radius-lg)');
  });
});
