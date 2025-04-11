import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Service } from '../../data/services';
import { fastTransition, standardObserverOptions } from '../../utils/animation';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const [ref, inView] = useInView({
    ...standardObserverOptions,
    threshold: 0.1,
  });

  // Only enable animations after component has loaded and is in view
  useEffect(() => {
    if (inView && !animationEnabled) {
      const timer = setTimeout(() => setAnimationEnabled(true), 200);
      return () => clearTimeout(timer);
    }
  }, [inView, animationEnabled]);

  // Prevent expensive animations during scrolling
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={fastTransition}
      className="relative h-64 cursor-pointer"
      onClick={() => animationEnabled && setIsFlipped(!isFlipped)}
    >
      <div
        ref={cardRef}
        className="relative w-full h-full"
        style={{ 
          transformStyle: animationEnabled ? 'preserve-3d' : 'flat',
          perspective: '1000px',
          willChange: animationEnabled ? 'transform' : 'auto'
        }}
      >
        <div
          className="absolute w-full h-full bg-white p-6 rounded-lg shadow-md backface-hidden"
          style={{ 
            transform: isFlipped && animationEnabled ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: animationEnabled ? 'transform 0.6s' : 'none',
            opacity: isFlipped && animationEnabled ? 0 : 1,
          }}
        >
          <service.icon className="w-12 h-12 text-blue-900 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
        <div
          className="absolute w-full h-full bg-blue-900 p-6 rounded-lg shadow-md text-white backface-hidden"
          style={{ 
            transform: !isFlipped || !animationEnabled ? 'rotateY(-180deg)' : 'rotateY(0deg)',
            transition: animationEnabled ? 'transform 0.6s' : 'none',
            opacity: !isFlipped || !animationEnabled ? 0 : 1,
          }}
        >
          <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
          <p>{service.details}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(ServiceCard);