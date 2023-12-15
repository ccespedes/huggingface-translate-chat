import React from 'react'
import parrotImage from '../assets/parrot.png'

const Header = () => {
  return (
    <header>
      <img className="logo-image" src={`${parrotImage}`} />
      <div>
        <h1 className="header-text">PollyGlot</h1>
        <p className="header-desc">Perfect Translation Every Time</p>
      </div>
    </header>
  )
}

export default Header
