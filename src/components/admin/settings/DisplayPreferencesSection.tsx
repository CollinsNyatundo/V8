import React, { useState } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useSettingsStore } from '../../../hooks/useSettingsStore';
import ToggleButton from './ToggleButton';

const DisplayPreferencesSection = () => {
  const {
    theme,
    language,
    notifications,
    setTheme,
    setLanguage,
    toggleNotification,
  } = useSettingsStore();

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setHasChanges(true);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'es' | 'fr') => {
    setLanguage(newLanguage);
    setHasChanges(true);
  };

  const handleNotificationToggle = (type: 'email' | 'browser') => {
    toggleNotification(type);
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success('Settings saved successfully');
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg p-6">
      <h2 className="text-lg font-medium text-white mb-6">Display Preferences</h2>
      
      <div className="space-y-8">
        {/* Theme Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">Theme</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'light', label: 'Light', icon: Sun },
              { value: 'dark', label: 'Dark', icon: Moon },
              { value: 'system', label: 'System', icon: Globe },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleThemeChange(value as 'light' | 'dark' | 'system')}
                className={`
                  flex items-center justify-center gap-2 p-3 rounded-lg
                  transition-all duration-200
                  ${theme === value
                    ? 'bg-purple-500/20 text-purple-400 ring-2 ring-purple-500/50'
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">Language</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Español' },
              { value: 'fr', label: 'Français' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleLanguageChange(value as 'en' | 'es' | 'fr')}
                className={`
                  p-3 rounded-lg transition-all duration-200
                  ${language === value
                    ? 'bg-purple-500/20 text-purple-400 ring-2 ring-purple-500/50'
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Toggles */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">Notifications</label>
          <div className="space-y-4">
            <ToggleButton
              label="Email Notifications"
              description="Receive updates and notifications via email"
              isEnabled={notifications.email}
              onToggle={() => handleNotificationToggle('email')}
            />
            <ToggleButton
              label="Browser Notifications"
              description="Get real-time notifications in your browser"
              isEnabled={notifications.browser}
              onToggle={() => handleNotificationToggle('browser')}
            />
          </div>
        </div>

        {/* Save Button */}
        <motion.div
          className="flex justify-end"
          animate={{ opacity: hasChanges ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`
              px-4 py-2 rounded-lg
              transition-all duration-200
              ${hasChanges
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-700 text-gray-400'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DisplayPreferencesSection;