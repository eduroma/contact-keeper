import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/layouts/Navbar';
import Alert from './components/layouts/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import AuthState from './context/auth/AuthState';
import ContactState from './context/contacts/ContactState';
import AlertState from './context/alert/AlertState';

import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <PrivateRoute exact path='/'>
                  <Home />
                </PrivateRoute>
                <Route exact path='/about'>
                  <About />
                </Route>
                <Route exact path='/register'>
                  <Register />
                </Route>
                <Route exact path='/login'>
                  <Login />
                </Route>
              </Switch>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
