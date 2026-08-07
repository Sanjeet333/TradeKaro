import React from 'react';
import Hero from './Hero';
import Awards from './Awards';
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';
import Footer from '../Footer';
import OpenAccount from '../OpenAccount';
import Navbar from '../Navbar';

const HomePage = () => {
  return (
    <div className="bg-white font-body">
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
    </div>
  );
};

export default HomePage;
