import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import HeaderNav from '../../components/headerNav';
import './index.less';
import { AuthContext, AuthContextType } from '../../AuthProvider';

const useAuth = () => useContext(AuthContext);

const Account = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { signOut, user } = auth as AuthContextType;
  const getUser = async () => {
    const res = await axios.get('/api/user');
    console.log(res);
  };
  const loginout = () => {
    signOut(() => navigate('/'));
  };
  return (
    <div>
      <HeaderNav />
      <p>hello, {user}</p>
      <button onClick={getUser}>get user</button>
      <button onClick={loginout}>login out</button>
    </div>
  );
};

export default Account;
