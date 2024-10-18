import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const {accessToken, setAccessToken, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  return {accessToken, setAccessToken, isAuthenticated, setIsAuthenticated};
}

export default useAuth;