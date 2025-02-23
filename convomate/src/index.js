import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/index.css'; // Ensure this path is correct

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);