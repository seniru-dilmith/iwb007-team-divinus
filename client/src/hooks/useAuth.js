import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const {accessToken, setAccessToken} = useContext(AuthContext);
  return {accessToken, setAccessToken};
}

export default useAuth;