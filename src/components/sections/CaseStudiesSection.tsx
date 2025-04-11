import React, { useState, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import CaseStudyCard from '../ui/CaseStudyCard';
import caseStudies from '../../data/caseStudies';
import { normalTransition, standardObserverOptions } from '../../utils/animation';

const CaseStudiesSection: React.FC = () => {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [titleRef, titleInView] = useInView(standardObserverOptions);
  
  const toggleCase = (id: string) => {
    setExpandedCase(prevId => prevId === id ? null : id);
  };

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={normalTransition}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Case Studies
          </h2>
        </motion.div>
        
        <div className="space-y-6">
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              isExpanded={expandedCase === study.id}
              onToggle={() => toggleCase(study.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(CaseStudiesSection);