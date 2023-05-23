import { useContext } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { AuthContext, AuthContextType } from './AuthProvider';

const useAuth = () => useContext(AuthContext);

const AuthStatus = () => {
  let auth = useAuth();
  let { user, signOut } = auth as AuthContextType;
  let navigate = useNavigate();

  if (!user) return <>no login</>;

  return (
    <>
      <p>hello {user}</p>
      <button
        onClick={() => {
          signOut(() => navigate('/'));
        }}
      >
        login out
      </button>
    </>
  );
};

const Layout = () => {
  return <Outlet />;
};

export default Layout;
