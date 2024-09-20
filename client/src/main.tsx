// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { UserProvider } from './context/UserContext';
import { MediaProvider } from './context/MediaContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <UserProvider> */}
      <MediaProvider>
        <App />
      </MediaProvider>
    {/* </UserProvider> */}
  </React.StrictMode>
);