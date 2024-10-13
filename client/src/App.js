import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import BookingPage from './pages/BookingPage';
import ValidatePage from './pages/ValidatePage';
import ListOfAvailableTrains from './pages/ListOfAvailableTrains';
import Navbar from './components/common/navbar';
import Footer from './components/common/Footer';
import PaymentPage from './pages/PaymentPage';
import GalleryPage from './pages/GalleryPage';
import ContactUs from './pages/ContactUs';

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
        <Route path="*" element={<h1>Not Found</h1>} /> {/* 404 Route */}
      </Routes>
      <Footer /> {/* The Footer will be visible on all pages */}
    </Router>
  );
}

export default App;
