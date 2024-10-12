import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import BookingPage from './pages/BookingPage';
import ValidatePage from './pages/ValidatePage';
import Navbar from './components/common/navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <Navbar /> {/* The Navbar will be visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/booking" element={<BookingPage />} /> {/* Booking page route */}
        <Route path="/validate" element={<ValidatePage />} /> {/* Ticket Validation Route */}
      </Routes>
      <Footer /> {/* The Footer will be visible on all pages */}
    </Router>
  );
}

export default App;
