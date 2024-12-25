import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface ArticleFiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
}

const ArticleFilters = ({
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  categories,
}: ArticleFiltersProps) => {
  const location = useLocation();
  const isGalleryPage = location.pathname === '/articles';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {isGalleryPage ? 'All Articles' : 'Latest Articles'}
      </h2>
      <div className="w-20 h-1 bg-purple-600 mx-auto mb-8"></div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center mb-8">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleFilters;