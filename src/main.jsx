// src/main.jsx
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { NextUIProvider } from '@nextui-org/react';
import "leaflet/dist/leaflet.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ResourceProvider } from './client/context/ResourceContext';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <MantineProvider>
        <NextUIProvider>
            <ResourceProvider>
              <App />
            </ResourceProvider>
        </NextUIProvider>
      </MantineProvider>
  // </React.StrictMode>
);
