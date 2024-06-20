
import './App.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from './client/components/Layout'
import Home from './client/pages/Home'
import Dashboard from './client/pages/Dashboard'
import About from './client/pages/About'
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='dashboard' element={<Dashboard />} />
    <Route path='about' element={<About />} />
  </Route>
))
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
