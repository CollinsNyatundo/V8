import React, { useState } from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { ProjectsList } from '../../components/admin/projects/ProjectsList';
import CreateProjectModal from '../../components/admin/modals/CreateProjectModal';
import EditProjectModal from '../../components/admin/modals/EditProjectModal';
import DeleteConfirmationModal from '../../components/admin/modals/DeleteConfirmationModal';
import { useProjects } from '../../hooks/useProjects';
import { useModal } from '../../hooks/useModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Database } from '../../types/supabase';
import { usePagination } from '../../hooks/usePagination';

type Project = Database['public']['Tables']['projects']['Row'];

const AdminProjects = () => {
  const { projects, deleteProject } = useProjects();
  const createModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedProjects,
  } = usePagination({
    items: projects || [],
    itemsPerPage: 9,
  });

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    editModal.open();
  };

  const handleDelete = async () => {
    if (!selectedProject) return;
    try {
      await deleteProject.mutateAsync(selectedProject.id);
      deleteModal.close();
      setSelectedProject(null);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Projects</h1>
          <button
            onClick={createModal.open}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            New Project
          </button>
        </div>
        
        <ProjectsList
          projects={paginatedProjects}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onEdit={handleEdit}
          onDelete={(project) => {
            setSelectedProject(project);
            deleteModal.open();
          }}
        />
      </div>

      <CreateProjectModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
      />

      <EditProjectModal
        isOpen={editModal.isOpen}
        onClose={() => {
          editModal.close();
          setSelectedProject(null);
        }}
        project={selectedProject}
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDelete}
        itemType="project"
        itemTitle={selectedProject?.title || ''}
        isLoading={deleteProject.isPending}
      />

      <ToastContainer position="top-right" theme="dark" />
    </AdminLayout>
  );
};

export default AdminProjects;