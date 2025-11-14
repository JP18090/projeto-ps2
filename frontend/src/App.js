import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/shared/Header/Header';
import PrivateRoute from './components/shared/PrivateRoute';

// Importação das Páginas
import Home from './pages/home';
import LoginEstudante from './pages/Estudante/LoginEstudante';
import LoginEmpresa from './pages/Empresa/LoginEmpresa';
import CadastroEstudante from './pages/Estudante/CadastroEstudante';
import CadastroEmpresa from './pages/Empresa/CadastroEmpresa';
import PainelEstudante from './pages/Estudante/PainelEstudante';
import PainelEmpresa from './pages/Empresa/PainelEmpresa';
import AdminDashboard from './pages/Admin/AdminDashboard';
import GerenciarAreas from './pages/Admin/GerenciarAreas';
import GerenciarVagas from './pages/Admin/GerenciarVagas';
import ListaVagasPublica from './pages/Vagas/ListaVagasPublicas';
import CriarVaga from './pages/Empresa/CriarVaga';

function App() {
  return (
    <div className="App">
      <Header /> {/* O Header completo está de volta */}
      <main className="container">
        <Routes> {/* As rotas completas estão de volta */}
          
          {/* Rotas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/vagas" element={<ListaVagasPublica />} />
          
          {/* Autenticação */}
          <Route path="/login-estudante" element={<LoginEstudante />} />
          <Route path="/login-empresa" element={<LoginEmpresa />} />
          <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
          <Route path="/cadastro-estudante" element={<CadastroEstudante />} />

          {/* Rotas Privadas - ESTUDANTE */}
          <Route element={<PrivateRoute perfisPermitidos={['ESTUDANTE']} />}>
            <Route path="/painel-estudante" element={<PainelEstudante />} />
          </Route>

          {/* Rotas Privadas - EMPRESA */}
          <Route element={<PrivateRoute perfisPermitidos={['EMPRESA']} />}>
            <Route path="/painel-empresa" element={<PainelEmpresa />} />
            <Route path="/criar-vaga" element={<CriarVaga />} />
          </Route>

          {/* Rotas Privadas - ADMIN */}
          <Route element={<PrivateRoute perfisPermitidos={['ADMIN']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/areas" element={<GerenciarAreas />} />
            <Route path="/admin/vagas" element={<GerenciarVagas />} />
          </Route>

        </Routes>
      </main>
    </div>
  );
}

export default App;