'use client';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

import PropertyCard from '@/components/PropertyCard';

const properties = [
  {
    id: 1,
    price: 699678,
    address: '3517 W. Gray St. Utica, Pennsylvania 57867',
    image:
      'https://images.pexels.com/photos/4469136/pexels-photo-4469136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: true,
  },
  {
    id: 2,
    price: 415000,
    address: '8502 Preston Rd. Inglewood, Maine 98380',
    image:
      'https://images.pexels.com/photos/8583907/pexels-photo-8583907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: false,
  },
  {
    id: 3,
    price: 553835,
    address: '3891 Ranchview Dr. Richardson, California 62639',
    image:
      'https://images.pexels.com/photos/5353946/pexels-photo-5353946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: true,
  },
  {
    id: 4,
    price: 699400,
    address: '1312 W 96th St Apt 4, Los Angeles, California 90044',
    image:
      'https://images.pexels.com/photos/4839348/pexels-photo-4839348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: false,
  },
  {
    id: 5,
    price: 550000,
    address: '3203 Jack Northrop Ave, Hawthorne, California 90250',
    image:
      'https://images.pexels.com/photos/10827221/pexels-photo-10827221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: false,
  },
  {
    id: 6,
    price: 622000,
    address: '4123 W Century Blvd, Inglewood, California 90544',
    image:
      'https://images.pexels.com/photos/10486204/pexels-photo-10486204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: true,
  },
  {
    id: 7,
    price: 699400,
    address: '1312 W 96th St Apt 4, Los Angeles, California 90044',
    image:
      'https://images.pexels.com/photos/4839348/pexels-photo-4839348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: false,
  },
  {
    id: 8,
    price: 550000,
    address: '3203 Jack Northrop Ave, Hawthorne, California 90250',
    image:
      'https://images.pexels.com/photos/10827221/pexels-photo-10827221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: false,
  },
  {
    id: 9,
    price: 622000,
    address: '4123 W Century Blvd, Inglewood, California 90544',
    image:
      'https://images.pexels.com/photos/10486204/pexels-photo-10486204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: true,
  },
  {
    id: 10,
    price: 699400,
    address: '1312 W 96th St Apt 4, Los Angeles, California 90044',
    image:
      'https://images.pexels.com/photos/4839348/pexels-photo-4839348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: false,
  },
  {
    id: 11,
    price: 550000,
    address: '3203 Jack Northrop Ave, Hawthorne, California 90250',
    image:
      'https://images.pexels.com/photos/10827221/pexels-photo-10827221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: false,
  },
  {
    id: 12,
    price: 622000,
    address: '4123 W Century Blvd, Inglewood, California 90544',
    image:
      'https://images.pexels.com/photos/10486204/pexels-photo-10486204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isNew: true,
  },
];

export default function PropertyList() {
  return (
    <>
      <Typography variant='h6'>Imóveis disponíveis</Typography>
      <Grid container spacing={3} paddingY={2}>
        {properties.map((property) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
