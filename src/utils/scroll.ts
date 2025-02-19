import { scroller } from 'react-scroll';

export const scrollToSection = (sectionId: string) => {
  scroller.scrollTo(sectionId, {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart',
    offset: -70, // Adjust for navbar height
  });
};