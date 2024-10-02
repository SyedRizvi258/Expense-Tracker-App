import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {GlobalStyle} from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';

// This is the entry point of the application. It renders the App component and the GlobalStyle component.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
