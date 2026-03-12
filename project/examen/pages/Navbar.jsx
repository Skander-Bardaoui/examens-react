import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item mx-2 ">
        <Link to='/dashboard' >Dashboard </Link>
      </li>
      <li className="nav-item mx-2">
        <Link to='/projects' >Projects </Link>
      </li>
      <li className="nav-item">
        <Link to='/projects/add' >Add project </Link>
      </li>
    
    </ul>
  </div>
</nav>

    </>
  )
}

export default Navbar
