import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Rota privada que verifica se o usuário está autenticado
 * e se pertence ao perfil (role) permitido.
 */
const PrivateRoute = ({ perfisPermitidos }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Se não está logado, redireciona para a página inicial (ou login)
    // Passamos a localização atual para que ele possa voltar após o login
    return <Navigate to="/login-estudante" state={{ from: location }} replace />;
  }

  // Verifica se o perfil do usuário está na lista de perfis permitidos
  if (perfisPermitidos && !perfisPermitidos.includes(user.perfil)) {
    // Logado, mas sem permissão (ex: Estudante tentando acessar /admin)
    // Redireciona para a home (ou uma página 403 "Não Autorizado")
    return <Navigate to="/" replace />;
  }

  // Se está autenticado e tem permissão, renderiza o conteúdo da rota
  return <Outlet />;
};

export default PrivateRoute;