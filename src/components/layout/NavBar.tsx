import React, { useState, memo } from 'react';
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

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
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
              <span className="text-white font-bold">{companyInitials}</span>
            </motion.div>
            <span className="text-2xl font-bold text-blue-900">{companyName}</span>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 transition-colors"
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 pb-3 space-y-1"
          >
            {navLinks.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`block px-3 py-2 text-gray-600 hover:bg-gray-50 ${
                  activeSection === section ? 'bg-blue-50 text-blue-900 font-semibold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </motion.div>
        </div>
      )}
    </nav>
  );
};

export default memo(Navbar);