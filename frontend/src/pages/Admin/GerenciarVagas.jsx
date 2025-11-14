import React, { useState, useEffect } from 'react';
import '../../styles/Form.css';
import VagaCard from '../../components/ui/VagaCard/VagaCard';
import { apiGetVagas, apiCreateVaga } from '../../api/simulatedApi';

const GerenciarVagas = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    area: '',
    localizacao: '',
    modalidade: 'presencial',
    cargaHoraria: '',
    requisitos: ''
  });

  useEffect(() => {
    const fetchVagas = async () => {
      setLoading(true);
      try {
        const data = await apiGetVagas();
        setVagas(data || []);
      } catch (err) {
        console.error('Erro ao carregar vagas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVagas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nova = await apiCreateVaga(formData);
      setVagas(prev => [nova, ...prev]);
      setFormData({ titulo: '', descricao: '', area: '', localizacao: '', modalidade: 'presencial', cargaHoraria: '', requisitos: '' });
      alert('Vaga criada com sucesso');
    } catch (err) {
      console.error('Erro ao criar vaga', err);
      alert('Erro ao criar vaga');
    }
  };

  return (
    <div>
      <h2>Gerenciar Vagas (Admin)</h2>

      <div className="form-container" style={{ maxWidth: '700px', marginBottom: '20px' }}>
        <h3>Criar Nova Vaga</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input name="titulo" value={formData.titulo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Área</label>
            <input name="area" value={formData.area} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Localização</label>
            <input name="localizacao" value={formData.localizacao} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Modalidade</label>
            <select name="modalidade" value={formData.modalidade} onChange={handleChange}>
              <option value="presencial">Presencial</option>
              <option value="remoto">Remoto</option>
              <option value="hibrido">Híbrido</option>
            </select>
          </div>
          <div className="form-group">
            <label>Carga Horária</label>
            <input type="number" name="cargaHoraria" value={formData.cargaHoraria} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Requisitos</label>
            <input name="requisitos" value={formData.requisitos} onChange={handleChange} />
          </div>
          <button type="submit">Publicar Vaga</button>
        </form>
      </div>

      <div>
        <h3>Vagas Cadastradas</h3>
        {loading && <p>Carregando vagas...</p>}
        {!loading && vagas.length === 0 && <p>Nenhuma vaga encontrada.</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
          {vagas.map(v => (
            <VagaCard key={v.id} vaga={v} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GerenciarVagas;
