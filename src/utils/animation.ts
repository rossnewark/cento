// Animation variants for Framer Motion components
export const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  
  export const fadeInFromRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };
  
  export const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  // Transition presets
  export const fastTransition = {
    type: "tween",
    duration: 0.3,
  };
  
  export const normalTransition = {
    type: "tween",
    duration: 0.5,
  };
  
  export const slowTransition = {
    type: "tween",
    duration: 0.8,
  };
  
  // Reusable options for IntersectionObserver
  export const standardObserverOptions = {
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: "-100px 0px",
  };
  
  export const navObserverOptions = {
    threshold: 0.3,
    rootMargin: "-100px 0px",
  };
  
  // For card flip animation
  export const cardFlip = {
    front: {
      rotateY: 0,
    },
    back: {
      rotateY: 180,
    },
  };