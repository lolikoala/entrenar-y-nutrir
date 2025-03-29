
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"
import { create, verify } from "https://deno.land/x/djwt@v2.9.1/mod.ts"

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
        .single()

      if (profileError || !profile) {
        return new Response(
          JSON.stringify({ error: 'Usuario no encontrado' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
        )
      }

      const passwordMatch = await bcrypt.compare(password, profile.password_hash)
      if (!passwordMatch) {
        return new Response(
          JSON.stringify({ error: 'Contraseña incorrecta' }),
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
      const passwordHash = await bcrypt.hash(password)
      
      const { data: newProfile, error: createError } = await supabase
        .from('perfiles')
        .insert([
          { 
            email,
            password_hash: passwordHash,
            rol: 'cliente', // default role
            activo: true
          }
        ])
        .select()
        .single()

      if (createError) {
        return new Response(
          JSON.stringify({ error: 'Error al crear el usuario' }),
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
