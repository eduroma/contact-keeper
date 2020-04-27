import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import alertContext from '../../context/alert/alertContext';
import authContext from '../../context/auth/authContext';

const Register = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const history = useHistory();

  const { name, email, password, password2 } = user;

  const { setAlert } = useContext(alertContext);
  const { register, error, clearError, isAuthenticated } = useContext(
    authContext
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearError();
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      setAlert('Please, enter all fileds', 'danger');
    } else if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password:</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
