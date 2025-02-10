import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Badge, CardActions } from '@mui/material';
import styled from '@emotion/styled';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import ChairIcon from '@mui/icons-material/Chair';
import PoolIcon from '@mui/icons-material/Pool';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

import { Property } from '@/types/property';

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card style={{ height: '100%' }}>
      <CardActionArea
        style={{ height: '80%' }}
        href={`/properties/${property.id}`}
      >
        <CardMedia
          component='img'
          height='140'
          image={property.image}
          alt={property.address}
        />
        {property.isNew && <NewTag>Novo</NewTag>}
        <CardContent>
          <Typography variant='h6'>
            {property.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {property.address}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <SingleBedIcon />
          <Typography variant='body2'>{property.rooms}</Typography>
        </span>

        {property.is_furnished && <ChairIcon fontSize='small' />}
        {property.has_pool && <PoolIcon fontSize='small' />}
        {property.has_parking && <LocalParkingIcon fontSize='small' />}
      </CardActions>
    </Card>
  );
}

const NewTag = styled(Badge)({
  position: 'absolute',
  top: 10,
  left: 10,
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '5px 10px',
  fontSize: '12px',
  fontWeight: 'bold',
  borderRadius: '5px',
});
