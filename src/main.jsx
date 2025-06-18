import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Make sure this path correctly points to your App.jsx file
import './index.css'; // This imports your global CSS for styling

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);