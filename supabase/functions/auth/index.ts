
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { create } from "https://deno.land/x/djwt@v2.9.1/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? 'https://nokelnztvnutfynfiegj.supabase.co'
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5va2Vsbnp0dm51dGZ5bmZpZWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyODI4MTEsImV4cCI6MjA1ODg1ODgxMX0.WyUkL4Ku89J4M3PKiGpC_wDW1BZAIziw4jH86h0YnW8'
const JWT_SECRET = Deno.env.get('JWT_SECRET') ?? ''

const supabase = createClient(supabaseUrl, supabaseAnonKey)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { username, password, email, action, nombre, apellido, rol, entrenador_id } = await req.json()

    if (action === 'login') {
      // Primero intentamos buscar al usuario por nombre de usuario (campo 'usuario')
      let { data: profile, error: profileError } = await supabase
        .from('perfiles')
        .select('*')
        .eq('usuario', username)
        .eq('password', password)
        .single()

      // Si no encontramos al usuario, puede ser que esté tratando de iniciar sesión con email
      if (profileError) {
        const { data: emailProfile, error: emailProfileError } = await supabase
          .from('perfiles')
          .select('*')
          .eq('email', username)
          .eq('password', password)
          .single()

        if (emailProfileError || !emailProfile) {
          return new Response(
            JSON.stringify({ error: 'Usuario o contraseña incorrectos' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
          )
        }

        profile = emailProfile
      }

      const token = await create(
        { alg: "HS256", typ: "JWT" },
        { 
          id: profile.id, 
          email: profile.email,
          usuario: profile.usuario,
          rol: profile.rol,
          exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        },
        JWT_SECRET
      )

      return new Response(
        JSON.stringify({ 
          token,
          user: {
            id: profile.id,
            email: profile.email,
            usuario: profile.usuario,
            rol: profile.rol,
            nombre: profile.nombre,
            apellido: profile.apellido,
            foto_url: profile.foto_url,
            entrenador_id: profile.entrenador_id
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'register') {
      // Comprobar si el usuario ya existe
      const { data: existingUser, error: checkError } = await supabase
        .from('perfiles')
        .select('*')
        .or(`usuario.eq.${username},email.eq.${email}`)
        .single()

      if (existingUser) {
        return new Response(
          JSON.stringify({ error: 'El usuario o email ya existen' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }

      // Valores por defecto para campos obligatorios
      let nuevoRol = rol || 'cliente';
      
      const { data: newProfile, error: createError } = await supabase
        .from('perfiles')
        .insert([
          { 
            email,
            usuario: username,
            password,
            rol: nuevoRol,
            nombre,
            apellido,
            entrenador_id,
            activo: true
          }
        ])
        .select()
        .single()

      if (createError) {
        console.error('Error al crear usuario:', createError);
        return new Response(
          JSON.stringify({ error: 'Error al crear el usuario: ' + createError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }

      return new Response(
        JSON.stringify({ 
          message: 'Usuario creado exitosamente',
          user: newProfile 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'verify') {
      // Implementar la verificación del token JWT
      // Esta parte quedará pendiente por ahora
      return new Response(
        JSON.stringify({ error: 'Verificación no implementada' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 501 }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Acción no válida' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )

  } catch (error) {
    console.error('Error en el servidor:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
