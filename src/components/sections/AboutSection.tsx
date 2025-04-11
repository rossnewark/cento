import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2 } from 'lucide-react';
import SwiperGallery from '../ui/SwiperGallery';
import { normalTransition, standardObserverOptions } from '../../utils/animation';

interface AboutSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const AboutSection: React.FC<AboutSectionProps> = ({ sectionRef }) => {
  const [contentRef, contentInView] = useInView(standardObserverOptions);

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80',
      alt: 'Business consulting'
    },
    {
      src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80',
      alt: 'Team meeting'
    },
    {
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
      alt: 'Strategy session'
    }
  ];

  const benefits = [
    'Over 20 years of industry experience',
    'Tailored solutions for your business needs',
    'Proven track record of success'
  ];

  return (
    <section ref={sectionRef} id="about" className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SwiperGallery images={images} />
          
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 20 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={normalTransition}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Us?
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-900 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutSection);