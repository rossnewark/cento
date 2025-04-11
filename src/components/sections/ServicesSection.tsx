
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ServiceCard from '../ui/ServiceCard';
import services from '../../data/services';
import { normalTransition, standardObserverOptions } from '../../utils/animation';

interface ServicesSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ sectionRef }) => {
  const [titleRef, titleInView] = useInView(standardObserverOptions);

  return (
    <section ref={sectionRef} id="services" className="py-12 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={normalTransition}
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
  );
};

export default memo(ServicesSection);