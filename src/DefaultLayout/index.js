import React from 'react'
import { Outlet, useLocation } from "react-router-dom";
import Footer from '../components/Footer';


export default function DefaultLayout() {
  return (
    <>
      <Outlet/>
      <Footer/>
    </>
  )
}
