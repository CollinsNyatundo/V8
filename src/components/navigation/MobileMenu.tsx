import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NavLinks from './NavLinks';
import { blurEffects } from '../../utils/styles';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isHomePage?: boolean;
}

const MobileMenu = ({ isOpen, onClose, isHomePage = true }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={`
            md:hidden fixed inset-0 z-50 
            bg-gradient-to-b from-gray-900/95 to-gray-800/95
            ${blurEffects.strong}
          `}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.1 }}
            className="container mx-auto px-4 py-6"
          >
            <div className="flex justify-end mb-6">
              <button
                onClick={onClose}
                className="p-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <NavLinks 
                onLinkClick={onClose}
                className="flex flex-col space-y-2 w-full"
                itemClassName="text-center py-3 text-lg"
                isHomePage={isHomePage}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;