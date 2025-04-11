import { useState, useEffect, useRef } from 'react';

interface ScrollSpyOptions {
  rootMargin?: string;
  threshold?: number | number[];
  debounceTime?: number;
}

export function useScrollSpy(
  sectionIds: string[], 
  options: ScrollSpyOptions = {}
) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const visibleSections = useRef<Set<string>>(new Set());
  const debounceTimeout = useRef<number | null>(null); // Changed from NodeJS.Timeout
  
  const {
    rootMargin = "-100px 0px",
    threshold = 0.3,
    debounceTime = 100
  } = options;

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    visibleSections.current.clear();
    
    // Create a single observer for all sections
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Process all entries
        entries.forEach(entry => {
          const id = entry.target.id;
          
          if (entry.isIntersecting) {
            visibleSections.current.add(id);
          } else {
            visibleSections.current.delete(id);
          }
        });
        
        // Debounce the state update
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
        
        debounceTimeout.current = window.setTimeout(() => {
          if (visibleSections.current.size > 0) {
            // Find the first visible section based on DOM order
            const sortedVisible = Array.from(visibleSections.current)
              .filter(id => sectionIds.includes(id))
              .sort((a, b) => sectionIds.indexOf(a) - sectionIds.indexOf(b));
              
            if (sortedVisible.length > 0) {
              setActiveSection(sortedVisible[0]);
            }
          }
        }, debounceTime);
      },
      { rootMargin, threshold }
    );
    
    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [sectionIds, rootMargin, threshold, debounceTime]);
  
  return { activeSection };
}

export default useScrollSpy;