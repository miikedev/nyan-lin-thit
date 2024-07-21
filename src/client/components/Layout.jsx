import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { DashboardFilterProvider } from '../context/DashboardFilterContext'
import { DashboardDataProvider } from '../context/DashboardDataContext'
const Layout = () => {
  return (
    <>
        <Header />
        <DashboardFilterProvider>
        <DashboardDataProvider>
          <Outlet />
        </DashboardDataProvider>
        </DashboardFilterProvider>
        <Footer />
    </>
  )
}

export default Layout