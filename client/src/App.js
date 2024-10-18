import { useEffect } from 'react';
import './App.css';
import AuthProvider from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import useRefreshToken from './hooks/useRefreshToken';
import WaitingProvider from './context/WaitingContext';

function App() {
  return (
    <WaitingProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </WaitingProvider>
  );
}

export default App;
