import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiGetAreas, apiCreateCandidato } from '../../api/simulatedApi';
import '../../styles/Form.css';

const CadastroEstudante = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [curso, setCurso] = useState('');
  const [telefone, setTelefone] = useState('');
  const [areasInteresse, setAreasInteresse] = useState([]);
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
    setAreasInteresse(prev =>
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
      const estudanteData = {
        nome,
        email,
        senha,
        cpf,
        curso,
        telefone,
        interesses: areasInteresse
      };

      await apiCreateCandidato(estudanteData);
      
      await login(email, senha, 'ESTUDANTE');
      
      navigate('/painel-estudante', { replace: true });
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      const errorMessage = error?.message || '';
      if (errorMessage.includes('Email já cadastrado')) {
        setErro('Este email já está cadastrado. Tente fazer login ou use outro email.');
      } else if (errorMessage.includes('Área de interesse não encontrada')) {
        setErro('Uma ou mais áreas de interesse selecionadas são inválidas.');
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
        <h2>Cadastro de Estudante</h2>

        <div className="form-group">
          <label htmlFor="nome">Nome Completo *</label>
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
          <label htmlFor="cpf">CPF *</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="curso">Curso *</label>
          <input
            type="text"
            id="curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className="form-group">
          <label>Áreas de Interesse</label>
          <div className="checkbox-group">
            {areasDisponiveis.map(area => (
              <label key={area.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={areasInteresse.includes(area.id)}
                  onChange={() => handleAreaToggle(area.id)}
                />
                {area.nome}
              </label>
            ))}
          </div>
        </div>

        {erro && <p className="form-error">{erro}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default CadastroEstudante;
