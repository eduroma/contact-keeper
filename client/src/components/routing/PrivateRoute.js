import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated && !loading ? (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
