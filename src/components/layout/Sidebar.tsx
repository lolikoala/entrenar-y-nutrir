
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  BarChart,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Dumbbell,
  Utensils,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Sidebar() {
  const { profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Determinar los enlaces de navegación según el rol del usuario
  const getNavItems = () => {
    if (!profile) return [];

    if (profile.rol === 'admin') {
      return [
        { to: '/admin', label: 'Dashboard', icon: Home },
        { to: '/admin/entrenadores', label: 'Entrenadores', icon: Users },
        { to: '/admin/configuracion', label: 'Configuración', icon: Settings },
      ];
    } else if (profile.rol === 'entrenador') {
      return [
        { to: '/entrenador', label: 'Dashboard', icon: Home },
        { to: '/entrenador/clientes', label: 'Clientes', icon: Users },
        { to: '/entrenador/libreria', label: 'Librería', icon: BookOpen },
        { to: '/entrenador/asignaciones', label: 'Asignaciones', icon: Dumbbell },
        { to: '/entrenador/calendario', label: 'Calendario', icon: Calendar },
        { to: '/entrenador/mensajes', label: 'Mensajes', icon: MessageSquare },
        { to: '/entrenador/progreso', label: 'Progreso', icon: BarChart },
        { to: '/entrenador/notificaciones', label: 'Notificaciones', icon: Bell },
      ];
    } else if (profile.rol === 'cliente') {
      return [
        { to: '/cliente', label: 'Dashboard', icon: Home },
        { to: '/cliente/rutina', label: 'Mi Rutina', icon: Dumbbell },
        { to: '/cliente/dieta', label: 'Mi Dieta', icon: Utensils },
        { to: '/cliente/mensajes', label: 'Mensajes', icon: MessageSquare },
        { to: '/cliente/progreso', label: 'Mi Progreso', icon: BarChart },
        { to: '/cliente/citas', label: 'Citas', icon: Calendar },
        { to: '/cliente/notificaciones', label: 'Notificaciones', icon: Bell },
      ];
    }
    return [];
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Botón móvil para abrir/cerrar sidebar */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo y encabezado */}
          <div className="p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold logo-text">Entrenar&Nutrir</span>
            </Link>
          </div>

          {/* Perfil de usuario */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={profile?.foto_url || ''} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {profile?.nombre.charAt(0)}{profile?.apellido.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{profile?.nombre} {profile?.apellido}</span>
                <span className="text-xs text-muted-foreground capitalize">{profile?.rol}</span>
              </div>
            </div>
            <div className="mt-3">
              <Link to="/perfil">
                <Button variant="outline" size="sm" className="w-full">
                  <User size={16} className="mr-2" />
                  Ver perfil
                </Button>
              </Link>
            </div>
          </div>

          {/* Links de navegación */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "nav-link",
                      location.pathname === item.to && "active"
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cerrar sesión */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start text-muted-foreground hover:text-destructive"
              onClick={signOut}
            >
              <LogOut size={18} className="mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
