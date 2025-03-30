
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

type Profile = {
  id: string;
  email: string;
  rol: 'admin' | 'entrenador' | 'cliente';
  nombre?: string;
  apellido?: string;
  foto_url?: string;
};

type AuthContextType = {
  profile: Profile | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ action: 'verify', token })
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data.user);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setProfile(null);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        localStorage.removeItem(TOKEN_KEY);
        setProfile(null);
      }
    }
    setIsLoading(false);
  };

  const signIn = async (username: string, password: string) => {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL) {
        throw new Error("VITE_SUPABASE_URL no está configurado");
      }
      
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      const response = await fetch(`${supabaseUrl}/functions/v1/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ action: 'login', username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al iniciar sesión');
      }

      const data = await response.json();

      localStorage.setItem(TOKEN_KEY, data.token);
      setProfile(data.user);
      
      toast({
        title: "Sesión iniciada",
        description: `Bienvenido/a, ${data.user.nombre || 'Usuario'}`,
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Usuario o contraseña incorrectos",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      setProfile(null);
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast({
        title: "Error al cerrar sesión",
        description: "Ocurrió un error inesperado",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
