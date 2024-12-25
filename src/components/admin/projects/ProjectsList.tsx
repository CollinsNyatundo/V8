import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { useProjects } from '../../../hooks/useProjects';
import { motion } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';
import Pagination from '../common/Pagination';
import { usePagination } from '../../../hooks/usePagination';

interface ProjectsListProps {
  onEdit: (project: { id: string; title: string }) => void;
  onDelete: (project: { id: string; title: string }) => void;
}

export const ProjectsList = ({ onEdit, onDelete }: ProjectsListProps) => {
  const { projects, isLoading } = useProjects();
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedProjects,
  } = usePagination({
    items: projects || [],
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

  if (!projects?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No projects found. Create your first project!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200"
          >
            {/* Existing card content */}
            <div className="aspect-video relative">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
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
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => onEdit(project)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors"
                  title="Edit project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDelete(project)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-auto"
                  title="Delete project"
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