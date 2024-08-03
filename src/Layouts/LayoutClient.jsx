import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './../components/Header';
import Footer from './../components/Footer';

const LayoutClient = () => {
  return (
    <>
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </>
  )
}

export default LayoutClient
