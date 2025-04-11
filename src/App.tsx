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

  // Use optimized scroll spy hook with section IDs directly
  const { activeSection } = useScrollSpy(['home', 'services', 'about', 'contact'], {
    rootMargin: "-100px 0px",
    threshold: 0.3,
    debounceTime: 100
  });

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
      />

      {/* Services Section */}
      <ServicesSection />

      {/* About Section */}
      <AboutSection />

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* Contact Section */}
      <ContactSection 
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