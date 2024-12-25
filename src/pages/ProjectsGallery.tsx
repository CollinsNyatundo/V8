import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ScrollLink from '../components/navigation/ScrollLink';
import ProjectFilters from '../components/projects/ProjectFilters';
import { useGalleryProjects } from '../hooks/useGalleryProjects';
import { LoadingSpinner } from '../components/admin';
import { ProjectGrid } from '../components/projects/ProjectGrid';

const ProjectsGallery = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['All', 'Data Analysis', 'Data Visualization', 'Machine Learning'];
  
  const { data: projects, isLoading, error } = useGalleryProjects();

  const filteredProjects = projects
    ? projects
        .filter(project => filter === 'All' || project.category === filter)
        .filter(project =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    : [];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-20">
        <div className="container mx-auto px-4 text-center text-red-400">
          Error loading projects. Please try again later.
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
          <ScrollLink
            to="/#projects"
            sectionId="projects"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Featured Projects
          </ScrollLink>
        </motion.div>

        <ProjectFilters
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
          <ProjectGrid projects={filteredProjects} />
        )}
      </div>
    </div>
  );
};

export default ProjectsGallery;