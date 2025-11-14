import React, { useState, useEffect } from 'react';
import { apiGetVagas, apiGetAreas } from '../../api/simulatedApi';
import '../../styles/Form.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    empresas: 0,
    estudantes: 0,
    vagasAbertas: 0,
    vagasEncerradas: 0
  });
  const [vagasPorArea, setVagasPorArea] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6B9D', '#A569BD', '#57C3C2', '#F18F01'];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Buscar vagas e áreas
        const vagas = await apiGetVagas();

        if (vagas && vagas.length > 0) {
          // Contar vagas abertas e encerradas
          const vagasAbertas = vagas.filter(v => !v.encerrada).length;
          const vagasEncerradas = vagas.filter(v => v.encerrada).length;

          // Agrupar vagas por área
          const vagasPorAreaMap = {};
          vagas.forEach(vaga => {
            const areaNome = vaga.area?.nome || 'Sem Área';
            vagasPorAreaMap[areaNome] = (vagasPorAreaMap[areaNome] || 0) + 1;
          });

          const vagasPorAreaArray = Object.entries(vagasPorAreaMap).map(([area, quantidade]) => ({
            name: area,
            vagas: quantidade
          }));

          setVagasPorArea(vagasPorAreaArray);

          // Atualizar estatísticas
          setStats(prevStats => ({
            ...prevStats,
            vagasAbertas,
            vagasEncerradas
          }));
        }
      } catch (err) {
        console.error('Erro ao carregar dados do dashboard:', err);
        setError('Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderBarChart = () => {
    if (!vagasPorArea.length) return null;
    
    const maxVagas = Math.max(...vagasPorArea.map(v => v.vagas));
    const chartHeight = 300;
    const barWidth = 100 / vagasPorArea.length;

    return (
      <div style={{ marginTop: '30px' }}>
        <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Gráfico de Barras</h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'center',
          height: `${chartHeight}px`,
          gap: '10px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          {vagasPorArea.map((area, idx) => {
            const heightPercent = (area.vagas / maxVagas) * 100;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1
                }}
              >
                <div
                  title={`${area.name}: ${area.vagas} vagas`}
                  style={{
                    width: '100%',
                    height: `${heightPercent}%`,
                    backgroundColor: COLORS[idx % COLORS.length],
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    minHeight: '20px'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                />
                <div style={{
                  marginTop: '10px',
                  fontSize: '12px',
                  textAlign: 'center',
                  maxWidth: '80px',
                  wordWrap: 'break-word',
                  fontWeight: '500'
                }}>
                  {area.name}
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginTop: '5px'
                }}>
                  {area.vagas}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPieChart = () => {
    if (!vagasPorArea.length) return null;

    const totalVagas = vagasPorArea.reduce((sum, area) => sum + area.vagas, 0);
    let currentAngle = 0;
    const radius = 100;
    const centerX = 120;
    const centerY = 120;

    const slices = vagasPorArea.map((area, idx) => {
      const slicePercent = area.vagas / totalVagas;
      const sliceAngle = slicePercent * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      const largeArc = sliceAngle > 180 ? 1 : 0;
      
      const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      
      const labelAngle = startAngle + sliceAngle / 2;
      const labelRad = (labelAngle * Math.PI) / 180;
      const labelX = centerX + (radius * 0.65) * Math.cos(labelRad);
      const labelY = centerY + (radius * 0.65) * Math.sin(labelRad);
      
      currentAngle = endAngle;
      
      return {
        path,
        color: COLORS[idx % COLORS.length],
        labelX,
        labelY,
        area: area.name,
        vagas: area.vagas,
        percent: (slicePercent * 100).toFixed(1)
      };
    });

    return (
      <div style={{ marginTop: '30px' }}>
        <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Gráfico de Pizza</h4>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px' }}>
          <svg width="240" height="240" style={{ border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            {slices.map((slice, idx) => (
              <g key={idx}>
                <path
                  d={slice.path}
                  fill={slice.color}
                  stroke="white"
                  strokeWidth="2"
                  style={{ cursor: 'pointer' }}
                  title={`${slice.area}: ${slice.vagas} vagas (${slice.percent}%)`}
                />
                <text
                  x={slice.labelX}
                  y={slice.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="white"
                  style={{ pointerEvents: 'none' }}
                >
                  {slice.percent}%
                </text>
              </g>
            ))}
          </svg>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
            minWidth: '200px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <h5 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>Legenda</h5>
            {vagasPorArea.map((area, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: COLORS[idx % COLORS.length],
                    borderRadius: '2px'
                  }}
                />
                <span style={{ fontSize: '13px' }}>
                  {area.name}: {area.vagas}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="form-container" style={{ textAlign: 'center', padding: '40px' }}>
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard Administrativo</h2>
      
      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div className="form-container" style={{ flex: 1, textAlign: 'center', minWidth: '150px' }}>
          <h3>{stats.empresas}</h3>
          <p>Empresas Cadastradas</p>
        </div>
        <div className="form-container" style={{ flex: 1, textAlign: 'center', minWidth: '150px' }}>
          <h3>{stats.estudantes}</h3>
          <p>Estudantes Cadastrados</p>
        </div>
        <div className="form-container" style={{ flex: 1, textAlign: 'center', minWidth: '150px' }}>
          <h3>{stats.vagasAbertas}</h3>
          <p>Vagas Abertas</p>
        </div>
        <div className="form-container" style={{ flex: 1, textAlign: 'center', minWidth: '150px' }}>
          <h3>{stats.vagasEncerradas}</h3>
          <p>Vagas Encerradas</p>
        </div>
      </div>
      
      <div className="form-container" style={{ marginTop: '30px' }}>
        <h3>Vagas por Área</h3>
        {vagasPorArea && vagasPorArea.length > 0 ? (
          <>
            {renderBarChart()}
            {renderPieChart()}
          </>
        ) : (
          <p style={{ textAlign: 'center' }}>Nenhuma vaga cadastrada ainda.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;