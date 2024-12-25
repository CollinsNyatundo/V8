import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SeeMoreArticles = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex justify-center mt-12"
    >
      <Link
        to="/articles"
        className={`
          group relative inline-flex items-center justify-center
          px-8 py-3 overflow-hidden
          rounded-full bg-purple-600
          text-white font-medium
          transition-all duration-300
          hover:bg-purple-700
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
        `}
      >
        <span className="relative flex items-center gap-2">
          See More Articles
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            →
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
};

export default SeeMoreArticles;