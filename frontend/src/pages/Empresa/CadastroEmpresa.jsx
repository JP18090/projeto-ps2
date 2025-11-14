import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiGetAreas, apiCreateEmpresa } from '../../api/simulatedApi';
import '../../styles/Form.css';

const CadastroEmpresa = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [areasAtuacao, setAreasAtuacao] = useState([]);
  const [areasDisponiveis, setAreasDisponiveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areas = await apiGetAreas();
        setAreasDisponiveis(areas || []);
      } catch (error) {
        console.error('Erro ao carregar áreas:', error);
      }
    };
    fetchAreas();
  }, []);

  const handleAreaToggle = (areaId) => {
    setAreasAtuacao(prev =>
      prev.includes(areaId)
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      const empresaData = {
        nome,
        email,
        senha,
        cnpj,
        telefone,
        endereco,
        areasAtuacao: areasAtuacao
      };

      await apiCreateEmpresa(empresaData);
      
      await login(email, senha, 'EMPRESA');
      
      navigate('/painel-empresa', { replace: true });
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      const errorMessage = error?.message || '';
      if (errorMessage.includes('Email já cadastrado')) {
        setErro('Este email já está cadastrado. Tente fazer login ou use outro email.');
      } else if (errorMessage.includes('Área de atuação não encontrada')) {
        setErro('Uma ou mais áreas de atuação selecionadas são inválidas.');
      } else {
        setErro('Erro ao realizar cadastro. Verifique os dados e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Cadastro de Empresa</h2>

        <div className="form-group">
          <label htmlFor="nome">Nome da Empresa *</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha *</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirmar Senha *</label>
          <input
            type="password"
            id="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cnpj">CNPJ *</label>
          <input
            type="text"
            id="cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            placeholder="00.000.000/0000-00"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone *</label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço *</label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Áreas de Atuação *</label>
          <div className="checkbox-group">
            {areasDisponiveis.map(area => (
              <label key={area.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={areasAtuacao.includes(area.id)}
                  onChange={() => handleAreaToggle(area.id)}
                />
                {area.nome}
              </label>
            ))}
          </div>
          {areasAtuacao.length === 0 && (
            <small className="form-help">Selecione pelo menos uma área de atuação</small>
          )}
        </div>

        {erro && <p className="form-error">{erro}</p>}

        <button type="submit" disabled={loading || areasAtuacao.length === 0}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default CadastroEmpresa;
