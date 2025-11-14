import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiGetVagas, apiDeleteVaga } from '../../api/simulatedApi';
import '../../styles/Painel.css';

const PainelEmpresa = () => {
  const { user } = useAuth();
  const [minhasVagas, setMinhasVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVagas = async () => {
      if (!user || !user.empresaId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const todasVagas = await apiGetVagas();
        const vagasDaEmpresa = todasVagas.filter(v => v.empresa?.id === user.empresaId);
        setMinhasVagas(vagasDaEmpresa);
      } catch (error) {
        console.error('Erro ao carregar vagas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVagas();
  }, [user]);

  const handleDeleteVaga = async (vagaId) => {
    if (!window.confirm('Tem certeza que deseja excluir esta vaga?')) {
      return;
    }

    try {
      await apiDeleteVaga(vagaId);
      setMinhasVagas(minhasVagas.filter(v => v.id !== vagaId));
      alert('Vaga excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir vaga:', error);
      alert('Erro ao excluir vaga. Tente novamente.');
    }
  };

  if (!user) {
    return <div className="painel-container"><p>Carregando dados da empresa...</p></div>;
  }

  return (
    <div className="painel-container">
      <div className="painel-header">
        <h2>Painel da Empresa</h2>
        <p className="welcome-message">Olá, {user.nome}!</p>
      </div>

      <Link to="/criar-vaga" className="btn-primary" style={{ marginBottom: '20px', display: 'inline-block' }}>
        + Criar Nova Vaga
      </Link>

      <div className="painel-section">
        <h3>Suas Vagas Publicadas</h3>
        
        {loading ? (
          <p>Carregando suas vagas...</p>
        ) : minhasVagas.length === 0 ? (
          <p className="no-data-message">Você ainda não publicou nenhuma vaga.</p>
        ) : (
          <div className="vagas-list">
            {minhasVagas.map(vaga => (
              <div key={vaga.id} className="vaga-empresa-card">
                <div className="vaga-header">
                  <h4>{vaga.titulo}</h4>
                  {vaga.encerrada && <span className="badge-encerrada">Encerrada</span>}
                  {!vaga.encerrada && <span className="badge-aberta">Aberta</span>}
                </div>
                
                <p><strong>Descrição:</strong> {vaga.descricao}</p>
                <p><strong>Área:</strong> {vaga.area?.nome || 'N/A'}</p>
                <p><strong>Localização:</strong> {vaga.localizacao}</p>
                <p><strong>Modalidade:</strong> {vaga.modalidade}</p>
                <p><strong>Carga Horária:</strong> {vaga.cargaHoraria}</p>
                {vaga.requisitos && <p><strong>Requisitos:</strong> {vaga.requisitos}</p>}
                
                <div className="vaga-actions">
                  <button 
                    className="btn-danger-small"
                    onClick={() => handleDeleteVaga(vaga.id)}
                  >
                    Excluir Vaga
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PainelEmpresa;
