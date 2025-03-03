'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import styled from '@emotion/styled';

import PropertyCard from '@/components/PropertyCard';
import { usePropertyState } from '../Context';

export function PropertyList() {
  const { properties, isPropertiesLoading } = usePropertyState();

  return (
    <>
      {isPropertiesLoading ? (
        <StyledBox>
          <Typography variant='h6'>Carregando...</Typography>
        </StyledBox>
      ) : properties.length === 0 ? (
        <StyledBox>
          <Typography variant='h5'>Nenhum imóvel disponível</Typography>
        </StyledBox>
      ) : (
        <Box>
          <Typography variant='h6'>Imóveis disponíveis</Typography>
          <Grid container spacing={3} paddingY={2}>
            {properties.map((property) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={property.id}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});
