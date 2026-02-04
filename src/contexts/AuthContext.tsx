
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

interface Client {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  company: string | null;
}

interface AuthContextType {
  client: Client | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem('client_token');
    if (token) {
      verifySession(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifySession = async (token: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('client-auth', {
        body: { action: 'verify', token }
      });

      if (error || !data.success) {
        localStorage.removeItem('client_token');
        setClient(null);
      } else {
        setClient(data.client);
      }
    } catch (err) {
      localStorage.removeItem('client_token');
      setClient(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('client-auth', {
        body: { action: 'login', email, password }
      });

      if (error) {
        return { success: false, error: 'Connection error. Please try again.' };
      }

      if (!data.success) {
        return { success: false, error: data.error || 'Invalid credentials' };
      }

      localStorage.setItem('client_token', data.token);
      setClient(data.client);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (registerData: RegisterData) => {
    try {
      const { data, error } = await supabase.functions.invoke('client-auth', {
        body: { 
          action: 'register', 
          email: registerData.email,
          password: registerData.password,
          fullName: registerData.fullName,
          phone: registerData.phone,
          company: registerData.company
        }
      });

      if (error) {
        return { success: false, error: 'Connection error. Please try again.' };
      }

      if (!data.success) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      localStorage.setItem('client_token', data.token);
      setClient(data.client);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('client_token');
    if (token) {
      await supabase.functions.invoke('client-auth', {
        body: { action: 'logout', token }
      });
    }
    localStorage.removeItem('client_token');
    setClient(null);
  };

  return (
    <AuthContext.Provider value={{
      client,
      isLoading,
      isAuthenticated: !!client,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
