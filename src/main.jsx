import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthContextInfo from '../context/AuthContextInfo.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextInfo>
      <App />
    </AuthContextInfo>
  </StrictMode>
);
