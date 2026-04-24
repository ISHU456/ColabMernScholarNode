import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css'
import App from './App.jsx'
import API_URL from './apiConfig';

// Make API_URL globally available for easier access in legacy components
window.API_URL = API_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
