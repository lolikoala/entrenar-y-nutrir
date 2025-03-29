
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, User, MoreHorizontal, Mail, Phone, Trash2, Edit, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export default function EntrenadoresPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: entrenadores, isLoading, error, refetch } = useQuery({
    queryKey: ['entrenadores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('perfiles')
        .select('*')
        .eq('rol', 'entrenador');
      
      if (error) throw error;
      return data || [];
    }
  });

  if (error) {
    toast.error("Error al cargar entrenadores", {
      description: "Ha ocurrido un error al cargar la lista de entrenadores."
    });
  }

  // Filtrar entrenadores según búsqueda
  const entrenadoresFiltrados = entrenadores ? entrenadores.filter(entrenador => 
    entrenador.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entrenador.apellido?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Entrenadores activos e inactivos
  const entrenadoresActivos = entrenadoresFiltrados.filter(entrenador => entrenador.activo);
  const entrenadoresInactivos = entrenadoresFiltrados.filter(entrenador => !entrenador.activo);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Entrenadores</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona los entrenadores de la plataforma
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> 
          Nuevo Entrenador
        </Button>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="sm:w-auto w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="activos">
        <TabsList className="mb-4">
          <TabsTrigger value="activos">
            Activos ({entrenadoresActivos.length})
          </TabsTrigger>
          <TabsTrigger value="inactivos">
            Inactivos ({entrenadoresInactivos.length})
          </TabsTrigger>
          <TabsTrigger value="todos">
            Todos ({entrenadoresFiltrados.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activos" className="mt-0">
          <EntrenadoresList entrenadores={entrenadoresActivos} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="inactivos" className="mt-0">
          <EntrenadoresList entrenadores={entrenadoresInactivos} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="todos" className="mt-0">
          <EntrenadoresList entrenadores={entrenadoresFiltrados} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EntrenadoresList({ entrenadores, isLoading }: { entrenadores: any[], isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        <h3 className="mt-4 text-lg font-medium">Cargando entrenadores...</h3>
      </div>
    );
  }

  if (entrenadores.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <User className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-medium">No hay entrenadores</h3>
        <p className="text-muted-foreground mt-2">
          No se encontraron entrenadores con los criterios de búsqueda actuales.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg divide-y">
      {entrenadores.map(entrenador => (
        <div key={entrenador.id} className="p-4 hover:bg-muted/50 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                {entrenador.nombre?.charAt(0) || ''}{entrenador.apellido?.charAt(0) || ''}
              </div>
              <div>
                <div className="font-medium flex items-center">
                  {entrenador.nombre || ''} {entrenador.apellido || ''}
                  {!entrenador.activo && (
                    <Badge variant="outline" className="ml-2 text-muted-foreground">
                      Inactivo
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  {entrenador.email || 'No disponible'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Ver perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Editar</span>
                  </DropdownMenuItem>
                  {entrenador.activo ? (
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Desactivar</span>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Activar</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
