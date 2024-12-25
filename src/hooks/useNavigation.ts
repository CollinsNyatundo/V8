import { useState, useEffect } from 'react';
import { scroller } from 'react-scroll';

export const useNavigation = (sectionId: string) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= 100 && rect.bottom >= 100;
        setIsActive(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionId]);

  const scrollTo = () => {
    scroller.scrollTo(sectionId, {
      duration: 500,
      smooth: true,
      offset: -70, // Adjust based on navbar height
    });
  };

  return { isActive, scrollTo };
};