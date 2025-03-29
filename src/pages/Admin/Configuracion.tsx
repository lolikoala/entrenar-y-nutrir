
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Palette, Globe, Layout } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export default function ConfiguracionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: configuracion, isLoading, error, refetch } = useQuery({
    queryKey: ['configuracion'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('configuracion_interfaz')
        .select('*')
        .limit(1);
      
      if (error) throw error;
      return data?.[0] || {
        nombre_app: 'Entrenar&Nutrir',
        tema: 'light',
        color_primario: '#3B82F6',
        color_secundario: '#10B981',
        idioma: 'es',
        mostrar_chat: true,
        mostrar_citas: true,
        mostrar_progreso: true
      };
    }
  });

  const handleSaveConfig = async () => {
    if (!configuracion) return;
    
    setIsSubmitting(true);
    
    try {
      // Verificar si ya existe configuración
      const { data: existingConfig } = await supabase
        .from('configuracion_interfaz')
        .select('id')
        .limit(1);
      
      let result;
      
      if (existingConfig && existingConfig.length > 0) {
        // Actualizar configuración existente
        result = await supabase
          .from('configuracion_interfaz')
          .update(configuracion)
          .eq('id', existingConfig[0].id);
      } else {
        // Insertar nueva configuración
        result = await supabase
          .from('configuracion_interfaz')
          .insert([configuracion]);
      }
      
      if (result.error) throw result.error;
      
      toast.success("Configuración guardada", {
        description: "Los cambios han sido aplicados correctamente."
      });
      
      refetch();
    } catch (error) {
      console.error("Error al guardar la configuración:", error);
      toast.error("Error al guardar", {
        description: "No se pudo guardar la configuración. Inténtalo de nuevo."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Configuración</h1>
            <p className="text-muted-foreground mt-1">
              Personaliza la configuración de la plataforma
            </p>
          </div>
        </div>
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-muted-foreground mt-1">
            Personaliza la configuración de la plataforma
          </p>
        </div>
        <Button onClick={handleSaveConfig} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="apariencia">
            <Palette className="mr-2 h-4 w-4" />
            Apariencia
          </TabsTrigger>
          <TabsTrigger value="idioma">
            <Globe className="mr-2 h-4 w-4" />
            Idioma
          </TabsTrigger>
          <TabsTrigger value="modulos">
            <Layout className="mr-2 h-4 w-4" />
            Módulos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configuración general</CardTitle>
              <CardDescription>
                Configura los ajustes generales de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nombre_app">Nombre de la aplicación</Label>
                <Input 
                  id="nombre_app" 
                  value={configuracion?.nombre_app || ''} 
                  onChange={(e) => {
                    if (configuracion) {
                      configuracion.nombre_app = e.target.value;
                    }
                  }} 
                  placeholder="Entrenar&Nutrir" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apariencia">
          <Card>
            <CardHeader>
              <CardTitle>Apariencia</CardTitle>
              <CardDescription>
                Personaliza los colores y el tema de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tema">Tema</Label>
                <select 
                  id="tema" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={configuracion?.tema || 'light'}
                  onChange={(e) => {
                    if (configuracion) {
                      configuracion.tema = e.target.value;
                    }
                  }}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                  <option value="system">Sistema</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color_primario">Color primario</Label>
                <div className="flex gap-2">
                  <Input 
                    id="color_primario" 
                    type="color"
                    className="w-16 h-10 p-1"
                    value={configuracion?.color_primario || '#3B82F6'} 
                    onChange={(e) => {
                      if (configuracion) {
                        configuracion.color_primario = e.target.value;
                      }
                    }} 
                  />
                  <Input 
                    value={configuracion?.color_primario || '#3B82F6'} 
                    onChange={(e) => {
                      if (configuracion) {
                        configuracion.color_primario = e.target.value;
                      }
                    }} 
                    placeholder="#3B82F6" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color_secundario">Color secundario</Label>
                <div className="flex gap-2">
                  <Input 
                    id="color_secundario" 
                    type="color"
                    className="w-16 h-10 p-1"
                    value={configuracion?.color_secundario || '#10B981'} 
                    onChange={(e) => {
                      if (configuracion) {
                        configuracion.color_secundario = e.target.value;
                      }
                    }} 
                  />
                  <Input 
                    value={configuracion?.color_secundario || '#10B981'} 
                    onChange={(e) => {
                      if (configuracion) {
                        configuracion.color_secundario = e.target.value;
                      }
                    }} 
                    placeholder="#10B981"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="idioma">
          <Card>
            <CardHeader>
              <CardTitle>Idioma</CardTitle>
              <CardDescription>
                Configura el idioma predeterminado de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="idioma">Idioma predeterminado</Label>
                <select 
                  id="idioma" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={configuracion?.idioma || 'es'}
                  onChange={(e) => {
                    if (configuracion) {
                      configuracion.idioma = e.target.value;
                    }
                  }}
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modulos">
          <Card>
            <CardHeader>
              <CardTitle>Módulos</CardTitle>
              <CardDescription>
                Activa o desactiva módulos específicos de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mostrar_chat">Módulo de chat</Label>
                  <p className="text-sm text-muted-foreground">
                    Activa o desactiva el módulo de chat entre entrenador y cliente
                  </p>
                </div>
                <Switch 
                  id="mostrar_chat" 
                  checked={configuracion?.mostrar_chat || false}
                  onCheckedChange={(checked) => {
                    if (configuracion) {
                      configuracion.mostrar_chat = checked;
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label htmlFor="mostrar_citas">Módulo de citas</Label>
                  <p className="text-sm text-muted-foreground">
                    Activa o desactiva el módulo de gestión de citas
                  </p>
                </div>
                <Switch 
                  id="mostrar_citas" 
                  checked={configuracion?.mostrar_citas || false}
                  onCheckedChange={(checked) => {
                    if (configuracion) {
                      configuracion.mostrar_citas = checked;
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label htmlFor="mostrar_progreso">Módulo de progreso</Label>
                  <p className="text-sm text-muted-foreground">
                    Activa o desactiva el módulo de seguimiento de progreso
                  </p>
                </div>
                <Switch 
                  id="mostrar_progreso" 
                  checked={configuracion?.mostrar_progreso || false}
                  onCheckedChange={(checked) => {
                    if (configuracion) {
                      configuracion.mostrar_progreso = checked;
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
