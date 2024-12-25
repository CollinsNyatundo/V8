import { useState, useEffect } from 'react';
import { BlogPost } from '../types/blog';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPosts([
          {
            id: '1',
            title: 'Introduction to Machine Learning',
            content: 'Lorem ipsum...',
            date: '2024-03-15',
            status: 'published',
          },
          // Add more mock posts
        ]);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, isLoading };
};