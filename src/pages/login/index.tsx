import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

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
  let from = state?.from?.pathname || '/';

  const login = async () => {
    message.success('success');
    if (name && password) {
      const user = {
        username: name,
        password,
      };
      try {
        try {
          const res = (await axios.post('/api/login', user)) || {};
          const { data } = res;
          if (data && data.status === 200) {
            // signIn(name, () => navigate(from, { replace: true }));
          }
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const register = async () => {
    if (name && password) {
      const user = {
        username: name,
        password,
      };
      try {
        const res = (await axios.post('/api/register', user)) || {};
        const { data } = res;
        if (data && data.status === 200) {
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
          <div className='newBox'>
            <span className='submit' onClick={login}>
              Login in
            </span>
            <span className='register' onClick={register}>
              Sign up
            </span>
            <p className='forgot'>
              <span>Forgot Password?</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
