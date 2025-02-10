'use client';

import { Property } from '@/types/property';
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

type FetchProperties = {
  address?: string;
  priceRange?: { min?: string; max?: string };
  rooms?: number;
  hasParking?: boolean;
  hasPool?: boolean;
  isFurnished?: boolean;
};

interface IPropertyContext {
  properties: Array<Property>;
  isPropertiesLoading: boolean;
  fetchProperties: (filters?: FetchProperties) => void;
}

const PropertyContext = createContext<IPropertyContext>({
  properties: [],
  isPropertiesLoading: true,
  fetchProperties: () => {},
});

interface IProps {
  children: React.ReactNode;
}

export function PropertyProvider({ children }: Readonly<IProps>) {
  const [properties, setProperties] = useState<Array<Property>>([]);
  const [isPropertiesLoading, setIsPropertiesLoading] = useState(true);

  const fetchProperties = async (filters?: FetchProperties) => {
    try {
      setIsPropertiesLoading(true);
      const queryParams = new URLSearchParams();

      if (filters?.priceRange?.min)
        queryParams.append('price_gte', filters.priceRange.min);
      if (filters?.priceRange?.max)
        queryParams.append('price_lte', filters.priceRange.max);

      if (filters?.address)
        queryParams.append('address ', encodeURIComponent(filters.address));

      if (filters?.rooms) {
        if (filters.rooms === 4) {
          queryParams.append('rooms_gte', filters.rooms.toString());
        } else {
          queryParams.append('rooms', filters.rooms.toString());
        }
      }

      if (filters?.hasParking) queryParams.append('has_parking', 'true');
      if (filters?.hasPool) queryParams.append('has_pool', 'true');
      if (filters?.isFurnished) queryParams.append('is_furnished', 'true');

      const url = `http://localhost:5000/properties?${queryParams.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setIsPropertiesLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const value = useMemo(
    () => ({
      properties,
      isPropertiesLoading,
      fetchProperties,
    }),
    [properties, isPropertiesLoading]
  );

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
}

export function usePropertyState() {
  return useContext(PropertyContext);
}
