import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';
import { CaseStudy } from '../../data/caseStudies';
import { fastTransition, standardObserverOptions } from '../../utils/animation';

interface CaseStudyCardProps {
  study: CaseStudy;
  isExpanded: boolean;
  onToggle: () => void;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, isExpanded, onToggle }) => {
  const [ref, inView] = useInView(standardObserverOptions);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={fastTransition}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <button
        className="w-full p-6 text-left flex justify-between items-center"
        onClick={onToggle}
      >
        <h3 className="text-xl font-semibold">{study.title}</h3>
        <ChevronDown
          className={`transform transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0">
              <p className="text-gray-600">{study.details}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(CaseStudyCard);