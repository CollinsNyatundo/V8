import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from './articles/ArticleCard';
import ArticleFilters from './articles/ArticleFilters';
import SeeMoreArticles from './articles/SeeMoreArticles';
import { useGalleryArticles } from '../hooks/useGalleryArticles';
import { LoadingSpinner } from './admin';

const Blog = () => {
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
        .slice(0, 3) // Show only first 3 articles on home page
    : [];

  if (error) {
    return (
      <section id="blog" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center text-red-400">
          Error loading articles. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
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
              className="grid md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filteredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </motion.div>

            {filteredArticles.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 mt-8"
              >
                No articles found for the selected category or search term.
              </motion.p>
            )}

            <SeeMoreArticles />
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;