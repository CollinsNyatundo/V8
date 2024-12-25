import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'es' | 'fr';
  notifications: {
    email: boolean;
    browser: boolean;
  };
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: 'en' | 'es' | 'fr') => void;
  toggleNotification: (type: 'email' | 'browser') => void;
  resetSettings: () => void;
}

const initialState = {
  theme: 'dark' as const,
  language: 'en' as const,
  notifications: {
    email: true,
    browser: true,
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleNotification: (type) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [type]: !state.notifications[type],
          },
        })),
      resetSettings: () => set(initialState),
    }),
    {
      name: 'settings-storage',
    }
  )
);