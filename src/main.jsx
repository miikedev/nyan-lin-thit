// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { MantineProvider } from '@mantine/core';
import App from './App';
import './index.css';
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <MantineProvider>
        <NextUIProvider>
            <App />
        </NextUIProvider>
      </MantineProvider>
  </React.StrictMode>
);
