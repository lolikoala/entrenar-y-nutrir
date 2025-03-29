
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Dumbbell, Utensils, MessageSquare, Calendar, BarChart2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClienteDashboard() {
  const { profile } = useAuth();

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mi Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido/a, {profile?.nombre} {profile?.apellido}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Dumbbell className="h-5 w-5 mr-2 text-primary" />
              Mi Rutina de Hoy
            </CardTitle>
            <CardDescription>
              Ejercicios programados para hoy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-muted-foreground">
              No hay una rutina asignada para hoy
            </div>
            <div className="flex justify-center">
              <Link to="/cliente/rutina">
                <Button>
                  Ver mi rutina completa
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Utensils className="h-5 w-5 mr-2 text-primary" />
              Mi Dieta de Hoy
            </CardTitle>
            <CardDescription>
              Plan de alimentación para hoy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-muted-foreground">
              No hay una dieta asignada para hoy
            </div>
            <div className="flex justify-center">
              <Link to="/cliente/dieta">
                <Button>
                  Ver mi dieta completa
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-primary" />
              Mi Progreso
            </CardTitle>
            <CardDescription>
              Seguimiento de tu evolución
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="stat-card">
                <div className="text-muted-foreground text-sm">Peso actual</div>
                <div className="text-2xl font-bold">--</div>
                <div className="text-xs text-muted-foreground">kg</div>
              </div>
              
              <div className="stat-card">
                <div className="text-muted-foreground text-sm">% Grasa corporal</div>
                <div className="text-2xl font-bold">--</div>
                <div className="text-xs text-muted-foreground">%</div>
              </div>
              
              <div className="stat-card">
                <div className="text-muted-foreground text-sm">IMC</div>
                <div className="text-2xl font-bold">--</div>
                <div className="text-xs text-muted-foreground">kg/m²</div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Link to="/cliente/progreso">
                <Button>
                  Registrar progreso
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Próximas Citas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4 text-muted-foreground">
              No hay citas programadas
            </div>
            <Link to="/cliente/citas" className="flex items-center justify-center text-primary hover:underline mt-2">
              Ver todas las citas <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              Mensajes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4 text-muted-foreground">
              No hay mensajes recientes
            </div>
            <Link to="/cliente/mensajes" className="flex items-center justify-center text-primary hover:underline mt-2">
              Contactar a mi entrenador <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
