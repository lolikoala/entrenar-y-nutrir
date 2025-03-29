
import { supabase as supabaseClient } from '@/integrations/supabase/client';
import type { Database } from '@/types/database.types';

// Exportamos el cliente de Supabase ya configurado
export const supabase = supabaseClient;

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
