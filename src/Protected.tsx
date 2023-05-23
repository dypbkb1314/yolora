import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from './AuthProvider';

const useAuth = () => useContext(AuthContext);

const RequiredAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let { user } = auth as AuthContextType;
  let location = useLocation();

  if (!user) return <Navigate to='/login' state={{ from: location }} />;
  return children;
};

export default RequiredAuth;
