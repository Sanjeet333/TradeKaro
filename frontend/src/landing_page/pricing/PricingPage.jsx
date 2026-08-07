import React from 'react';
import Hero from './Hero';
import OpenAccount from '../OpenAccount';
import Brokerage from './Brokerage';

const PricingPage = () => {
  return (
    <div className="bg-white font-body">
      <Hero />
      <OpenAccount />
      <Brokerage />
    </div>
  );
};

export default PricingPage;
