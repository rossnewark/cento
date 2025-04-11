import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { slowTransition } from '../../utils/animation';

interface HeroSectionProps {
    companyName: string;
    tagline: string;
    backgroundImage: string;
    sectionRef?: React.RefObject<HTMLElement>;
  }

const HeroSection: React.FC<HeroSectionProps> = ({
  companyName,
  tagline,
  backgroundImage,
  sectionRef
}) => {
  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={slowTransition}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {companyName}
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8">
          {tagline}
        </p>
        <a
          href="#contact"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 transition-colors"
        >
          Get Started
          <ArrowRight className="ml-2" size={20} />
        </a>
      </motion.div>
    </section>
  );
};

export default memo(HeroSection);