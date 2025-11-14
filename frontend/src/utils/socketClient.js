// src/socketClient.js
export function resolveBackendWsUrl(path = '/ws') {
  if (process.env.REACT_APP_API_URL) {
    try {
      const u = new URL(process.env.REACT_APP_API_URL);
      const proto = u.protocol === 'https:' ? 'wss' : 'ws';
      const host = u.hostname + (u.port ? `:${u.port}` : '');
      return `${proto}://${host}${path}`;
    } catch (e) {
      console.warn('REACT_APP_API_URL inválido para websocket:', e);
    }
  }

  if (typeof window !== 'undefined' && window.location.hostname.endsWith('.app.github.dev')) {
    const host = window.location.hostname;
    const backendHost = host.includes('-10000') ? host.replace('-10000', '-8080') : host;
    const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
    return `${proto}://${backendHost}${path}`;
  }

  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return `${proto}://${window.location.host}${path}`;
}

export function createAppSocket(path = '/ws') {
  const url = resolveBackendWsUrl(path);
  console.log('INIT app WS ->', url);
  return new WebSocket(url);
}
