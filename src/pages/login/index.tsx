import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

import { AuthContext, AuthContextType } from '../../AuthProvider';

import './index.scss';

interface State extends Omit<Location, 'state'> {
  state: {
    from: {
      pathname: string;
    };
  };
}

const useAuth = () => useContext(AuthContext);

const Login = () => {
  const [isSign, setSign] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  let auth = useAuth();
  let { signIn, user } = auth as AuthContextType;
  const { state } = useLocation() as State;
  let from = state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  const login = async () => {
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
            localStorage.setItem('user', name);
            localStorage.setItem('token', data.token);
            signIn(name, () => navigate(from, { replace: true }));
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
          localStorage.setItem('user', name);
          signIn(name, () => navigate(from, { replace: true }));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className={`cont ${isSign}`}>
      <div className='form sign-in'>
        <h2>Welcome back,</h2>
        <label>
          <span>Name</span>
          <input type='text' onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span>Password</span>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p className='forgot-pass'>Forgot password?</p>
        <button type='button' className='submit' onClick={login}>
          Sign In
        </button>
      </div>
      <div className='sub-cont'>
        <div className='img'>
          <div className='img__text m--up'>
            <h2>New here?</h2>
            <p>Sign up and discover great amount of new opportunities!</p>
          </div>
          <div className='img__text m--in'>
            <h2>One of us?</h2>
            <p>
              If you already has an account, just sign in. We've missed you!
            </p>
          </div>
          <div
            className='img__btn'
            onClick={() => setSign(isSign ? '' : 's--signup')}
          >
            <span className='m--up'>Sign Up</span>
            <span className='m--in'>Sign In</span>
          </div>
        </div>
        <div className='form sign-up'>
          <h2>Time to feel like home,</h2>
          <label>
            <span>Name</span>
            <input type='text' onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            <span>Email</span>
            <input type='email' />
          </label>
          <label>
            <span>Password</span>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type='button' className='submit' onClick={register}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
