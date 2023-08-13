import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from './Components/themeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

    <ThemeProvider>

  <BrowserRouter>
  <App />
  </BrowserRouter>
  </ThemeProvider>

);
