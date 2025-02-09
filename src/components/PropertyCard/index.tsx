import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Badge } from '@mui/material';
import styled from '@emotion/styled';
import { Property } from '@/types/property';

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={property.image}
          alt={property.address}
        />
        {property.isNew && <NewTag>Novo</NewTag>}
        <CardContent>
          <Typography variant='h6'>
            ${property.price.toLocaleString()}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {property.address}
          </Typography>
        </CardContent>
      </CardActionArea>
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
