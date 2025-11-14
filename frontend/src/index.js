import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // <-- LIGUE AQUI
import App from './App';
import './styles/global.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- LIGUE AQUI */}
        <App />
      </AuthProvider> {/* <-- LIGUE AQUI */}
    </BrowserRouter>
  </React.StrictMode>
);