
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Dumbbell, Utensils, MessageSquare, Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function EntrenadorDashboard() {
  const { profile } = useAuth();

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenido, {profile?.nombre} {profile?.apellido}
          </p>
        </div>
        <Button className="bg-primary">
          <Plus className="mr-2 h-4 w-4" /> 
          Nuevo Cliente
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">
              Clientes activos
            </p>
            <Link to="/entrenador/clientes">
              <Button variant="ghost" className="mt-2 p-0 h-auto">
                Ver todos <span className="ml-1">→</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Dumbbell className="h-5 w-5 mr-2 text-primary" />
              Rutinas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">
              Rutinas creadas
            </p>
            <Link to="/entrenador/libreria">
              <Button variant="ghost" className="mt-2 p-0 h-auto">
                Ver librería <span className="ml-1">→</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Utensils className="h-5 w-5 mr-2 text-primary" />
              Dietas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">
              Dietas creadas
            </p>
            <Link to="/entrenador/libreria">
              <Button variant="ghost" className="mt-2 p-0 h-auto">
                Ver librería <span className="ml-1">→</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              Mensajes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">
              Mensajes sin leer
            </p>
            <Link to="/entrenador/mensajes">
              <Button variant="ghost" className="mt-2 p-0 h-auto">
                Ver mensajes <span className="ml-1">→</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Citas Próximas
            </CardTitle>
            <CardDescription>
              Próximas citas programadas con tus clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-muted-foreground">
              No hay citas programadas próximamente
            </div>
            <div className="flex justify-center">
              <Link to="/entrenador/calendario">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> 
                  Programar cita
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              Mensajes Recientes
            </CardTitle>
            <CardDescription>
              Últimas conversaciones con tus clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-muted-foreground">
              No hay mensajes recientes
            </div>
            <div className="flex justify-center">
              <Link to="/entrenador/mensajes">
                <Button>
                  Ver todos los mensajes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
