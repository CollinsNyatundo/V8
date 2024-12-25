import { useState, useEffect } from 'react';
import { Settings } from '../types/settings';

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    siteTitle: 'CN Analytics',
    description: 'Data Science & ML Portfolio',
    socialLinks: {
      github: 'https://github.com/CollinsNyatundo',
      linkedin: 'https://linkedin.com/in/collinsnyagaka001',
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In a real app, load settings from an API
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Settings) => {
    setSettings(newSettings);
    // In a real app, save settings to an API
  };

  return { settings, updateSettings, isLoading };
};