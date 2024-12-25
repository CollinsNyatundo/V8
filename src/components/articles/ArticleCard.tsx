import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Article } from '../../types/article';

interface ArticleCardProps {
  article: Article;
  index: number;
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-800 rounded-xl overflow-hidden group hover:transform hover:scale-[1.02] transition-all duration-300"
    >
      <Link to={`/blog/${article.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-400">{article.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );
};

export default ArticleCard;