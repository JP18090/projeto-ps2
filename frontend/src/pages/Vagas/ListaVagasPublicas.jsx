import React, { useState, useEffect } from 'react';
import { apiGetVagas, apiCreateInscricao } from '../../api/simulatedApi';
import { useAuth } from '../../contexts/AuthContext';
import VagaCard from '../../components/VagaCard';
import './ListaVagasPublicas.css';

const ListaVagasPublica = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroArea, setFiltroArea] = useState('');
  const [filtroModalidade, setFiltroModalidade] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchVagas = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiGetVagas();
        const vagasAbertas = (data || []).filter(v => !v.encerrada);
        setVagas(vagasAbertas);
      } catch (err) {
        console.error('Erro ao carregar vagas:', err);
        setError('Não foi possível carregar as vagas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchVagas();
  }, []);

  const vagasFiltradas = vagas.filter(vaga => {
    const matchArea = !filtroArea || vaga.area?.nome === filtroArea;
    const matchModalidade = !filtroModalidade || vaga.modalidade === filtroModalidade;
    return matchArea && matchModalidade;
  });

  const handleCandidatar = async (vagaId) => {
    if (!user) return;
    
    const estudanteId = user.estudanteId;
    if (!estudanteId) {
      alert('Erro: perfil de estudante não encontrado. Tente fazer login novamente.');
      return;
    }
    
    try {
      await apiCreateInscricao(vagaId, estudanteId);
      alert('Candidatura realizada com sucesso!');
      setVagas(vagas.map(v => 
        v.id === vagaId ? { ...v, jaCandidatado: true } : v
      ));
    } catch (err) {
      console.error('Erro ao candidatar:', err);
      const errorMessage = err?.message || '';
      if (errorMessage.includes('já inscrito')) {
        alert('Você já está inscrito nesta vaga.');
      } else if (errorMessage.includes('Estudante não encontrado')) {
        alert('Erro: seu cadastro não foi encontrado. Tente fazer login novamente.');
      } else if (errorMessage.includes('Vaga não encontrada')) {
        alert('Erro: esta vaga não está mais disponível.');
      } else {
        alert('Erro ao realizar candidatura. Tente novamente mais tarde.');
      }
    }
  };

  const areas = [...new Set(vagas.map(v => v.area?.nome).filter(Boolean))];
  const modalidades = [...new Set(vagas.map(v => v.modalidade).filter(Boolean))];

  if (loading) {
    return (
      <div className="lista-vagas-publicas">
        <h2>Vagas Abertas</h2>
        <div className="loading-message">
          <p>Carregando vagas disponíveis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lista-vagas-publicas">
        <h2>Vagas Abertas</h2>
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-vagas-publicas">
      <div className="header-section">
        <h2>Vagas Abertas</h2>
        <p className="subtitle">
          Explore {vagas.length} oportunidade{vagas.length !== 1 ? 's' : ''} de estágio disponível
          {vagas.length !== 1 ? 'is' : ''}
        </p>
      </div>

      {vagas.length > 0 && (
        <div className="filtros-section">
          <div className="filtro-group">
            <label htmlFor="filtro-area">Filtrar por área:</label>
            <select
              id="filtro-area"
              value={filtroArea}
              onChange={(e) => setFiltroArea(e.target.value)}
            >
              <option value="">Todas as áreas</option>
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div className="filtro-group">
            <label htmlFor="filtro-modalidade">Filtrar por modalidade:</label>
            <select
              id="filtro-modalidade"
              value={filtroModalidade}
              onChange={(e) => setFiltroModalidade(e.target.value)}
            >
              <option value="">Todas as modalidades</option>
              {modalidades.map(mod => (
                <option key={mod} value={mod}>{mod}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="vagas-container">
        {vagasFiltradas.length === 0 ? (
          <div className="no-vagas-message">
            <p>Nenhuma vaga encontrada com os filtros selecionados.</p>
            {(filtroArea || filtroModalidade) && (
              <button
                className="btn-limpar-filtros"
                onClick={() => {
                  setFiltroArea('');
                  setFiltroModalidade('');
                }}
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          vagasFiltradas.map(vaga => (
            <VagaCard 
              key={vaga.id} 
              vaga={vaga} 
              onCandidatar={handleCandidatar}
            />
          ))
        )}
      </div>

      <div className="info-footer">
        <p>Para se candidatar a uma vaga, faça login como estudante.</p>
      </div>
    </div>
  );
};

export default ListaVagasPublica;
