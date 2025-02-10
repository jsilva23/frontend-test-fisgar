import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PropertyCard } from './PropertyCard';

const mockProperty = {
  id: 1,
  price: 699678,
  address: 'Rua das Palmeiras, 123, Jardim Botânico, São Paulo - SP, 01234-567',
  image: 'https://images.pexels.com/...',
  rooms: 3,
  has_parking: true,
  has_pool: false,
  is_furnished: false,
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

  describe('PropertyCard', () => {
    it('should throw error when required props are missing', () => {
      // @ts-expect-error - Testing missing required prop
      expect(() => render(<PropertyCard />)).toThrow();
    });

    it('should handle different price values correctly', () => {
      render(<PropertyCard property={mockProperty} />);
      expect(screen.getByText('R$ 699.678,00')).toBeInTheDocument();
    });
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

  it('should have correct link to property details', () => {
    render(<PropertyCard property={mockProperty} />);
    const link = screen.getByRole('link') as HTMLAnchorElement;

    expect(link).toHaveAttribute('href', '/properties/1');
  });
});
