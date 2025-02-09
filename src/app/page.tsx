import React from 'react';

import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';

import Filter from '@/components/Filter';
import PropertyList from '@/components/PropertyList';

export default function RealEstatePage() {
  return (
    <Container style={{ paddingTop: '4rem' }}>
      <Grid container spacing={3} mt={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Filter />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <PropertyList />
        </Grid>
      </Grid>
    </Container>
  );
}
