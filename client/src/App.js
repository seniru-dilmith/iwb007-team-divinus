import { useEffect } from "react";
import "./App.css";
import AuthProvider from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import useRefreshToken from "./hooks/useRefreshToken";
import WaitingProvider from "./context/WaitingContext";

import Navbar from "./general/components/common/navbar";
import Footer from "./general/components/common/Footer";

function App() {
  return (
    <WaitingProvider>
      <AuthProvider>
        <div className="main-container">
          <Navbar />
          <div className="page-container">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </WaitingProvider>
  );
}

export default App;
