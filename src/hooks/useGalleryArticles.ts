import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export const useGalleryArticles = () => {
  return useQuery({
    queryKey: ['gallery-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as BlogPost[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};