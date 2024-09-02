import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import Home from './ipl-home/home'
import 'bootstrap/dist/css/bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Home />
  </React.StrictMode>
);
