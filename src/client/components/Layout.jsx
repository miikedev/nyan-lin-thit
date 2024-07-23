import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { DashboardFilterProvider } from '../context/DashboardFilterContext'
import { DashboardDataProvider } from '../context/DashboardDataContext'
import { DashboardDateProvider } from '../context/DashboardDateContext'
const Layout = () => {
  return (
    <>
        <Header />
        <DashboardFilterProvider>
        <DashboardDataProvider>
          <DashboardDateProvider>
          <Outlet />
          </DashboardDateProvider>
        </DashboardDataProvider>
        </DashboardFilterProvider>
        <Footer />
    </>
  )
}

export default Layout