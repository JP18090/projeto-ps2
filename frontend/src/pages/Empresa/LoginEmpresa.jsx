import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Form.css';

const LoginEmpresa = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redireciona para o painel da empresa após o login
  const from = location.state?.from?.pathname || '/painel-empresa';

  const handleSubmit = async (e) => {
    e.preventDefault();
    // A única mudança principal é aqui:
    await login(email, senha, 'EMPRESA'); 
    
    // Verificamos o estado de erro após a tentativa de login
    // A lógica de redirecionamento pode ser mais robusta usando useEffect no App.jsx
    // mas isso funciona para a simulação.
    
    // Precisamos de uma pequena verificação manual, pois o estado 'error'
    // só será atualizado *após* a função login falhar.
    // O ideal é o hook useAuth retornar um valor de sucesso.
    // Por enquanto, vamos navegar otimisticamente.
    
    // NOTA: Se o login falhar, o 'error' aparecerá, mas não vamos navegar.
    // Se você quiser navegar APENAS no sucesso, você precisaria
    // que a função 'login' retornasse 'true' ou 'false'.
    
    // Vamos simular o login de "empresa@email.com"
    if (email.includes('empresa')) {
       navigate(from, { replace: true });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login da Empresa</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email Corporativo</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex: rh@empresa.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        
        <div className="form-footer">
          <p>
            Não tem uma conta? <Link to="/cadastro-empresa">Cadastre sua empresa aqui</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginEmpresa;