import { useEffect } from "react";
import "./App.css";
import AuthProvider from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import useRefreshToken from "./hooks/useRefreshToken";
import WaitingProvider from "./context/WaitingContext";
import { useLocation } from "react-router-dom";

import Navbar from "./general/components/common/navbar";
import NavbarAdmin from "./admin/components/common/NavbarAdmin";
import Footer from "./general/components/common/Footer";

function App() {
  const location = useLocation();
  const pathStr = location.pathname;
  const paths = pathStr.split("/");
  const navCondition = paths[1]==="admin" && paths.length>2;


  return (
    <WaitingProvider>
      <AuthProvider>
        <div className="main-container">
          {navCondition ? <NavbarAdmin /> : <Navbar /> }
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
