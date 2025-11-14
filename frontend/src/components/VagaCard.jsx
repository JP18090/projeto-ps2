import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './VagaCard.css';

const VagaCard = ({ vaga, onCandidatar }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login-estudante');
    } else if (onCandidatar) {
      onCandidatar(vaga.id);
    }
  };

  const getBotaoTexto = () => {
    if (!isAuthenticated) return 'Faça login para se candidatar';
    if (vaga.jaCandidatado) return 'Já candidatado';
    return 'Candidatar-se';
  };

  return (
    <div className="vaga-card">
      <div className="vaga-card-header">
        <h3>{vaga.titulo}</h3>
        <span className={`modalidade-badge ${vaga.modalidade?.toLowerCase()}`}>
          {vaga.modalidade}
        </span>
      </div>
      
      <div className="vaga-card-body">
        <p className="descricao">{vaga.descricao}</p>
        
        <div className="vaga-info">
          <div className="info-item">
            <strong>Empresa:</strong> {vaga.empresa?.nome}
          </div>
          <div className="info-item">
            <strong>Localização:</strong> {vaga.localizacao}
          </div>
          <div className="info-item">
            <strong>Carga Horária:</strong> {vaga.cargaHoraria}
          </div>
          <div className="info-item">
            <strong>Área:</strong> {vaga.area?.nome}
          </div>
        </div>

        <div className="requisitos">
          <strong>Requisitos:</strong> {vaga.requisitos}
        </div>
      </div>

      <div className="vaga-card-footer">
        <button 
          className="btn-candidatar"
          onClick={handleClick}
          disabled={vaga.jaCandidatado}
        >
          {getBotaoTexto()}
        </button>
      </div>
    </div>
  );
};

export default VagaCard;
