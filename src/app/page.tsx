'use client';
import PropertyCard from '@/components/PropertyCard';
import styled from '@emotion/styled';

export default function Home() {
  return (
    <GridContainer>
      <PropertyCard />
    </GridContainer>
  );
}

const GridContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
