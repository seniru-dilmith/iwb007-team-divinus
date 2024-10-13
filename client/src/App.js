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
import LoginPage from './admin/pages/login/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/booking" element={<BookingPage />} /> {/* Booking page route */}
        <Route path="/validate" element={<ValidatePage />} /> {/* Ticket Validation Route */}
        <Route path="/trains" element={<ListOfAvailableTrains />} /> {/* Available Trains Route */}
        <Route path="/payment" element={<PaymentPage />} /> {/* Payment page route */}
        <Route path="/gallery" element={<GalleryPage />} /> {/* Gallery page route */} 
        <Route path="/contact" element={<ContactUs />} /> {/* Contact page route */}

        {/* Admin Routes */}
        <Route path="/admin" element={<LoginPage />} /> {/* Admin Dashboard Route */}
        <Route path="/admin/schedule*" element={<h1> Schedule </h1>} /> {/* Schedule a new train */}
        <Route path="/admin/add-train" element={<h1> Add Train </h1>} /> {/* Add a new train */}

        {/* Not found page */}
        <Route path="*" element={<NotFound />} /> {/* 404 Route */}
      </Routes>
    </Router>
  );
}

export default App;
