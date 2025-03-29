
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MainLayout } from "./components/layout/MainLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Auth
import Login from "./pages/Auth/Login";

// Admin
import AdminDashboard from "./pages/Admin/Dashboard";

// Entrenador
import EntrenadorDashboard from "./pages/Entrenador/Dashboard";
import ClientesPage from "./pages/Entrenador/Clientes";

// Cliente
import ClienteDashboard from "./pages/Cliente/Dashboard";

// Página no encontrada
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Ruta de inicio - Redirige a login o al panel del rol correspondiente */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Página de login */}
            <Route path="/login" element={<Login />} />
            
            {/* Rutas de administrador */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route element={<MainLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                {/* Agregar otras rutas de admin */}
              </Route>
            </Route>
            
            {/* Rutas de entrenador */}
            <Route element={<ProtectedRoute allowedRoles={['entrenador']} />}>
              <Route element={<MainLayout />}>
                <Route path="/entrenador" element={<EntrenadorDashboard />} />
                <Route path="/entrenador/clientes" element={<ClientesPage />} />
                {/* Agregar otras rutas de entrenador */}
              </Route>
            </Route>
            
            {/* Rutas de cliente */}
            <Route element={<ProtectedRoute allowedRoles={['cliente']} />}>
              <Route element={<MainLayout />}>
                <Route path="/cliente" element={<ClienteDashboard />} />
                {/* Agregar otras rutas de cliente */}
              </Route>
            </Route>
            
            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
