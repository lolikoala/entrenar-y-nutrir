
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { create } from "https://deno.land/x/djwt@v2.9.1/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
const JWT_SECRET = Deno.env.get('JWT_SECRET') ?? ''

const supabase = createClient(supabaseUrl, supabaseAnonKey)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, password, action } = await req.json()

    if (action === 'login') {
      const { data: profile, error: profileError } = await supabase
        .from('perfiles')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single()

      if (profileError || !profile) {
        return new Response(
          JSON.stringify({ error: 'Email o contraseña incorrectos' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
      }

      // Create JWT token
      const token = await create(
        { alg: "HS256", typ: "JWT" },
        { 
          id: profile.id, 
          email: profile.email,
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
            rol: profile.rol,
            nombre: profile.nombre,
            apellido: profile.apellido
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'register') {
      const { data: newProfile, error: createError } = await supabase
        .from('perfiles')
        .insert([
          { 
            email,
            password,
            rol: 'cliente', // rol por defecto
            activo: true
          }
        ])
        .select()
        .single()

      if (createError) {
        return new Response(
          JSON.stringify({ error: 'Error al crear el usuario. El email ya existe.' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }

      return new Response(
        JSON.stringify({ message: 'Usuario creado exitosamente' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Acción no válida' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
