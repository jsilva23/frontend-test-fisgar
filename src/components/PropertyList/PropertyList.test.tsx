/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PropertyList from './';
import { Property } from '@/types/property';

vi.mock('@/components/PropertyCard', () => ({
  default: ({ property }: { property: Property }) => (
    <div data-testid='property-card' data-property-id={property.id}>
      Mock Property Card
    </div>
  ),
}));

vi.mock('../Context', () => ({
  usePropertyState: vi.fn(),
}));

import { usePropertyState } from '../Context';

const mockProperties: Property[] = [
  {
    id: 1,
    address: 'Rua A, 123',
    price: 500000,
    rooms: 3,
    image: '/image1.jpg',
    is_furnished: true,
    has_pool: true,
    has_parking: true,
    isNew: true,
  },
  {
    id: 2,
    address: 'Rua B, 456',
    price: 750000,
    rooms: 4,
    image: '/image2.jpg',
    is_furnished: false,
    has_pool: false,
    has_parking: true,
    isNew: false,
  },
];

describe('PropertyList', () => {
  it('should show loading state when isPropertiesLoading is true', () => {
    (usePropertyState as any).mockReturnValue({
      properties: [],
      isPropertiesLoading: true,
    });

    render(<PropertyList />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should show empty state when no properties are available', () => {
    (usePropertyState as any).mockReturnValue({
      properties: [],
      isPropertiesLoading: false,
    });

    render(<PropertyList />);
    expect(screen.getByText('Nenhum imóvel disponível')).toBeInTheDocument();
  });

  it('should apply correct styling to loading and empty states', () => {
    (usePropertyState as any).mockReturnValue({
      properties: [],
      isPropertiesLoading: true,
    });

    const { rerender } = render(<PropertyList />);

    let styledBox = screen.getByText('Carregando...').closest('div');
    expect(styledBox).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    });

    (usePropertyState as any).mockReturnValue({
      properties: [],
      isPropertiesLoading: false,
    });

    rerender(<PropertyList />);
    styledBox = screen.getByText('Nenhum imóvel disponível').closest('div');
    expect(styledBox).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    });
  });

  it('should maintain stable layout during state transitions', () => {
    const { rerender } = render(<PropertyList />);

    (usePropertyState as any).mockReturnValue({
      properties: [],
      isPropertiesLoading: true,
    });
    rerender(<PropertyList />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();

    (usePropertyState as any).mockReturnValue({
      properties: [],
      isPropertiesLoading: false,
    });
    rerender(<PropertyList />);
    expect(screen.getByText('Nenhum imóvel disponível')).toBeInTheDocument();

    (usePropertyState as any).mockReturnValue({
      properties: mockProperties,
      isPropertiesLoading: false,
    });
    rerender(<PropertyList />);
    expect(screen.getByText('Imóveis disponíveis')).toBeInTheDocument();
  });
});
