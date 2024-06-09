"use client"; 
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signIn = () => setIsAuthenticated(true);
  const signOut = () => setIsAuthenticated(false);
  const router = useRouter();

useEffect(() => {
    if(!isAuthenticated) {
        router.push('/login');
    }

    setLoading(false);
  
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