import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './Pages/LandingPage/LandingPage'
import ScanCode from './Pages/ScanCode/ScanCode'
import ScanImage from './Pages/ScanImage/ScanImage'
import ScanOutput from './Pages/ScanOutput/ScanOutput'
import ScanProcess from './Pages/ScanProcess/ScanProcess'
import {  createHashRouter, RouterProvider } from 'react-router-dom'
function App() {

  const router = createHashRouter ([
    {
      path: "/",
      element: <LandingPage/>
    },
    {
      path: "/Scancode",
      element: <ScanCode/>
    },
    {
      path: "/ScanImage",
      element: <ScanImage/>
    },
    {
      path:"/ScanOutput",
      element:<ScanOutput/>
    },
    {
      path:"/ScanProcess",
      element:<ScanProcess/>
    }
  ])


  return (
      <RouterProvider router={router} />
  )
}

export default App
