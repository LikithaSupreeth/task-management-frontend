import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
      <BrowserRouter>
          <App />
          <ToastContainer />
      </BrowserRouter>
  </AuthProvider>
);


