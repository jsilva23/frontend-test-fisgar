'use client';

import { Property } from '@/types/property';
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

interface IPropertyContext {
  properties: Array<Property>;
  isPropertiesLoading: boolean;
}

const PropertyContext = createContext<IPropertyContext>({
  properties: [],
  isPropertiesLoading: true,
});

interface IProps {
  children: React.ReactNode;
}

export function PropertyProvider({ children }: Readonly<IProps>) {
  const [properties, setProperties] = useState<Array<Property>>([]);
  const [isPropertiesLoading, setIsPropertiesLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:5000/properties');
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
