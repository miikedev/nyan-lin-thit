import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { DashboardFilterProvider } from '../context/DashboardFilterContext'
const Layout = () => {
  return (
    <>
        <Header />
        <DashboardFilterProvider>
        <Outlet />
        </DashboardFilterProvider>
        <Footer />
    </>
  )
}

export default Layout