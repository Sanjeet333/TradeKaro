import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './landing_page/Navbar.jsx';
import Footer from './landing_page/Footer.jsx';

import HomePage from './landing_page/home/HomePage.jsx';
import Signup from './landing_page/signup/Signup.jsx';
import Login from './landing_page/signup/Login.jsx';
import AboutPage from './landing_page/about/AboutPage.jsx';
import ProductsPage from './landing_page/products/ProductsPage.jsx';
import PricingPage from './landing_page/pricing/PricingPage.jsx';
import SupportPage from './landing_page/support/SupportPage.jsx';
import Notfound from './landing_page/NotFound.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
