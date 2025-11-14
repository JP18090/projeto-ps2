import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiCreateVaga, apiGetAreas } from '../../api/simulatedApi';
import '../../styles/Form.css';

const CriarVaga = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    areaId: '',
    localizacao: '',
    modalidade: 'Presencial',
    cargaHoraria: '',
    requisitos: ''
  });
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasData = await apiGetAreas();
        setAreas(areasData || []);
      } catch (error) {
        console.error('Erro ao carregar áreas:', error);
        setErro('Erro ao carregar áreas de interesse');
      }
    };
    fetchAreas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!user || !user.empresaId) {
      setErro('Erro: perfil de empresa não encontrado. Tente fazer login novamente.');
      return;
    }

    if (!formData.areaId) {
      setErro('Por favor, selecione uma área de atuação');
      return;
    }

    setLoading(true);
    
    try {
      const vagaData = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        areaId: parseInt(formData.areaId),
        localizacao: formData.localizacao,
        modalidade: formData.modalidade,
        cargaHoraria: formData.cargaHoraria,
        requisitos: formData.requisitos,
        empresaId: user.empresaId
      };

      await apiCreateVaga(vagaData);
      alert('Vaga criada com sucesso!');
      navigate('/painel-empresa');
    } catch (error) {
      console.error('Erro ao criar vaga:', error);
      const errorMessage = error?.message || '';
      if (errorMessage.includes('Área não encontrada')) {
        setErro('Área selecionada inválida. Por favor, tente novamente.');
      } else if (errorMessage.includes('Empresa não encontrada')) {
        setErro('Erro: empresa não encontrada. Tente fazer login novamente.');
      } else {
        setErro('Erro ao criar vaga. Verifique os dados e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Ofertar Nova Vaga</h2>

        {erro && <div className="error-message">{erro}</div>}

        <div className="form-group">
          <label htmlFor="titulo">Título da Vaga *</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo" 
            value={formData.titulo} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição *</label>
          <textarea 
            id="descricao" 
            name="descricao" 
            value={formData.descricao} 
            onChange={handleChange} 
            rows="4"
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="areaId">Área de Atuação *</label>
          <select 
            id="areaId" 
            name="areaId" 
            value={formData.areaId} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecione uma área</option>
            {areas.map(area => (
              <option key={area.id} value={area.id}>{area.nome}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="localizacao">Localização *</label>
          <input 
            type="text" 
            id="localizacao" 
            name="localizacao" 
            value={formData.localizacao} 
            onChange={handleChange} 
            placeholder="Ex: São Paulo, SP" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="modalidade">Modalidade *</label>
          <select 
            id="modalidade" 
            name="modalidade" 
            value={formData.modalidade} 
            onChange={handleChange}
          >
            <option value="Presencial">Presencial</option>
            <option value="Remoto">Remoto</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cargaHoraria">Carga Horária *</label>
          <input 
            type="text" 
            id="cargaHoraria" 
            name="cargaHoraria" 
            value={formData.cargaHoraria} 
            onChange={handleChange} 
            placeholder="Ex: 20h/semana ou 4h/dia"
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="requisitos">Requisitos</label>
          <textarea 
            id="requisitos" 
            name="requisitos" 
            value={formData.requisitos} 
            onChange={handleChange}
            rows="3"
            placeholder="Descreva os requisitos para a vaga"
          />
        </div>

        <button type="submit" disabled={loading || areas.length === 0}>
          {loading ? 'Publicando...' : 'Publicar Vaga'}
        </button>

        {areas.length === 0 && !erro && (
          <p className="info-message">Carregando áreas disponíveis...</p>
        )}
      </form>
    </div>
  );
};

export default CriarVaga;
