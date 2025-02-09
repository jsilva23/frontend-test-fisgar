'use client';
import React from 'react';

import { AppBar, Typography, Container } from '@mui/material';
import styled from '@emotion/styled';

export default function Header() {
  return (
    <StyledAppBar>
      <Container>
        <Typography variant='h1'>IMOVEIS</Typography>
      </Container>
    </StyledAppBar>
  );
}

const StyledAppBar = styled(AppBar)({
  height: '4rem',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: 'black',
  padding: '1rem 0',

  h1: {
    fontSize: '2rem',
    color: 'white',
  },
});
