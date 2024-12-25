import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './projects/ProjectCard';
import ProjectFilters from './projects/ProjectFilters';
import SeeMoreButton from './projects/SeeMoreButton';
import { useGalleryProjects } from '../hooks/useGalleryProjects';
import { LoadingSpinner } from './admin';

const Projects = () => {
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
        .slice(0, 6) // Show only first 6 projects on home page
    : [];

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center text-red-400">
          Error loading projects. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
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
          <>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 mt-8"
              >
                No projects found for the selected category or search term.
              </motion.p>
            )}

            <SeeMoreButton />
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;