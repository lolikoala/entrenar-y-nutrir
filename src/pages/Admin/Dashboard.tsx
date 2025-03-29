
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Settings, Activity } from "lucide-react";

export default function AdminDashboard() {
  const { profile } = useAuth();

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido, {profile?.nombre} {profile?.apellido}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Entrenadores
            </CardTitle>
            <CardDescription>Gestiona los entrenadores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">
              Entrenadores registrados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Settings className="h-5 w-5 mr-2 text-primary" />
              Configuración
            </CardTitle>
            <CardDescription>Configura la apariencia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">
              Temas disponibles
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Actividad
            </CardTitle>
            <CardDescription>Actividad reciente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">
              Acciones en las últimas 24h
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
            <CardDescription>
              Accede rápidamente a las funciones más utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
                <h3 className="font-medium">Crear entrenador</h3>
                <p className="text-sm text-muted-foreground">
                  Añade un nuevo entrenador a la plataforma
                </p>
              </div>
              <div className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
                <h3 className="font-medium">Configurar interfaz</h3>
                <p className="text-sm text-muted-foreground">
                  Personaliza la apariencia para los entrenadores
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
