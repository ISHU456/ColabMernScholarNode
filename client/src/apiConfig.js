// Central API Configuration Node
// This allows the platform to switch between local development and production (Render) automatically.

const getApiUrl = () => {
  // Priority 1: Environment variable from Vite build
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Priority 2: Automatic detection for Render deployments
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    if (hostname.includes('scholarmatrixdeployment-client.onrender.com')) {
      return 'https://scholarmatrixdeployment-server.onrender.com';
    }
    
    if (hostname.includes('onrender.com')) {
      // General case for other Render names
      return window.location.origin.replace('-client', '-server');
    }
  }

  // Priority 3: Local development fallback
  return 'http://localhost:5001';
};

const API_URL = getApiUrl();

export default API_URL;
