import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { useProjects } from '../../../hooks/useProjects';

export const RecentProjects = () => {
  const { projects, isLoading } = useProjects();

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-white mb-6">Recent Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <ProjectCard.Skeleton key={index} />
          ))
        ) : (
          projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};