import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PropertyCard } from './PropertyCard';

const mockProperty = {
  id: 1,
  price: 699678,
  address: 'Rua das Palmeiras, 123, Jardim Botânico, São Paulo - SP, 01234-567',
  image: 'https://images.pexels.com/...',
  rooms: 3,
  basic_criteria: ['parking', 'furnished', 'pool'],
  isNew: false,
};

const mockNewProperty = {
  ...mockProperty,
  isNew: true,
};

describe('PropertyCard', () => {
  it('should throw error when required props are missing', () => {
    // @ts-expect-error - Testing missing required prop
    expect(() => render(<PropertyCard />)).toThrow();
  });

  it('should render property price formatted correctly', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText('$699,678')).toBeInTheDocument();
  });

  it('should render the property address', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(
      screen.getByText(
        'Rua das Palmeiras, 123, Jardim Botânico, São Paulo - SP, 01234-567'
      )
    ).toBeInTheDocument();
  });

  it('should render the property image with correct attributes', () => {
    render(<PropertyCard property={mockProperty} />);
    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image).toHaveAttribute('src', 'https://images.pexels.com/...');
    expect(image).toHaveAttribute(
      'alt',
      'Rua das Palmeiras, 123, Jardim Botânico, São Paulo - SP, 01234-567'
    );
  });

  it('should show the "Novo" badge when property is new', () => {
    render(<PropertyCard property={mockNewProperty} />);
    expect(screen.getByText('Novo')).toBeInTheDocument();
  });

  it('should not show the "Novo" badge when property is not new', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.queryByText('Novo')).not.toBeInTheDocument();
  });

  it('should render within a clickable card action area', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
