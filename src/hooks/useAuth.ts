import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types/auth';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const session = supabase.auth.getSession();
    return session ? { email: session.data?.session?.user?.email || '', isAdmin: true } : null;
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({ email: session.user.email || '', isAdmin: true });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user?.email !== 'cnyagakan@gmail.com') {
        await supabase.auth.signOut();
        toast.error('Unauthorized access');
        return false;
      }

      setUser({ email: data.user.email, isAdmin: true });
      toast.success('Successfully logged in');
      return true;
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('An unexpected error occurred');
      return false;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      toast.success('Successfully logged out');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  }, []);

  return { user, signIn, signOut };
};