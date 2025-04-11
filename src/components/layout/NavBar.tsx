import React, { useState, memo, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  companyName: string;
  companyInitials: string;
}

const navLinks = ['home', 'services', 'about', 'contact'];

const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  companyName,
  companyInitials
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-10 h-10 ${isScrolled ? 'bg-blue-900' : 'bg-blue-900 bg-opacity-90'} rounded-full flex items-center justify-center`}
            >
              <span className="text-white font-bold">{companyInitials}</span>
            </motion.div>
            <span className={`text-2xl font-bold ${isScrolled ? 'text-blue-900' : 'text-white'}`}>{companyName}</span>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className={`${isScrolled ? 'text-gray-600' : 'text-white'} hover:text-gray-900 transition-colors`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navLinks.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="relative group"
              >
                <span className={`${
                  isScrolled 
                    ? activeSection === section 
                      ? 'text-blue-900 font-semibold' 
                      : 'text-gray-600 hover:text-blue-800' 
                    : activeSection === section 
                      ? 'text-white font-semibold' 
                      : 'text-gray-100 hover:text-white'
                } transition-colors`}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
                
                {/* Active section indicator */}
                <span 
                  className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 transform ${
                    activeSection === section 
                      ? 'scale-100 bg-blue-600' 
                      : 'scale-0 bg-transparent group-hover:scale-75 group-hover:bg-blue-400'
                  }`} 
                />
                
                {/* Active section dot indicator */}
                {activeSection === section && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-3 top-0 w-2 h-2 rounded-full bg-blue-600"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`pt-2 pb-3 space-y-1 ${isScrolled ? 'bg-white' : 'bg-blue-900 bg-opacity-90'}`}
          >
            {navLinks.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`block px-3 py-2 relative ${
                  isScrolled
                    ? activeSection === section 
                      ? 'bg-blue-50 text-blue-900 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-50'
                    : activeSection === section
                      ? 'bg-blue-800 text-white font-semibold'
                      : 'text-white hover:bg-blue-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  {activeSection === section && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-blue-400 rounded-full mr-2"
                    />
                  )}
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      )}
    </nav>
  );
};

export default memo(Navbar);