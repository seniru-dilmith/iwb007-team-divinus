import { useEffect } from 'react';
import './App.css';
import AuthProvider from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import useRefreshToken from './hooks/useRefreshToken';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
