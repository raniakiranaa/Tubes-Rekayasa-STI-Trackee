"use client"; 
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signIn = () => setIsAuthenticated(true);
  const signOut = () => setIsAuthenticated(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await supabase.auth.getUser();

        // Check if user is authenticated
        if (!data.data.user) {
          router.push('/login');
        } else {
          signIn();
        }
      } catch (error) {
        console.error('Error fetching user:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {loading ? <div></div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};