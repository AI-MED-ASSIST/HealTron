import React from 'react'
import Home from '../components/Home'
import About from '../components/About'
import Services from '../components/Services'
import Models from '../components/Models'
import Contact from '../components/Contact'

function HomePage() {
  return (
    <div>
        <Home/>
        <About/>
        <Services/>
        <Models/>
        <Contact/>
    </div>
  )
}

export default HomePage