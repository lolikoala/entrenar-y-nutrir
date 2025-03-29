
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, User, MoreHorizontal, Mail, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Clientes de prueba (este sería un fetch a Supabase en la app real)
  const clientesFicticios = [
    {
      id: '1',
      nombre: 'Ana',
      apellido: 'García',
      email: 'ana.garcia@ejemplo.com',
      telefono: '612345678',
      activo: true,
      fechaInicio: '2023-08-15',
      rutina: 'Pérdida de peso',
      dieta: 'Baja en carbohidratos',
    },
    {
      id: '2',
      nombre: 'Carlos',
      apellido: 'Martínez',
      email: 'carlos.martinez@ejemplo.com',
      telefono: '623456789',
      activo: true,
      fechaInicio: '2023-09-05',
      rutina: 'Hipertrofia',
      dieta: 'Alta en proteínas',
    },
    {
      id: '3',
      nombre: 'María',
      apellido: 'López',
      email: 'maria.lopez@ejemplo.com',
      telefono: '634567890',
      activo: false,
      fechaInicio: '2023-07-10',
      rutina: 'Fuerza',
      dieta: 'Equilibrada',
    }
  ];

  // Filtrar clientes según búsqueda
  const clientesFiltrados = clientesFicticios.filter(cliente => 
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Clientes activos e inactivos
  const clientesActivos = clientesFiltrados.filter(cliente => cliente.activo);
  const clientesInactivos = clientesFiltrados.filter(cliente => !cliente.activo);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona tus clientes y sus asignaciones
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> 
          Nuevo Cliente
        </Button>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email..."
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
            Activos ({clientesActivos.length})
          </TabsTrigger>
          <TabsTrigger value="inactivos">
            Inactivos ({clientesInactivos.length})
          </TabsTrigger>
          <TabsTrigger value="todos">
            Todos ({clientesFiltrados.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activos" className="mt-0">
          <ClientesList clientes={clientesActivos} />
        </TabsContent>

        <TabsContent value="inactivos" className="mt-0">
          <ClientesList clientes={clientesInactivos} />
        </TabsContent>

        <TabsContent value="todos" className="mt-0">
          <ClientesList clientes={clientesFiltrados} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ClientesList({ clientes }: { clientes: any[] }) {
  if (clientes.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <User className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-medium">No hay clientes</h3>
        <p className="text-muted-foreground mt-2">
          No se encontraron clientes con los criterios de búsqueda actuales.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg divide-y">
      {clientes.map(cliente => (
        <div key={cliente.id} className="p-4 hover:bg-muted/50 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                {cliente.nombre.charAt(0)}{cliente.apellido.charAt(0)}
              </div>
              <div>
                <div className="font-medium flex items-center">
                  {cliente.nombre} {cliente.apellido}
                  {!cliente.activo && (
                    <Badge variant="outline" className="ml-2 text-muted-foreground">
                      Inactivo
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  {cliente.email}
                  <span className="mx-2">•</span>
                  <Phone className="h-3.5 w-3.5 mr-1" />
                  {cliente.telefono}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex flex-col text-sm">
                <span className="text-muted-foreground">Rutina:</span>
                <span className="font-medium">{cliente.rutina}</span>
              </div>
              <div className="flex flex-col text-sm">
                <span className="text-muted-foreground">Dieta:</span>
                <span className="font-medium">{cliente.dieta}</span>
              </div>
              <div className="ml-auto md:ml-4">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
