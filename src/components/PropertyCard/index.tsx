import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Badge } from '@mui/material';

export default function PropertyCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt='green iguana'
        />
        <CardContent>
          <Badge
            variant='dot'
            style={{
              position: 'absolute',
              left: 8,
              top: 8,
              backgroundColor: '#10B981',
              color: 'white',
              fontSize: 12,
              fontWeight: 500,
              padding: '4px 8px',
              borderRadius: 4,
            }}
          >
            Novo
          </Badge>

          <Typography
            variant='h3'
            style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
          >
            622000
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            4123 W Century Blvd, Inglewood, California 90544
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
