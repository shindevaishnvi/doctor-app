import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'

const Home = () => {
  return (
    <div className='space-y-16'>
      <Header />
      <SpecialityMenu />
      <HowItWorks />
      <TopDoctors />
      <Testimonials />
      <FAQ />
      <Banner />
    </div>
  )
}

export default Home



