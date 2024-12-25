import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Project } from '../../../types/project';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200">
      <div className="aspect-video relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2">
          {project.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span>{new Date(project.date).toLocaleDateString()}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            project.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {project.status}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-auto">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

ProjectCard.Skeleton = function ProjectCardSkeleton() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-video bg-gray-700" />
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2" />
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-700 rounded w-24" />
          <div className="h-4 bg-gray-700 rounded w-16" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-700 rounded-lg" />
          <div className="w-8 h-8 bg-gray-700 rounded-lg" />
          <div className="w-8 h-8 bg-gray-700 rounded-lg ml-auto" />
        </div>
      </div>
    </div>
  );
};