import React, { useState, useEffect, memo } from 'react';
import { Service } from '../../data/services';

interface ServiceCardProps {
  service: Service;
  index: number; // Add index for staggered reveal
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Simple fade-in on mount with staggered delay based on index
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + (index * 50)); // Staggered reveal
    
    return () => clearTimeout(timer);
  }, [index]);
  
  // Simplified card flip without preserve-3d and complex transforms
  return (
    <div 
      className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="relative h-64 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className="w-full h-full">
          {/* Front side */}
          <div
            className={`absolute w-full h-full bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${
              isFlipped ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <service.icon className="w-12 h-12 text-blue-900 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
          
          {/* Back side - only rendered when flipped */}
          {isFlipped && (
            <div className="absolute w-full h-full bg-blue-900 p-6 rounded-lg shadow-md text-white transition-opacity duration-300">
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p>{service.details}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ServiceCard);