/**
 // Logica:
- Se utente è loggato → mostra il componente
- Se non è loggato → redirect al login
- Loading state durante verifica auth */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // ✅ se non loggato: vai a /login e ricorda da dove venivi
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ se loggato: renderizza le rotte figlie protette
  return <Outlet />;
}
