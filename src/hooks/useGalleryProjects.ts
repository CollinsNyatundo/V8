import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Project = Database['public']['Tables']['projects']['Row'];

export const useGalleryProjects = () => {
  return useQuery({
    queryKey: ['gallery-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as Project[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};