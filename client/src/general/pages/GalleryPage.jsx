import React from 'react';
import GalleryGrid from '../components/galleryPage/GalleryGrid';
import Navbar from '../components/common/navbar';
import Footer from '../components/common/Footer';
import '../css/galleryPage/gallery.css';

const GalleryPage = () => {
  return (
    <div className="gallery-page">
      <Navbar /> {/* The Navbar will be visible on all pages */}
      <h1 className="gallery-title text-center">Gallery</h1>
      <GalleryGrid />
      <Footer /> {/* The Footer will be visible on all pages */}
    </div>
  );
};

export default GalleryPage;
