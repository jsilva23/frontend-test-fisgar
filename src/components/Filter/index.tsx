'use client';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid2';
import {
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import styled from '@emotion/styled';

const Filter: React.FC = () => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRooms, setSelectedRooms] = useState<number[]>([2, 3]);
  const [selectedBasicCriteria, setSelectedBasicCriteria] = useState<string[]>([
    'Mobiliada',
    'Piscina',
  ]);

  return (
    <>
      <Typography variant='h6'>Filtros</Typography>
      <TextField
        size='small'
        fullWidth
        label='Endereço ou código postal'
        margin='normal'
      />

      <Typography variant='subtitle1' marginTop={2.5}>
        Faixa de preço
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <TextField
            size='small'
            fullWidth
            label='Min'
            type='number'
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, min: e.target.value }))
            }
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            size='small'
            fullWidth
            label='Max'
            type='number'
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, max: e.target.value }))
            }
          />
        </Grid>
      </Grid>

      <Typography variant='subtitle1' marginTop={2.5}>
        Número de quartos
      </Typography>
      <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
        {['1', '2', '3', '4+'].map((room) => (
          <FormControlLabel
            key={room}
            control={
              <Checkbox checked={selectedRooms.includes(Number(room))} />
            }
            label={`${room}`}
            onChange={() => {
              setSelectedRooms((prev) =>
                prev.includes(Number(room))
                  ? prev.filter((r) => r !== Number(room))
                  : [...prev, Number(room)]
              );
            }}
          />
        ))}
      </FormGroup>

      <Typography variant='subtitle1' marginTop={2.5}>
        Critérios básicos
      </Typography>
      <FormGroup>
        {['Estacionamento', 'Piscina', 'Mobiliada'].map((room) => (
          <FormControlLabel
            key={room}
            control={
              <Checkbox checked={selectedBasicCriteria.includes(room)} />
            }
            label={`${room}`}
            onChange={() => {
              setSelectedBasicCriteria((prev) =>
                prev.includes(room)
                  ? prev.filter((r) => r !== room)
                  : [...prev, room]
              );
            }}
          />
        ))}
      </FormGroup>

      <StyledButton>Filtrar</StyledButton>
    </>
  );
};

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 3.2rem;
  background-color: #222222;
  color: white;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 8px;
  text-transform: none;
  transition: background-color 0.3s;

  &:hover {
    border: 1px solid #4f46e5;
  }
`;

export default Filter;
