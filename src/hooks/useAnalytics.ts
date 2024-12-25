import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';

interface Analytics {
  measurementId: string;
}

export const useAnalytics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analytics, setAnalytics] = useState<Analytics>({
    measurementId: 'G-S3JVLS8HDL',
  });

  const updateAnalytics = async (data: Analytics) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('settings')
        .upsert({ 
          key: 'analytics',
          value: data,
        });

      if (error) throw error;

      setAnalytics(data);
      toast.success('Analytics settings updated successfully');
      
      // Update gtag configuration
      window.gtag('config', data.measurementId);
      
    } catch (error) {
      console.error('Error updating analytics:', error);
      toast.error('Failed to update analytics settings');
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      setIsLoading(true);
      
      // Send test event
      window.gtag('event', 'test_connection', {
        event_category: 'admin',
        event_label: 'analytics_test',
      });

      toast.success('Analytics connection test successful');
    } catch (error) {
      console.error('Error testing analytics:', error);
      toast.error('Analytics connection test failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analytics,
    updateAnalytics,
    testConnection,
    isLoading,
  };
};