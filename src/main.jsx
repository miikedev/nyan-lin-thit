// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { MantineProvider } from '@mantine/core';
import App from './App';
import './index.css';
import '@mantine/core/styles.css';
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </NextUIProvider>
  </React.StrictMode>
);
