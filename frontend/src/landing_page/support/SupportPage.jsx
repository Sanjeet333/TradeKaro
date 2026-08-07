import React, { useState } from 'react';
import Hero from './Hero';
import FAQList from './FAQList';
import ContactForm from './ContactForm';

const SupportPage = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="bg-white font-body">
      <Hero query={query} setQuery={setQuery} />
      <FAQList query={query} />
      <ContactForm />
    </div>
  );
};

export default SupportPage;
