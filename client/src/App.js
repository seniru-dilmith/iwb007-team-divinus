import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './general/pages/home';
import BookingPage from './general/pages/BookingPage';
import ValidatePage from './general/pages/ValidatePage';
import ListOfAvailableTrains from './general/pages/ListOfAvailableTrains';
import Navbar from './general/components/common/navbar';
import Footer from './general/components/common/Footer';
import PaymentPage from './general/pages/PaymentPage';
import GalleryPage from './general/pages/GalleryPage';
import ContactUs from './general/pages/ContactUs';
import NotFound from './general/pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Navbar /> {/* The Navbar will be visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/booking" element={<BookingPage />} /> {/* Booking page route */}
        <Route path="/validate" element={<ValidatePage />} /> {/* Ticket Validation Route */}
        <Route path="/trains" element={<ListOfAvailableTrains />} /> {/* Available Trains Route */}
        <Route path="/payment" element={<PaymentPage />} /> {/* Payment page route */}
        <Route path="/gallery" element={<GalleryPage />} /> {/* Gallery page route */} 
        <Route path="/contact" element={<ContactUs />} /> {/* Contact page route */}
        <Route path="*" element={<NotFound />} /> {/* 404 Route */}
      </Routes>
      <Footer /> {/* The Footer will be visible on all pages */}
    </Router>
  );
}

export default App;
