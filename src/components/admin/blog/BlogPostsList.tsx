import { Edit2, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePosts } from '../../../hooks/usePosts';
import { motion } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';
import Pagination from '../common/Pagination';
import { usePagination } from '../../../hooks/usePagination';

interface BlogPostsListProps {
  onEdit: (post: { id: string; title: string }) => void;
  onDelete: (post: { id: string; title: string }) => void;
}

export const BlogPostsList = ({ onEdit, onDelete }: BlogPostsListProps) => {
  const { posts, isLoading } = usePosts();
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedPosts,
  } = usePagination({
    items: posts || [],
    itemsPerPage: 9,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-700" />
            <div className="p-4">
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-4" />
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-700 rounded w-24" />
                <div className="h-8 bg-gray-700 rounded w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No posts found. Create your first post!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200"
          >
            {/* Existing card content */}
            <div className="aspect-video relative">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <Eye className="w-12 h-12 text-gray-600" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                {post.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  post.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Link 
                  to={`/admin/posts/${post.id}`}
                  className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors"
                  title="View post"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => onEdit(post)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors"
                  title="Edit post"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDelete(post)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-auto"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};