import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';
import type { Database } from '../types/supabase';
import { generateSlug } from '../utils/helpers';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type InsertBlogPost = Database['public']['Tables']['blog_posts']['Insert'];
type UpdateBlogPost = Database['public']['Tables']['blog_posts']['Update'];

export const usePosts = () => {
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error(`Error fetching posts: ${error.message}`);
        throw error;
      }
      return data;
    },
  });

  const createPost = useMutation({
    mutationFn: async (newPost: Omit<InsertBlogPost, 'slug'>) => {
      const slug = generateSlug(newPost.title);
      const postWithSlug = { ...newPost, slug };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert(postWithSlug)
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          throw new Error('A post with this title already exists');
        }
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Error creating post: ${error.message}`);
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({ id, ...post }: UpdateBlogPost & { id: string }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(post)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          throw new Error('A post with this title already exists');
        }
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Error updating post: ${error.message}`);
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Error deleting post: ${error.message}`);
    },
  });

  return {
    posts,
    isLoading,
    createPost,
    updatePost,
    deletePost,
  };
};