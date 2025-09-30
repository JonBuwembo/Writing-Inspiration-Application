import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './shared/global.js';
import { AuthProvider } from './auth/authProvider.jsx';
import { GoogleOAuthProvider} from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        {/* <GoogleOAuthProvider clientId='173883313635-hsemcl9nabi5vgvk57ltbokjbepjufgl.apps.googleusercontent.com'> */}
          <App />
        {/* </GoogleOAuthProvider> */}
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
