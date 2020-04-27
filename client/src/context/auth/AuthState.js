import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCESS,
  REGISTER_FAIL,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    const token = localStorage.getItem('token');

    if (token) setAuthToken(token);

    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        clearError,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
