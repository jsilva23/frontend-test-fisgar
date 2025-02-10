'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { Property } from '@/types/property';

export default function PropertyPage() {
  const { slug } = useParams(); // Obtém o ID da URL
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/properties/${slug}`
        );
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error('Erro ao buscar imóvel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);

  if (loading) return <CircularProgress />;
  if (!property) return <Typography>Imóvel não encontrado.</Typography>;

  return (
    <Container
      style={{ paddingTop: '6rem', paddingBottom: '4rem', height: '100vh' }}
    >
      <Card style={{ height: '100%' }}>
        <CardMedia
          component='img'
          height='300'
          image={property.image}
          alt={property.address}
        />
        <CardContent>
          <Typography variant='h5'>{property.address}</Typography>
          <Typography variant='h6'>
            R$ {property.price.toLocaleString()}
          </Typography>
          <Typography>Quartos: {property.rooms}</Typography>
          <Typography>
            Vaga de estacionamento: {property.has_parking ? 'Sim' : 'Não'}
          </Typography>
          <Typography>Piscina: {property.has_pool ? 'Sim' : 'Não'}</Typography>
          <Typography>
            Mobiliado: {property.is_furnished ? 'Sim' : 'Não'}
          </Typography>
          <Typography>Novo: {property.isNew ? 'Sim' : 'Não'}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
