import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  act,
  renderHook,
  waitFor,
} from '@testing-library/react';
import { PropertyProvider, usePropertyState } from './';
import { Property } from '@/types/property';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockProperties: Property[] = [
  {
    id: 1,
    address: 'Test Address 1',
    price: 500000,
    rooms: 3,
    image: 'image1.jpg',
    is_furnished: true,
    has_pool: true,
    has_parking: true,
    isNew: true,
  },
  {
    id: 2,
    address: 'Test Address 2',
    price: 750000,
    rooms: 4,
    image: 'image2.jpg',
    is_furnished: false,
    has_pool: false,
    has_parking: true,
    isNew: false,
  },
];

describe('PropertyProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  it('should renders\ children correctly', () => {
    render(
      <PropertyProvider>
        <div data-testid='test-child'>Test Child</div>
      </PropertyProvider>
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('should initialize with default values', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => [],
      ok: true,
    });

    const { result } = renderHook(() => usePropertyState(), {
      wrapper: PropertyProvider,
    });

    expect(result.current.properties).toEqual([]);
    expect(result.current.isPropertiesLoading).toBe(true);
    expect(typeof result.current.fetchProperties).toBe('function');
  });

  it('should fetch properties on mount', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => mockProperties,
      ok: true,
    });

    const { result } = renderHook(() => usePropertyState(), {
      wrapper: PropertyProvider,
    });

    await waitFor(() => {
      expect(result.current.properties).toEqual(mockProperties);
      expect(result.current.isPropertiesLoading).toBe(false);
    });

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:5000/properties?');
  });

  describe('fetchProperties function', () => {
    it('should handle rooms filter', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => mockProperties,
        ok: true,
      });

      const { result } = renderHook(() => usePropertyState(), {
        wrapper: PropertyProvider,
      });

      await act(async () => {
        result.current.fetchProperties({ rooms: 3 });
      });
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('rooms=3')
      );

      mockFetch.mockReset();
      await act(async () => {
        result.current.fetchProperties({ rooms: 4 });
      });
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('rooms_gte=4')
      );
    });

    it('should handle error during fetch', async () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error('Fetch failed'));

      const { result } = renderHook(() => usePropertyState(), {
        wrapper: PropertyProvider,
      });

      await act(async () => {
        result.current.fetchProperties();
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching properties:',
        expect.any(Error)
      );
      expect(result.current.isPropertiesLoading).toBe(false);
      expect(result.current.properties).toEqual([]);

      consoleErrorSpy.mockRestore();
    });

    it('should update loading state correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => mockProperties,
        ok: true,
      });

      const { result } = renderHook(() => usePropertyState(), {
        wrapper: PropertyProvider,
      });

      expect(result.current.isPropertiesLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isPropertiesLoading).toBe(false);
      });
    });
  });
});
