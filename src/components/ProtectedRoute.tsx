import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

type ProtectedRouteProps = {
  allowedRoles: string[];
};

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Verificando acceso...</span>
      </div>
    );
  }

  // Si no hay perfil, redireccionar al login
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario no tiene un rol permitido, redireccionar a su dashboard
  if (!allowedRoles.includes(profile.rol)) {
    if (profile.rol === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (profile.rol === 'entrenador') {
      return <Navigate to="/entrenador" replace />;
    } else if (profile.rol === 'cliente') {
      return <Navigate to="/cliente" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
}
