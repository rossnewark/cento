import React, { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ContactForm from '../ui/ContactForm';
import ContactInfo from '../ui/ContactInfo';
import { normalTransition, standardObserverOptions } from '../../utils/animation';

interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
  companyInfo: {
    phone: string;
    email: string;
    address: React.ReactNode;
  };
}

const ContactSection: React.FC<ContactSectionProps> = ({ sectionRef, companyInfo }) => {
  const [titleRef, titleInView] = useInView(standardObserverOptions);

  const officeImage = {
    src: 'https://images.unsplash.com/photo-1553290322-e4e8f10fcc09?auto=format&fit=crop&q=80',
    alt: 'Office location'
  };

  return (
    <section ref={sectionRef} id="contact" className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={normalTransition}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Get in Touch
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactInfo
            phone={companyInfo.phone}
            email={companyInfo.email}
            address={companyInfo.address}
            image={officeImage}
          />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default memo(ContactSection);