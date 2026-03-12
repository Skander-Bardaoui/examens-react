import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Projects from '../pages/Projects'
import AddProject from '../pages/AddProject'
import DetailsProject from '../pages/DetailsProject'
import Navbar from '../pages/Navbar'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path='/'element={<Dashboard/>} />
      <Route path='/projects'element={<Projects/>} />
      <Route path='/projects/add'element={<AddProject/>} />
      <Route path='/projects/:id'element={<Projects/>} />
      <Route path='/projects/:id'element={<DetailsProject/>} />
      <Route path='/dashboard'element={<Dashboard/>} />

    </Routes>
     
    </>
  )
}

export default App
