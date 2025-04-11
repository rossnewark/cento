import React, { useState, useEffect, useRef, memo } from 'react';
import { Service } from '../../data/services';

interface ServiceCardProps {
  service: Service;
  index: number;
  totalCards: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, totalCards }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoFlipping, setIsAutoFlipping] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Staggered reveal on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + (index * 150)); // More staggered delay for better visual effect
    
    return () => clearTimeout(timer);
  }, [index]);
  
  // Handle automatic card flipping
  useEffect(() => {
    // Only proceed with auto-flipping if user hasn't interacted
    if (!userInteracted && isAutoFlipping) {
      // Calculate when this card should flip based on index
      // Each card gets 5 seconds, with 1 second offset between cards
      const autoFlipDelay = 5000 + (index * 1000);
      
      // Set timeout to flip this card
      const flipTimer = setTimeout(() => {
        setIsFlipped(true);
        
        // Set timeout to flip the card back
        const flipBackTimer = setTimeout(() => {
          setIsFlipped(false);
        }, 6000); // Show back side for 6 seconds for slower reading pace
        
        return () => clearTimeout(flipBackTimer);
      }, autoFlipDelay);
      
      return () => clearTimeout(flipTimer);
    }
  }, [index, userInteracted, isAutoFlipping]);
  
  // Reset auto-flipping after all cards have been shown
  useEffect(() => {
    if (isAutoFlipping) {
      // After all cards have had a chance to flip, reset the cycle
      // Total time = base time + time for all cards + buffer
      const resetCycleTime = 5000 + (totalCards * 5000);
      
      const resetTimer = setTimeout(() => {
        // Only reset if user still hasn't interacted
        if (!userInteracted) {
          setIsAutoFlipping(true);
        }
      }, resetCycleTime);
      
      return () => clearTimeout(resetTimer);
    }
  }, [isAutoFlipping, totalCards, userInteracted]);
  
  // Handle user interaction
  const handleMouseEnter = () => {
    setUserInteracted(true);
    setIsAutoFlipping(false);
    setIsFlipped(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  
  const handleMouseLeave = () => {
    setIsFlipped(false);
    
    // Reset auto-flipping after a delay if user leaves
    timeoutRef.current = window.setTimeout(() => {
      setUserInteracted(false);
      setIsAutoFlipping(true);
    }, 10000); // Resume auto-flip 10 seconds after user stops interacting
  };
  
  const handleClick = () => {
    setUserInteracted(true);
    setIsAutoFlipping(false);
    setIsFlipped(!isFlipped);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  
  return (
    <div 
      ref={cardRef}
      className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="relative h-64 cursor-pointer perspective-500">
        <div className="w-full h-full transition-all duration-1000 card-container">
          {/* Front side */}
          <div
            className={`absolute w-full h-full bg-white p-6 rounded-lg shadow-md transition-all duration-1000 ${
              isFlipped ? 'opacity-0 rotate-y-180 pointer-events-none' : 'opacity-100 rotate-y-0'
            }`}
          >
            <service.icon className="w-12 h-12 text-blue-900 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
          
          {/* Back side */}
          <div
            className={`absolute w-full h-full bg-blue-900 p-6 rounded-lg shadow-md text-white transition-all duration-1000 ${
              isFlipped ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180 pointer-events-none'
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
            <p>{service.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ServiceCard);