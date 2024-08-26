// src/main.jsx
import { MantineProvider } from '@mantine/core';
import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ResourceProvider } from './client/context/ResourceContext';

import './index.css';
import '@mantine/core/styles.css';
import "leaflet/dist/leaflet.css";

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
