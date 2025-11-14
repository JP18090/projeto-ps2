import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import './Header.css'; // Vamos usar um CSS simples

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redireciona para a Home após o logout
  };

  const renderLinksVisitante = () => (
    <>
      <Link to="/vagas">Ver Vagas</Link>
      <Link to="/login-estudante" className="menu-button">Login Estudante</Link>
      <Link to="/login-empresa" className="menu-button">Login Empresa</Link>
      {/* <Link to="/login-admin">Login Admin</Link> */}
    </>
  );

  const renderLinksEstudante = () => (
    <>
      <Link to="/painel-estudante">Meu Painel</Link>
      <Link to="/vagas">Buscar Vagas</Link>
    </>
  );

  const renderLinksEmpresa = () => (
    <>
      <Link to="/painel-empresa">Meu Painel</Link>
      <Link to="/criar-vaga">Ofertar Vaga</Link>
    </>
  );

  const renderLinksAdmin = () => (
    <>
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/areas">Gerenciar Áreas</Link>
    </>
  );

  return (
    <header className="header-principal">
      <nav className="navbar">
        <Link to="/" className="logo">Portal de Estágios</Link>
        <div className="menu-links">
          {!isAuthenticated && renderLinksVisitante()}
          
          {isAuthenticated && user.perfil === 'ESTUDANTE' && renderLinksEstudante()}
          {isAuthenticated && user.perfil === 'EMPRESA' && renderLinksEmpresa()}
          {isAuthenticated && user.perfil === 'ADMIN' && renderLinksAdmin()}

          {isAuthenticated && (
            <button onClick={handleLogout} className="menu-button-logout">
              Sair (Olá, {user.nome})
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;