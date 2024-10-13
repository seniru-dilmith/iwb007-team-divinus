import React from 'react';
import { Col, Card } from 'react-bootstrap';

const GalleryItem = ({ title, imageUrl }) => {
  return (
    <Col sm={12} md={6} lg={4} className="mb-4">
      <Card className="gallery-item h-100 shadow-sm">
        <Card.Img variant="top" src={imageUrl} alt={title} className="gallery-image" />
        <Card.Body className="text-center">
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default GalleryItem;
