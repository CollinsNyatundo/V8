import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';
import type { Database } from '../types/supabase';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export const usePost = (id: string) => {
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast.error(`Error fetching post: ${error.message}`);
        throw error;
      }
      return data as BlogPost;
    },
    enabled: !!id,
  });

  return { post, isLoading };
};