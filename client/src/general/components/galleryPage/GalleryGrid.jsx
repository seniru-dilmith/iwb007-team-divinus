import React from 'react';
import { Container, Row } from 'react-bootstrap';
import GalleryItem from './GalleryItem';
import image_1 from '../../assets/gallery/train-1.png';
import image_2 from '../../assets/gallery/train-2.png';
import image_3 from '../../assets/gallery/train-3.png';
import image_4 from '../../assets/gallery/train-4.png';
import image_5 from '../../assets/gallery/train-5.png';

const GalleryGrid = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Crossing the Famous Bridge',
      imageUrl: image_1
    },
    {
      id: 2,
      title: 'Tracks to Infinity',
      imageUrl: image_2,
    },
    {
      id: 3,
      title: 'The Scenic Rail Adventure',
      imageUrl: image_3,
    },
    {
      id: 4,
      title: 'Rolling Hills and Railways',
      imageUrl: image_4,
    },
    {
      id: 5,
      title: 'Journey Through Nature',
      imageUrl: image_5,
    },
  ];

  return (
    <Container>
      <Row className="justify-content-center">
        {galleryItems.map((item) => (
          <GalleryItem key={item.id} title={item.title} imageUrl={item.imageUrl} />
        ))}
      </Row>
    </Container>
  );
};

export default GalleryGrid;
