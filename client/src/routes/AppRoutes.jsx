import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../general/pages/home";
import BookingPage from "../general/pages/BookingPage";
import ValidatePage from "../general/pages/ValidatePage";
import ListOfAvailableTrains from "../general/pages/ListOfAvailableTrains";
import PaymentPage from "../general/pages/PaymentPage";
import GalleryPage from "../general/pages/GalleryPage";
import ContactUs from "../general/pages/ContactUs";
import NotFound from "../general/pages/NotFoundPage";
import CardPaymentPage from "../general/pages/CardPaymentPage";
import LoginPage from "../admin/pages/login/LoginPage";
import AddTrain from "../admin/pages/addTrain/AddTrain";
import Schedule from "../admin/pages/schedule/Schedule";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    if (!refreshToken) return;
    refreshToken();
  }, [refreshToken]);

  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Home page route */}
      <Route path="/booking" element={<BookingPage />} />{" "}
      {/* Booking page route */}
      <Route path="/validate" element={<ValidatePage />} />{" "}
      {/* Ticket Validation Route */}
      <Route path="/trains" element={<ListOfAvailableTrains />} />{" "}
      {/* Available Trains Route */}
      <Route path="/payment" element={<PaymentPage />} />{" "}
      {/* Payment page route */}
      <Route path="/gallery" element={<GalleryPage />} />{" "}
      {/* Gallery page route */}
      <Route path="/contact" element={<ContactUs />} />{" "}
      {/* Contact page route */}
      <Route path="/card-payment" element={<CardPaymentPage />} />{" "}
      {/* Card payment page route */}
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          isAuthenticated ? <Navigate to={"/admin/schedule"} /> : <LoginPage />
        }
      />{" "}
      {/* Admin Dashboard Route */}
      <Route
        path="/admin/schedule"
        element={isAuthenticated ? <Schedule /> : <Navigate to={"/admin"} />}
      />{" "}
      {/* Schedule a new train */}
      <Route
        path="/admin/add-train"
        element={isAuthenticated ? <AddTrain /> : <Navigate to={"/admin"} />}
      />{" "}
      {/* Add a new train */}
      {/* Not found page */}
      <Route path="*" element={<NotFound />} /> {/* 404 Route */}
    </Routes>
  );
}

export default AppRoutes;
