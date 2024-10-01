import React from 'react'
import { Outlet } from 'react-router-dom'

import { DashboardDataProvider } from '../context/DashboardDataContext'
import { DashboardDateProvider } from '../context/DashboardDateContext'
import { DashboardFilterProvider } from '../context/DashboardFilterContext'
import { DashboardGeoJsonFilterProvider } from '../context/DashboardGeoJsonContext'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  return (
    <>
        <Header />
        <DashboardFilterProvider>
        <DashboardDataProvider>
          <DashboardDateProvider>
          <DashboardGeoJsonFilterProvider>
          <Outlet />
          </DashboardGeoJsonFilterProvider>
          </DashboardDateProvider>
        </DashboardDataProvider>
        </DashboardFilterProvider>
        <Footer />
    </>
  )
}

export default Layout