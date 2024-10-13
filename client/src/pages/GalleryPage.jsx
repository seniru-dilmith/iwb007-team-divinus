import React from 'react';
import GalleryGrid from '../components/galleryPage/GalleryGrid';
import '../css/galleryPage/gallery.css';

const GalleryPage = () => {
  return (
    <div className="gallery-page">
      <h1 className="gallery-title text-center">Gallery</h1>
      <GalleryGrid />
    </div>
  );
};

export default GalleryPage;
