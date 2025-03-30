export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alimentos: {
        Row: {
          carbohidratos: number | null
          creado_en: string | null
          entrenador_id: string
          grasas: number | null
          id: string
          imagen_url: string | null
          kcal: number | null
          nombre: string
          proteinas: number | null
        }
        Insert: {
          carbohidratos?: number | null
          creado_en?: string | null
          entrenador_id: string
          grasas?: number | null
          id?: string
          imagen_url?: string | null
          kcal?: number | null
          nombre: string
          proteinas?: number | null
        }
        Update: {
          carbohidratos?: number | null
          creado_en?: string | null
          entrenador_id?: string
          grasas?: number | null
          id?: string
          imagen_url?: string | null
          kcal?: number | null
          nombre?: string
          proteinas?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "alimentos_entrenador_id_fkey"
            columns: ["entrenador_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      asignaciones_dieta: {
        Row: {
          cliente_id: string | null
          creado_en: string | null
          dieta_id: string | null
          fecha_fin: string | null
          fecha_inicio: string | null
          id: string
        }
        Insert: {
          cliente_id?: string | null
          creado_en?: string | null
          dieta_id?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
        }
        Update: {
          cliente_id?: string | null
          creado_en?: string | null
          dieta_id?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asignaciones_dieta_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asignaciones_dieta_dieta_id_fkey"
            columns: ["dieta_id"]
            isOneToOne: false
            referencedRelation: "dietas"
            referencedColumns: ["id"]
          },
        ]
      }
      asignaciones_rutina: {
        Row: {
          cliente_id: string | null
          creado_en: string | null
          fecha_fin: string | null
          fecha_inicio: string | null
          id: string
          rutina_id: string | null
        }
        Insert: {
          cliente_id?: string | null
          creado_en?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          rutina_id?: string | null
        }
        Update: {
          cliente_id?: string | null
          creado_en?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          rutina_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asignaciones_rutina_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asignaciones_rutina_rutina_id_fkey"
            columns: ["rutina_id"]
            isOneToOne: false
            referencedRelation: "rutinas"
            referencedColumns: ["id"]
          },
        ]
      }
      citas: {
        Row: {
          cliente_id: string | null
          creado_en: string | null
          entrenador_id: string | null
          fecha: string
          id: string
          motivo: string | null
          notas: string | null
        }
        Insert: {
          cliente_id?: string | null
          creado_en?: string | null
          entrenador_id?: string | null
          fecha: string
          id?: string
          motivo?: string | null
          notas?: string | null
        }
        Update: {
          cliente_id?: string | null
          creado_en?: string | null
          entrenador_id?: string | null
          fecha?: string
          id?: string
          motivo?: string | null
          notas?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "citas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "citas_entrenador_id_fkey"
            columns: ["entrenador_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracion_interfaz: {
        Row: {
          color_primario: string | null
          color_secundario: string | null
          entrenador_id: string
          fecha_actualizacion: string | null
          fecha_creacion: string | null
          id: string
          idioma: string | null
          imagen_portada_url: string | null
          logo_url: string | null
          mostrar_chat: boolean | null
          mostrar_citas: boolean | null
          mostrar_progreso: boolean | null
          nombre_app: string | null
          tema: string | null
        }
        Insert: {
          color_primario?: string | null
          color_secundario?: string | null
          entrenador_id: string
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: string
          idioma?: string | null
          imagen_portada_url?: string | null
          logo_url?: string | null
          mostrar_chat?: boolean | null
          mostrar_citas?: boolean | null
          mostrar_progreso?: boolean | null
          nombre_app?: string | null
          tema?: string | null
        }
        Update: {
          color_primario?: string | null
          color_secundario?: string | null
          entrenador_id?: string
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: string
          idioma?: string | null
          imagen_portada_url?: string | null
          logo_url?: string | null
          mostrar_chat?: boolean | null
          mostrar_citas?: boolean | null
          mostrar_progreso?: boolean | null
          nombre_app?: string | null
          tema?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configuracion_interfaz_entrenador_id_fkey"
            columns: ["entrenador_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dieta_alimentos: {
        Row: {
          alimento_id: string | null
          dieta_id: string | null
          gramos: number | null
          id: string
          observaciones: string | null
          orden_dia: number | null
          tipo_comida: string | null
        }
        Insert: {
          alimento_id?: string | null
          dieta_id?: string | null
          gramos?: number | null
          id?: string
          observaciones?: string | null
          orden_dia?: number | null
          tipo_comida?: string | null
        }
        Update: {
          alimento_id?: string | null
          dieta_id?: string | null
          gramos?: number | null
          id?: string
          observaciones?: string | null
          orden_dia?: number | null
          tipo_comida?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dieta_alimentos_alimento_id_fkey"
            columns: ["alimento_id"]
            isOneToOne: false
            referencedRelation: "alimentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dieta_alimentos_dieta_id_fkey"
            columns: ["dieta_id"]
            isOneToOne: false
            referencedRelation: "dietas"
            referencedColumns: ["id"]
          },
        ]
      }
      dietas: {
        Row: {
          creado_en: string | null
          descripcion: string | null
          entrenador_id: string
          id: string
          nombre: string
        }
        Insert: {
          creado_en?: string | null
          descripcion?: string | null
          entrenador_id: string
          id?: string
          nombre: string
        }
        Update: {
          creado_en?: string | null
          descripcion?: string | null
          entrenador_id?: string
          id?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "dietas_entrenador_id_fkey"
            columns: ["entrenador_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ejercicios: {
        Row: {
          creado_en: string | null
          descripcion: string | null
          entrenador_id: string
          grupo_muscular: string | null
          id: string
          imagen_url: string | null
          nombre: string
          video_url: string | null
        }
        Insert: {
          creado_en?: string | null
          descripcion?: string | null
          entrenador_id: string
          grupo_muscular?: string | null
          id?: string
          imagen_url?: string | null
          nombre: string
          video_url?: string | null
        }
        Update: {
          creado_en?: string | null
          descripcion?: string | null
          entrenador_id?: string
          grupo_muscular?: string | null
          id?: string
          imagen_url?: string | null
          nombre?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ejercicios_entrenador_id_fkey"
            columns: ["entrenador_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mensajes: {
        Row: {
          contenido: string
          creado_en: string | null
          emisor_id: string | null
          id: string
          leido: boolean | null
          receptor_id: string | null
        }
        Insert: {
          contenido: string
          creado_en?: string | null
          emisor_id?: string | null
          id?: string
          leido?: boolean | null
          receptor_id?: string | null
        }
        Update: {
          contenido?: string
          creado_en?: string | null
          emisor_id?: string | null
          id?: string
          leido?: boolean | null
          receptor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mensajes_emisor_id_fkey"
            columns: ["emisor_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensajes_receptor_id_fkey"
            columns: ["receptor_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notificaciones: {
        Row: {
          creado_en: string | null
          descripcion: string | null
          id: string
          leido: boolean | null
          titulo: string | null
          usuario_id: string | null
        }
        Insert: {
          creado_en?: string | null
          descripcion?: string | null
          id?: string
          leido?: boolean | null
          titulo?: string | null
          usuario_id?: string | null
        }
        Update: {
          creado_en?: string | null
          descripcion?: string | null
          id?: string
          leido?: boolean | null
          titulo?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notificaciones_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      perfiles: {
        Row: {
          activo: boolean | null
          apellido: string | null
          creado_en: string | null
          email: string | null
          entrenador_id: string | null
          foto_url: string | null
          id: string
          nombre: string | null
          password: string
          rol: string
          usuario: string
        }
        Insert: {
          activo?: boolean | null
          apellido?: string | null
          creado_en?: string | null
          email?: string | null
          entrenador_id?: string | null
          foto_url?: string | null
          id: string
          nombre?: string | null
          password: string
          rol: string
          usuario: string
        }
        Update: {
          activo?: boolean | null
          apellido?: string | null
          creado_en?: string | null
          email?: string | null
          entrenador_id?: string | null
          foto_url?: string | null
          id?: string
          nombre?: string | null
          password?: string
          rol?: string
          usuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "perfiles_entrenador_id_fkey"
            columns: ["entrenador_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      progreso: {
        Row: {
          brazos: number | null
          cintura: number | null
          cliente_id: string | null
          creado_en: string | null
          fecha: string
          grasa_corporal: number | null
          id: string
          pecho: number | null
          peso: number | null
          piernas: number | null
        }
        Insert: {
          brazos?: number | null
          cintura?: number | null
          cliente_id?: string | null
          creado_en?: string | null
          fecha: string
          grasa_corporal?: number | null
          id?: string
          pecho?: number | null
          peso?: number | null
          piernas?: number | null
        }
        Update: {
          brazos?: number | null
          cintura?: number | null
          cliente_id?: string | null
          creado_en?: string | null
          fecha?: string
          grasa_corporal?: number | null
          id?: string
          pecho?: number | null
          peso?: number | null
          piernas?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "progreso_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rutina_ejercicios: {
        Row: {
          descanso: string | null
          dia: string | null
          ejercicio_id: string | null
          id: string
          observaciones: string | null
          peso: number | null
          repeticiones: number | null
          rutina_id: string | null
          series: number | null
        }
        Insert: {
          descanso?: string | null
          dia?: string | null
          ejercicio_id?: string | null
          id?: string
          observaciones?: string | null
          peso?: number | null
          repeticiones?: number | null
          rutina_id?: string | null
          series?: number | null
        }
        Update: {
          descanso?: string | null
          dia?: string | null
          ejercicio_id?: string | null
          id?: string
          observaciones?: string | null
          peso?: number | null
          repeticiones?: number | null
          rutina_id?: string | null
          series?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rutina_ejercicios_ejercicio_id_fkey"
            columns: ["ejercicio_id"]
            isOneToOne: false
            referencedRelation: "ejercicios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rutina_ejercicios_rutina_id_fkey"
            columns: ["rutina_id"]
            isOneToOne: false
            referencedRelation: "rutinas"
            referencedColumns: ["id"]
          },
        ]
      }
      rutinas: {
        Row: {
          creado_en: string | null
          descripcion: string | null
          entrenador_id: string
          id: string
          nombre: string
        }
        Insert: {
          creado_en?: string | null
          descripcion?: string | null
          entrenador_id: string
          id?: string
          nombre: string
        }
        Update: {
          creado_en?: string | null
          descripcion?: string | null
          entrenador_id?: string
          id?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "rutinas_entrenador_id_fkey"
            columns: ["entrenador_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_entrenador_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
