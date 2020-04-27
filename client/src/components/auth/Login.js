import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import authContext from '../../context/auth/authContext';
import alertContext from '../../context/alert/alertContext';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const { isAuthenticated, error, clearError, login } = useContext(authContext);
  const { setAlert } = useContext(alertContext);

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearError();
    }

    //eslint-disable-next-line
  }, [isAuthenticated, error]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      login({ email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address:</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
