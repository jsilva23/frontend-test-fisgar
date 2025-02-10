/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'next/navigation';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PropertyPage from './page';
import { Property } from '@/types/property';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockProperty: Property = {
  id: 1,
  address: 'Test Address 123',
  price: 500000,
  rooms: 3,
  image: '/test-image.jpg',
  is_furnished: true,
  has_pool: true,
  has_parking: true,
  isNew: true,
};



describe('PropertyPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useParams as any).mockReturnValue({ slug: '1' });
  });

  it('should show loading state initially', () => {
    mockFetch.mockImplementationOnce(() => new Promise(() => {}));

    render(<PropertyPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should handle property not found', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Not found'));

    render(<PropertyPage />);

    await waitFor(() => {
      expect(screen.getByText('Imóvel não encontrado.')).toBeInTheDocument();
    });
  });

  it('should render amenity details correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => mockProperty,
      ok: true,
    });

    render(<PropertyPage />);

    await waitFor(() => {
      expect(
        screen.getByText('Vaga de estacionamento: Sim')
      ).toBeInTheDocument();
      expect(screen.getByText('Piscina: Sim')).toBeInTheDocument();
      expect(screen.getByText('Mobiliado: Sim')).toBeInTheDocument();
      expect(screen.getByText('Novo: Sim')).toBeInTheDocument();
    });
  });

  it('should not fetch when slug is not provided', () => {
    (useParams as any).mockReturnValueOnce({ slug: undefined });

    render(<PropertyPage />);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should render property image correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => mockProperty,
      ok: true,
    });

    render(<PropertyPage />);

    await waitFor(() => {
      const image = screen.getByRole('img') as HTMLImageElement;
      expect(image).toHaveAttribute('src', '/test-image.jpg');
      expect(image).toHaveAttribute('alt', 'Test Address 123');
    });
  });

  it('should handle different property configurations', async () => {
    const variousProperty: Property = {
      ...mockProperty,
      is_furnished: false,
      has_pool: false,
      has_parking: false,
      isNew: false,
    };

    mockFetch.mockResolvedValueOnce({
      json: async () => variousProperty,
      ok: true,
    });

    render(<PropertyPage />);

    await waitFor(() => {
      expect(
        screen.getByText('Vaga de estacionamento: Não')
      ).toBeInTheDocument();
      expect(screen.getByText('Piscina: Não')).toBeInTheDocument();
      expect(screen.getByText('Mobiliado: Não')).toBeInTheDocument();
      expect(screen.getByText('Novo: Não')).toBeInTheDocument();
    });
  });

  it('should handle error logging', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<PropertyPage />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Erro ao buscar imóvel:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
