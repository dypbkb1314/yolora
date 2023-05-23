import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../../AuthProvider';

import './index.less';

interface State extends Omit<Location, 'state'> {
  state: {
    from: {
      pathname: string;
    };
  };
}

const useAuth = () => useContext(AuthContext);

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  let auth = useAuth();
  let { signIn } = auth as AuthContextType;
  const { state } = useLocation() as State;
  let from = state.from.pathname || '/';

  const login = async () => {
    if (name && password) {
      const user = {
        username: name,
        password,
      };
      try {
        const res: any = await fetch('http://127.0.0.1:3001/api/insert', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(user),
        });
        if (res.status === 200) {
          // navigate('/');
          signIn(name, () => navigate(from, { replace: true }));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className='loginBox'>
      <div className='main'>
        <p className='sign'>Sign in</p>
        <div className='form1'>
          <input
            className='un '
            type='text'
            placeholder='Username'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='pass'
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className='submit' onClick={login}>
            Sign in
          </span>
          <p className='forgot'>
            <span>Forgot Password?</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
