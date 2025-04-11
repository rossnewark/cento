import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { navObserverOptions } from '../utils/animation';

export function useScrollSpy(sections: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]);
  
  // Create InView refs for each section
  const sectionRefs = sections.map(section => {
    const [ref, inView] = useInView(navObserverOptions);
    return { section, ref, inView };
  });
  
  // Debounced update of active section
  useEffect(() => {
    const visibleSections = sectionRefs.filter(item => item.inView);
    
    // Debounce logic to avoid multiple state updates
    if (visibleSections.length > 0) {
      const timeoutId = setTimeout(() => {
        // Find the first visible section (closest to top)
        setActiveSection(visibleSections[0].section);
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [sectionRefs.map(item => item.inView)]);
  
  return { activeSection, sectionRefs };
}

export default useScrollSpy;