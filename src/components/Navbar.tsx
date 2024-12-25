import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';
import NavLinks from './navigation/NavLinks';
import MobileMenu from './navigation/MobileMenu';
import { blurEffects, gradients } from '../utils/styles';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LogoComponent = isHomePage ? ScrollLink : RouterLink;
  const logoProps = isHomePage ? { to: 'home', smooth: true, duration: 500 } : { to: '/' };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className={`
          flex items-center justify-between w-full max-w-6xl mx-4 px-6 py-2 
          rounded-full transition-all duration-300
          ${isScrolled ? 'bg-gradient-to-r ' + gradients.nav.background : 'bg-gray-900/40'} 
          ${blurEffects.medium}
          border border-transparent
          ${isScrolled ? 'border-gradient-to-r ' + gradients.nav.border : ''}
          shadow-lg shadow-purple-500/5
        `}
      >
        <LogoComponent 
          {...logoProps}
          className="cursor-pointer flex-shrink-0"
        >
          <Logo />
        </LogoComponent>

        <div className="hidden md:block">
          <NavLinks isHomePage={isHomePage} />
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-full transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} isHomePage={isHomePage} />
    </motion.nav>
  );
};

export default Navbar;