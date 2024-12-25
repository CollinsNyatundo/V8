import { useState, useEffect } from 'react';
import { Message } from '../types/message';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages([
          {
            id: '1',
            from: 'John Doe',
            email: 'john@example.com',
            subject: 'Project Inquiry',
            message: 'Hello, I would like to discuss...',
            date: '2024-03-15',
            isRead: false,
            isStarred: false,
          },
          // Add more mock messages
        ]);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return { messages, isLoading };
};