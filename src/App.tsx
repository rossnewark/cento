import React, { useEffect, useState } from 'react';
import { Menu, X, Phone, Mail, ArrowRight, Building2, Users2, LineChart, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const [homeRef, homeInView] = useInView({ threshold: 0.5 });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.5 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.5 });
  const [contactRef, contactInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (homeInView) setActiveSection('home');
    else if (servicesInView) setActiveSection('services');
    else if (aboutInView) setActiveSection('about');
    else if (contactInView) setActiveSection('contact');
  }, [homeInView, servicesInView, aboutInView, contactInView]);

  const services = [
    {
      title: 'Business Strategy',
      icon: Building2,
      description: 'Develop comprehensive strategies to drive your business forward.',
      details: 'Our strategic planning process involves market analysis, competitive positioning, and growth strategy development. We help you identify opportunities and create actionable plans for success.'
    },
    {
      title: 'Management Consulting',
      icon: Users2,
      description: 'Optimize your operations and improve organizational effectiveness.',
      details: 'From organizational restructuring to process optimization, we provide expert guidance to enhance your management systems and team performance.'
    },
    {
      title: 'Performance Analysis',
      icon: LineChart,
      description: 'Data-driven insights to enhance business performance.',
      details: 'Using advanced analytics and industry benchmarks, we help you measure, analyze, and improve key performance indicators across your organization.'
    }
  ];

  const caseStudies = [
    {
      id: 'case1',
      title: 'Manufacturing Efficiency Improvement',
      summary: 'Helped a manufacturing company increase efficiency by 35%',
      details: 'Through process optimization and lean manufacturing implementation, we helped reduce waste and improve production efficiency, resulting in significant cost savings.'
    },
    {
      id: 'case2',
      title: 'Retail Digital Transformation',
      summary: 'Led digital transformation for a retail chain',
      details: 'Implemented an omnichannel strategy and modernized operations, resulting in a 50% increase in online sales and improved customer satisfaction.'
    }
  ];

  const ServiceCard = ({ service }: { service: typeof services[0] }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <motion.div
        className="relative h-64 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`absolute w-full h-full bg-white p-6 rounded-lg shadow-md ${
            isFlipped ? 'backface-hidden' : ''
          }`}
        >
          <service.icon className="w-12 h-12 text-blue-900 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
        <div
          className={`absolute w-full h-full bg-blue-900 p-6 rounded-lg shadow-md text-white ${
            !isFlipped ? 'backface-hidden' : ''
          }`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
          <p>{service.details}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold">C</span>
              </motion.div>
              <span className="text-2xl font-bold text-blue-900">Cento Consulting</span>
            </div>
            
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              {['home', 'services', 'about', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`text-gray-600 hover:text-blue-900 transition-colors ${
                    activeSection === section ? 'text-blue-900 font-semibold' : ''
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {['home', 'services', 'about', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`block px-3 py-2 text-gray-600 hover:bg-gray-50 ${
                    activeSection === section ? 'bg-blue-50 text-blue-900 font-semibold' : ''
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        ref={homeRef}
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80') center/cover no-repeat fixed`
        }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Cento Consulting Ltd
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Strategic Business Solutions for Sustainable Growth
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50"
          >
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </a>
        </motion.div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="h-full rounded-lg shadow-md"
              >
                <SwiperSlide>
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                    alt="Business consulting"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
                    alt="Team meeting"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                    alt="Strategy session"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Us?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-900 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">Over 20 years of industry experience</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-900 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">Tailored solutions for your business needs</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-900 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">Proven track record of success</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Case Studies
          </h2>
          <div className="space-y-6">
            {caseStudies.map((study) => (
              <motion.div
                key={study.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center"
                  onClick={() => setExpandedCase(expandedCase === study.id ? null : study.id)}
                >
                  <h3 className="text-xl font-semibold">{study.title}</h3>
                  <ChevronDown
                    className={`transform transition-transform ${
                      expandedCase === study.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedCase === study.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0">
                        <p className="text-gray-600">{study.details}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-blue-900 mr-2" />
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-900 mr-2" />
                  <span className="text-gray-600">contact@paulnewarkconsulting.com</span>
                </div>
              </div>
              <div className="h-[300px] rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1553290322-e4e8f10fcc09?auto=format&fit=crop&q=80"
                  alt="Office location"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600">
                  Cento Consulting Ltd, <br />
                  110 Aylesbury Avenue, <br />
                  Eastbourne, <br />
                  East Sussex, <br />
                  BN23 6EL <br />
                </p>
              </div>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              ></textarea>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Cento Consulting Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;