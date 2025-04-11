import React, { memo } from 'react';
import ServiceCard from '../ui/ServiceCard';
import services from '../../data/services';

interface ServicesSectionProps {
  sectionRef?: React.RefObject<HTMLElement>; // Make ref optional
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ sectionRef }) => {
  return (
    <section ref={sectionRef} id="services" className="py-12 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              index={index}
              totalCards={services.length} // Pass total cards count for auto-flip coordination
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ServicesSection);