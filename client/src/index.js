import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  // Comentado para não criar conflito com 'react-transition-group' em Contacts.js
  <React.StrictMode>
    <App />,
  </React.StrictMode>,
  document.getElementById('root')
);
