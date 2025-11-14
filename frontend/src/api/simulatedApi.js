// src/simulatedApi.js
// Base inteligente: REACT_APP_API_URL > Codespaces auto-detect > relative (CRA dev-server proxy)
function detectBaseUrl() {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.location.hostname.endsWith('.app.github.dev')) {
    // Codespaces preview: frontend host ends with `-3000.app.github.dev`
    // backend is typically exposed at same codespace but with `-8080`.
    const host = window.location.hostname;
    if (host.includes('-3000')) {
      const backendHost = host.replace('-3000', '-8080');
      return `${window.location.protocol}//${backendHost}`;
    }
  }

  // fallback: use relative paths so CRA dev-server proxy forwards to localhost:8080
  return '';
}

const BASE_URL = detectBaseUrl();

function joinUrl(base, path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!base) return p;
  return `${base.replace(/\/$/, '')}${p}`;
}

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    credentials: 'include',
  };
  if (body !== undefined) opts.body = JSON.stringify(body);

  const fullPath = joinUrl(BASE_URL, path);

  try {
    const res = await fetch(fullPath, opts);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${res.status} : ${text}`);
    }
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) return await res.json();
    return await res.text();
  } catch (err) {
    console.error('Falha na chamada da API:', {
      url: fullPath,
      method: opts.method,
      message: err?.message || err,
    });
    throw err;
  }
}

export const get = (path) => request(path, { method: 'GET' });
export const post = (path, body) => request(path, { method: 'POST', body });
export const put = (path, body) => request(path, { method: 'PUT', body });
export const del = (path) => request(path, { method: 'DELETE' });

// AUTH
export const apiLogin = (email, senha, tipo) => post('/auth/login', { email, senha, tipo });

// ADMIN / AREAS
export const apiGetAreas = () => get('/areas');
export const apiAddArea = (nomeArea) => post('/areas', { nome: nomeArea });
export const apiDeleteArea = (idArea) => del(`/areas/${idArea}`);

// VAGAS
export const apiCreateVaga = (vagaData) => post('/api/vaga', vagaData);
export const apiGetVagas = () => get('/api/vaga');
export const apiGetVagasPorInteresse = (areas) => post('/api/vaga/interesses', { areas });
export const apiDeleteVaga = (idVaga) => del(`/api/vaga/${idVaga}`);

// INSCRICOES (CANDIDATURAS)
export const apiCreateInscricao = (vagaId, estudanteId) => post('/api/inscricao', { vagaId, estudanteId });
export const apiGetInscricoesByEstudante = (estudanteId) => get(`/api/inscricao/estudante/${estudanteId}`);
export const apiGetInscricoesByVaga = (vagaId) => get(`/api/inscricao/vaga/${vagaId}`);
export const apiCheckInscricaoExists = (vagaId, estudanteId) => get(`/api/inscricao/check?vagaId=${vagaId}&estudanteId=${estudanteId}`);
export const apiDeleteInscricao = (inscricaoId) => del(`/api/inscricao/${inscricaoId}`);


// CANDIDATOS
export const apiGetCandidato = (id) => get(`/api/candidato/${id}`);
export const apiUpdateCandidato = (id, data) => put(`/api/candidato/${id}`, data);
export const apiCreateCandidato = (data) => post('/api/candidato', data);
export const apiGetCandidatos = () => get('/api/candidato');
export const apiDeleteCandidato = (id) => del(`/api/candidato/${id}`);

// EMPRESAS
export const apiGetEmpresa = (id) => get(`/api/empresa/${id}`);
export const apiUpdateEmpresa = (id, data) => put(`/api/empresa/${id}`, data);
export const apiCreateEmpresa = (data) => post('/api/empresa', data);
export const apiGetEmpresas = () => get('/api/empresa');
export const apiDeleteEmpresa = (id) => del(`/api/empresa/${id}`);
// LOGIN EMPRESAS / CANDIDATOS
export const apiLoginEmpresa = (email, senha) => post('/auth/login/empresa', { email, senha });
export const apiLoginCandidato = (email, senha) => post('/auth/login/candidato', { email, senha });
// LOGOUT
export const apiLogout = () => post('/auth/logout');
// USUÁRIO ATUAL
export const apiGetCurrentUser = () => get('/auth/me');
// STATS
export const apiGetStats = () => get('/api/stats');
// WEBSOCKET URL
export function getWebSocketUrl(path = '/ws') {
  const baseWsUrl = 'http://localhost:8080'; // default fallback
  const fullBase = BASE_URL || baseWsUrl;
  const wsProtocol = fullBase.startsWith('https') ? 'wss' : 'ws';
  const urlObj = new URL(fullBase);
  return `${wsProtocol}://${urlObj.host}${path}`;
}