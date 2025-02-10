'use client';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid2';
import { Typography, TextField, Checkbox, FormGroup, Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styled from '@emotion/styled';
import { usePropertyState } from '@/components/Context';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

export function Filter() {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRooms, setSelectedRooms] = useState<number>(0);
  const [hasParking, setHasParking] = useState(false);
  const [hasPool, setHasPool] = useState(false);
  const [isFurnished, setIsFurnished] = useState(false);

  const { fetchProperties } = usePropertyState();

  const handleFilter = () => {
    fetchProperties({
      address,
      priceRange,
      rooms: selectedRooms,
      hasParking,
      hasPool,
      isFurnished,
    });
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const FilterContent = (
    <>
      <Typography variant='h6'>Filtros</Typography>
      <TextField
        size='small'
        fullWidth
        label='Endereço ou código postal'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        margin='normal'
      />

      <Typography variant='subtitle1' marginTop={2.5}>
        Faixa de preço
      </Typography>
      <Grid container spacing={2} marginBottom={2.5}>
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

      <FormControl>
        <FormLabel>Número de quartos</FormLabel>
        <RadioGroup
          defaultValue='0'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedRooms(Number((event.target as HTMLInputElement).value));
          }}
        >
          {['0', '1', '2', '3', '4'].map((room) => (
            <FormControlLabel
              key={room}
              value={room}
              control={<Radio />}
              label={`${room === '4' ? '4+' : room === '0' ? 'Todos' : room}`}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Typography variant='subtitle1' marginTop={2.5}>
        Critérios básicos
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={hasParking} />}
          label='Estacionamento'
          onChange={() => setHasParking((prev) => !prev)}
        />
        <FormControlLabel
          control={<Checkbox checked={hasPool} />}
          label='Piscina'
          onChange={() => setHasPool((prev) => !prev)}
        />
        <FormControlLabel
          control={<Checkbox checked={isFurnished} />}
          label='Mobiliado'
          onChange={() => setIsFurnished((prev) => !prev)}
        />
      </FormGroup>

      <StyledButton onClick={() => handleFilter()}>Filtrar</StyledButton>
    </>
  );

  return (
    <>
      <Box display={{ md: 'none' }}>
        <Button onClick={toggleDrawer(true)}>
          <FilterListIcon /> Filtros
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <DrawerCloseButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </DrawerCloseButton>
          <Box padding={4}>{FilterContent}</Box>
        </Drawer>
      </Box>
      <Box display={{ xs: 'none', md: 'block' }}>{FilterContent}</Box>
    </>
  );
}
const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 3.2rem;
  background-color: #222222;
  color: #fdfdfd;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 8px;
  text-transform: none;
  transition: background-color 0.3s;

  &:hover {
    color: #fff;
    background-color: #333333;
  }
`;

const DrawerCloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;
