import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </NextUIProvider>
  </React.StrictMode>
)
