
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

// Obtenemos las variables de entorno de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Creamos el cliente de Supabase con tipos
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Tipo de usuario autenticado
export type AuthUser = {
  id: string;
  email?: string;
};

// Tipo extendido para el perfil de usuario
export type UserProfile = {
  id: string;
  email?: string;
  rol: 'admin' | 'entrenador' | 'cliente';
  nombre: string;
  apellido: string;
  foto_url?: string;
  entrenador_id?: string;
  activo: boolean;
};

// Funciones de autenticación
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Función para obtener el perfil completo del usuario
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) {
    console.error('Error al obtener el perfil:', error);
    return null;
  }

  return data as UserProfile;
}
