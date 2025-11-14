import React from 'react';
import './VagaCard.css';

const VagaCard = ({ vaga }) => {
  return (
    <div className="vaga-card">
      <h3 className="vaga-titulo">{vaga.titulo}</h3>
      <p className="vaga-empresa">{vaga.empresa}</p>
      <div className="vaga-detalhes">
        <span className="vaga-tag">{vaga.area}</span>
        <span className="vaga-tag">{vaga.modalidade}</span>
      </div>
      <button className="vaga-botao">Ver Detalhes</button>
    </div>
  );
};

export default VagaCard;