import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArticleCard, ArticleFilters } from '../components/articles';
import { useGalleryArticles } from '../hooks/useGalleryArticles';
import { LoadingSpinner } from '../components/admin';

const ArticlesGallery = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['All', 'Machine Learning', 'Data Analysis', 'Database'];
  
  const { data: articles, isLoading, error } = useGalleryArticles();

  const filteredArticles = articles
    ? articles
        .filter(article => filter === 'All' || article.category === filter)
        .filter(article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-20">
        <div className="container mx-auto px-4 text-center text-red-400">
          Error loading articles. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        <ArticleFilters
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {filteredArticles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={{
                    ...article,
                    icon: FileText // Provide default icon
                  }} 
                  index={index} 
                />
              ))}
            </motion.div>

            {filteredArticles.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-400">
                  No articles found for the selected category or search term.
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArticlesGallery;