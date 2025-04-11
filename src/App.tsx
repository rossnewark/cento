import React, { useRef } from 'react';
import {
  Navbar,
  Footer,
  HeroSection,
  ServicesSection,
  AboutSection,
  CaseStudiesSection,
  ContactSection
} from './components';
import { useScrollSpy } from './hooks';

function App() {
  // Refs for sections to be used with IntersectionObserver
  const homeRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Company information
  const company = {
    name: 'Cento Consulting Ltd',
    initials: 'C',
    tagline: 'Strategic Business Solutions for Sustainable Growth',
    phone: '+1 (555) 123-4567',
    email: 'contact@centoconsulting.com',
    address: (
      <>
        Cento Consulting Ltd, <br />
        110 Aylesbury Avenue, <br />
        Eastbourne, <br />
        East Sussex, <br />
        BN23 6EL <br />
      </>
    )
  };

  // Use the custom scroll spy hook to track active section
  const { activeSection } = useScrollSpy(['home', 'services', 'about', 'contact']);

  // Images
  const heroBackground = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80';

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar 
        activeSection={activeSection} 
        companyName={company.name} 
        companyInitials={company.initials}
      />

      {/* Hero Section */}
      <HeroSection
        companyName={company.name}
        tagline={company.tagline}
        backgroundImage={heroBackground}
        sectionRef={homeRef}
      />

      {/* Services Section */}
      <ServicesSection sectionRef={servicesRef} />

      {/* About Section */}
      <AboutSection sectionRef={aboutRef} />

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* Contact Section */}
      <ContactSection 
        sectionRef={contactRef}
        companyInfo={{
          phone: company.phone,
          email: company.email,
          address: company.address
        }}
      />

      {/* Footer */}
      <Footer companyName={company.name} />
    </div>
  );
}

export default App;