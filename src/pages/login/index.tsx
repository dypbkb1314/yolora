import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.less';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = () => {
    if (name && password) {
      const user = {
        name,
        password,
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      navigate('/');
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
