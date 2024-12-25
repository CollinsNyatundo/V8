import React, { useState } from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { BlogPostsList } from '../../components/admin/blog/BlogPostsList';
import CreatePostModal from '../../components/admin/modals/CreatePostModal';
import EditPostModal from '../../components/admin/modals/EditPostModal';
import DeleteConfirmationModal from '../../components/admin/modals/DeleteConfirmationModal';
import { usePosts } from '../../hooks/usePosts';
import { useModal } from '../../hooks/useModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Database } from '../../types/supabase';
import { usePagination } from '../../hooks/usePagination';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const BlogPosts = () => {
  const { posts, deletePost } = usePosts();
  const createModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedPosts,
  } = usePagination({
    items: posts || [],
    itemsPerPage: 9,
  });

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    editModal.open();
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    try {
      await deletePost.mutateAsync(selectedPost.id);
      deleteModal.close();
      setSelectedPost(null);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Blog Posts</h1>
          <button
            onClick={createModal.open}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            New Post
          </button>
        </div>
        
        <BlogPostsList
          posts={paginatedPosts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onEdit={handleEdit}
          onDelete={(post) => {
            setSelectedPost(post);
            deleteModal.open();
          }}
        />
      </div>

      <CreatePostModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
      />

      <EditPostModal
        isOpen={editModal.isOpen}
        onClose={() => {
          editModal.close();
          setSelectedPost(null);
        }}
        post={selectedPost}
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDelete}
        itemType="post"
        itemTitle={selectedPost?.title || ''}
        isLoading={deletePost.isPending}
      />

      <ToastContainer position="top-right" theme="dark" />
    </AdminLayout>
  );
};

export default BlogPosts;