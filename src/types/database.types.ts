
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      perfiles: {
        Row: {
          id: string
          rol: 'admin' | 'entrenador' | 'cliente'
          nombre: string
          apellido: string
          foto_url: string | null
          entrenador_id: string | null
          activo: boolean
          creado_en: string
        }
        Insert: {
          id: string
          rol?: 'admin' | 'entrenador' | 'cliente'
          nombre: string
          apellido: string
          foto_url?: string | null
          entrenador_id?: string | null
          activo?: boolean
          creado_en?: string
        }
        Update: {
          id?: string
          rol?: 'admin' | 'entrenador' | 'cliente'
          nombre?: string
          apellido?: string
          foto_url?: string | null
          entrenador_id?: string | null
          activo?: boolean
          creado_en?: string
        }
      }
      configuracion_interfaz: {
        Row: {
          id: string
          nombre_app: string
          logo_url: string | null
          color_primario: string | null
          color_secundario: string | null
          imagen_portada_url: string | null
          tema: string | null
          mostrar_chat: boolean
          mostrar_citas: boolean
          mostrar_progreso: boolean
          idioma: string
          entrenador_id: string
        }
        Insert: {
          id?: string
          nombre_app: string
          logo_url?: string | null
          color_primario?: string | null
          color_secundario?: string | null
          imagen_portada_url?: string | null
          tema?: string | null
          mostrar_chat?: boolean
          mostrar_citas?: boolean
          mostrar_progreso?: boolean
          idioma?: string
          entrenador_id: string
        }
        Update: {
          id?: string
          nombre_app?: string
          logo_url?: string | null
          color_primario?: string | null
          color_secundario?: string | null
          imagen_portada_url?: string | null
          tema?: string | null
          mostrar_chat?: boolean
          mostrar_citas?: boolean
          mostrar_progreso?: boolean
          idioma?: string
          entrenador_id?: string
        }
      }
      ejercicios: {
        Row: {
          id: string
          nombre: string
          descripcion: string | null
          grupo_muscular: string | null
          imagen_url: string | null
          video_url: string | null
          entrenador_id: string
        }
        Insert: {
          id?: string
          nombre: string
          descripcion?: string | null
          grupo_muscular?: string | null
          imagen_url?: string | null
          video_url?: string | null
          entrenador_id: string
        }
        Update: {
          id?: string
          nombre?: string
          descripcion?: string | null
          grupo_muscular?: string | null
          imagen_url?: string | null
          video_url?: string | null
          entrenador_id?: string
        }
      }
      alimentos: {
        Row: {
          id: string
          nombre: string
          imagen_url: string | null
          kcal: number | null
          proteinas: number | null
          carbohidratos: number | null
          grasas: number | null
          entrenador_id: string
        }
        Insert: {
          id?: string
          nombre: string
          imagen_url?: string | null
          kcal?: number | null
          proteinas?: number | null
          carbohidratos?: number | null
          grasas?: number | null
          entrenador_id: string
        }
        Update: {
          id?: string
          nombre?: string
          imagen_url?: string | null
          kcal?: number | null
          proteinas?: number | null
          carbohidratos?: number | null
          grasas?: number | null
          entrenador_id?: string
        }
      }
      rutinas: {
        Row: {
          id: string
          nombre: string
          descripcion: string | null
          entrenador_id: string
        }
        Insert: {
          id?: string
          nombre: string
          descripcion?: string | null
          entrenador_id: string
        }
        Update: {
          id?: string
          nombre?: string
          descripcion?: string | null
          entrenador_id?: string
        }
      }
      rutina_ejercicios: {
        Row: {
          id: string
          ejercicio_id: string
          rutina_id: string
          dia: number
          series: number | null
          repeticiones: number | null
          peso: number | null
          descanso: number | null
          observaciones: string | null
        }
        Insert: {
          id?: string
          ejercicio_id: string
          rutina_id: string
          dia: number
          series?: number | null
          repeticiones?: number | null
          peso?: number | null
          descanso?: number | null
          observaciones?: string | null
        }
        Update: {
          id?: string
          ejercicio_id?: string
          rutina_id?: string
          dia?: number
          series?: number | null
          repeticiones?: number | null
          peso?: number | null
          descanso?: number | null
          observaciones?: string | null
        }
      }
      dietas: {
        Row: {
          id: string
          nombre: string
          descripcion: string | null
          entrenador_id: string
        }
        Insert: {
          id?: string
          nombre: string
          descripcion?: string | null
          entrenador_id: string
        }
        Update: {
          id?: string
          nombre?: string
          descripcion?: string | null
          entrenador_id?: string
        }
      }
      dieta_alimentos: {
        Row: {
          id: string
          dieta_id: string
          alimento_id: string
          gramos: number | null
          tipo_comida: string | null
          orden_dia: number | null
          observaciones: string | null
        }
        Insert: {
          id?: string
          dieta_id: string
          alimento_id: string
          gramos?: number | null
          tipo_comida?: string | null
          orden_dia?: number | null
          observaciones?: string | null
        }
        Update: {
          id?: string
          dieta_id?: string
          alimento_id?: string
          gramos?: number | null
          tipo_comida?: string | null
          orden_dia?: number | null
          observaciones?: string | null
        }
      }
      asignaciones_rutina: {
        Row: {
          id: string
          cliente_id: string
          rutina_id: string
          fecha_inicio: string
          fecha_fin: string | null
        }
        Insert: {
          id?: string
          cliente_id: string
          rutina_id: string
          fecha_inicio: string
          fecha_fin?: string | null
        }
        Update: {
          id?: string
          cliente_id?: string
          rutina_id?: string
          fecha_inicio?: string
          fecha_fin?: string | null
        }
      }
      asignaciones_dieta: {
        Row: {
          id: string
          cliente_id: string
          dieta_id: string
          fecha_inicio: string
          fecha_fin: string | null
        }
        Insert: {
          id?: string
          cliente_id: string
          dieta_id: string
          fecha_inicio: string
          fecha_fin?: string | null
        }
        Update: {
          id?: string
          cliente_id?: string
          dieta_id?: string
          fecha_inicio?: string
          fecha_fin?: string | null
        }
      }
      mensajes: {
        Row: {
          id: string
          emisor_id: string
          receptor_id: string
          contenido: string
          leido: boolean
          creado_en: string
        }
        Insert: {
          id?: string
          emisor_id: string
          receptor_id: string
          contenido: string
          leido?: boolean
          creado_en?: string
        }
        Update: {
          id?: string
          emisor_id?: string
          receptor_id?: string
          contenido?: string
          leido?: boolean
          creado_en?: string
        }
      }
      citas: {
        Row: {
          id: string
          entrenador_id: string
          cliente_id: string
          fecha: string
          motivo: string | null
          notas: string | null
        }
        Insert: {
          id?: string
          entrenador_id: string
          cliente_id: string
          fecha: string
          motivo?: string | null
          notas?: string | null
        }
        Update: {
          id?: string
          entrenador_id?: string
          cliente_id?: string
          fecha?: string
          motivo?: string | null
          notas?: string | null
        }
      }
      progreso: {
        Row: {
          id: string
          cliente_id: string
          peso: number | null
          grasa_corporal: number | null
          cintura: number | null
          pecho: number | null
          piernas: number | null
          brazos: number | null
          fecha: string
        }
        Insert: {
          id?: string
          cliente_id: string
          peso?: number | null
          grasa_corporal?: number | null
          cintura?: number | null
          pecho?: number | null
          piernas?: number | null
          brazos?: number | null
          fecha: string
        }
        Update: {
          id?: string
          cliente_id?: string
          peso?: number | null
          grasa_corporal?: number | null
          cintura?: number | null
          pecho?: number | null
          piernas?: number | null
          brazos?: number | null
          fecha?: string
        }
      }
      notificaciones: {
        Row: {
          id: string
          usuario_id: string
          titulo: string
          descripcion: string | null
          leido: boolean
          creado_en: string
        }
        Insert: {
          id?: string
          usuario_id: string
          titulo: string
          descripcion?: string | null
          leido?: boolean
          creado_en?: string
        }
        Update: {
          id?: string
          usuario_id?: string
          titulo?: string
          descripcion?: string | null
          leido?: boolean
          creado_en?: string
        }
      }
    }
  }
}
