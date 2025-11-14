import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Form.css'; // Reutilizando o CSS para um visual limpo

const Home = () => {
  return (
    <div className="form-container" style={{ textAlign: 'center' }}>
      <h2>Bem-vindo ao Portal de Estágios</h2>
      <p>Conectando empresas e estudantes.</p>
      <br />
      <Link to="/vagas" style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 15px',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Ver Vagas Abertas
      </Link>
    </div>
  );
};

export default Home;