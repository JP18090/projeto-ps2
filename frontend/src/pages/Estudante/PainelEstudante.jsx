import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGetVagasPorInteresse, apiGetInscricoesByEstudante } from '../../api/simulatedApi'; 
import '../../styles/Painel.css';

const PainelEstudante = () => {
  const { user } = useAuth();
  const [vagasRecomendadas, setVagasRecomendadas] = useState([]);
  const [minhasCandidaturas, setMinhasCandidaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCandidaturas, setLoadingCandidaturas] = useState(true);

  useEffect(() => {
    const fetchVagas = async () => {
      if (user && user.areasDeInteresse) {
        setLoading(true);
        try {
          const vagas = await apiGetVagasPorInteresse(user.areasDeInteresse);
          setVagasRecomendadas(vagas);
        } catch (error) {
          console.error("Erro ao buscar vagas:", error);
        } finally {
          setLoading(false);
        }
      } else if (user) {
        setLoading(false);
      }
    };

    const fetchCandidaturas = async () => {
      if (user && user.estudanteId) {
        setLoadingCandidaturas(true);
        try {
          const candidaturas = await apiGetInscricoesByEstudante(user.estudanteId);
          setMinhasCandidaturas(candidaturas || []);
        } catch (error) {
          console.error("Erro ao buscar candidaturas:", error);
          setMinhasCandidaturas([]);
        } finally {
          setLoadingCandidaturas(false);
        }
      }
    };

    fetchVagas();
    fetchCandidaturas();
  }, [user]); 

  const handleGerarCurriculo = async () => {
    if (!user) return;
    
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      let yPosition = 20;
      
      doc.setFontSize(22);
      doc.setFont(undefined, 'bold');
      doc.text('CURRÍCULO', 105, yPosition, { align: 'center' });
      yPosition += 15;
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      
      doc.setFont(undefined, 'bold');
      doc.text('Dados Pessoais', 20, yPosition);
      yPosition += 8;
      doc.setFont(undefined, 'normal');
      
      doc.text(`Nome: ${user.nome || 'Não informado'}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Email: ${user.email || 'Não informado'}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Telefone: ${user.telefone || 'Não informado'}`, 20, yPosition);
      yPosition += 7;
      doc.text(`CPF: ${user.cpf || 'Não informado'}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Curso: ${user.curso || 'Não informado'}`, 20, yPosition);
      yPosition += 12;
      
      doc.setFont(undefined, 'bold');
      doc.text('Áreas de Interesse', 20, yPosition);
      yPosition += 8;
      doc.setFont(undefined, 'normal');
      
      if (user.areasInteresse && user.areasInteresse.length > 0) {
        user.areasInteresse.forEach(area => {
          doc.text(`• ${area.nome}`, 20, yPosition);
          yPosition += 7;
        });
      } else {
        doc.text('Nenhuma área cadastrada', 20, yPosition);
        yPosition += 7;
      }
      yPosition += 8;
      
      doc.setFont(undefined, 'bold');
      doc.text(`Candidaturas Ativas (${minhasCandidaturas.length})`, 20, yPosition);
      yPosition += 8;
      doc.setFont(undefined, 'normal');
      
      if (minhasCandidaturas.length > 0) {
        minhasCandidaturas.forEach(c => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(`• ${c.vagaTitulo} - ${c.empresaNome}`, 20, yPosition);
          yPosition += 7;
        });
      } else {
        doc.text('Nenhuma candidatura ativa', 20, yPosition);
      }
      
      doc.save(`curriculo_${user.nome.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar currículo em PDF. Tente novamente.');
    }
  };

  if (!user) {
    return <div className="painel-container"><p>Carregando dados do usuário...</p></div>;
  }

  return (
    <div className="painel-container">
      <div className="painel-header">
        <h2>Painel do Estudante</h2>
        <p className="welcome-message">Olá, {user.nome}!</p>
      </div>

      <div className="painel-section">
        <div className="section-header">
          <h3>Minhas Candidaturas</h3>
          <button className="btn-primary" onClick={handleGerarCurriculo}>
            Gerar Currículo (PDF)
          </button>
        </div>
        
        {loadingCandidaturas ? (
          <p>Carregando suas candidaturas...</p>
        ) : minhasCandidaturas.length === 0 ? (
          <p className="no-data-message">Você ainda não se candidatou a nenhuma vaga.</p>
        ) : (
          <div className="candidaturas-list">
            {minhasCandidaturas.map(candidatura => (
              <div key={candidatura.id} className="candidatura-card">
                <h4>{candidatura.vagaTitulo}</h4>
                <p><strong>Empresa:</strong> {candidatura.empresaNome}</p>
                <p className="status-badge">Em análise</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="painel-section">
        <h3>Vagas Recomendadas para Você</h3>
        {loading ? (
          <p>Carregando vagas recomendadas...</p>
        ) : vagasRecomendadas.length === 0 ? (
          <p className="no-data-message">Nenhuma vaga encontrada para suas áreas de interesse.</p>
        ) : (
          <div className="vagas-grid">
            {vagasRecomendadas.map(vaga => (
              <div key={vaga.id} className="vaga-mini-card">
                <h4>{vaga.titulo}</h4>
                <p>{vaga.empresa?.nome}</p>
                <span className="modalidade">{vaga.modalidade}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PainelEstudante;
