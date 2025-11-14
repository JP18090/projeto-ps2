import React, { useState, useEffect } from 'react';
import { apiGetAreas, apiAddArea, apiDeleteArea } from '../../api/simulatedApi';
import '../../styles/Form.css';

const GerenciarAreas = () => {
  const [areas, setAreas] = useState([]);
  const [novaArea, setNovaArea] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carrega as áreas ao montar o componente
    const fetchAreas = async () => {
      setLoading(true);
      const data = await apiGetAreas();
      setAreas(data);
      setLoading(false);
    };
    fetchAreas();
  }, []);

  const handleAddArea = async (e) => {
    e.preventDefault();
    if (!novaArea.trim()) return;

    
    const areaAdicionada = await apiAddArea(novaArea);
    setAreas([...areas, areaAdicionada]);
    setNovaArea('');
  };

  const handleDeleteArea = async (id) => {

    await apiDeleteArea(id);
    setAreas(areas.filter(a => a.id !== id));
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px' }}>
      <h2>Gerenciar Áreas de Interesse</h2>
      
      {/* Formulário de Adição */}
      <form onSubmit={handleAddArea}>
        <div className="form-group">
          <label htmlFor="novaArea">Nova Área</label>
          <input
            type="text"
            id="novaArea"
            value={novaArea}
            onChange={(e) => setNovaArea(e.target.value)}
            placeholder="Ex: Recursos Humanos"
          />
        </div>
        <button type="submit">Adicionar Área</button>
      </form>

      {/* Listagem de Áreas */}
      <div style={{ marginTop: '30px' }}>
        <h3>Áreas Cadastradas</h3>
        {loading && <p>Carregando áreas...</p>}
        <ul className="area-list">
          {areas.map(area => (
            <li key={area.id}>
              <span>{area.nome}</span>
              <button onClick={() => handleDeleteArea(area.id)} className="delete-btn">
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GerenciarAreas;