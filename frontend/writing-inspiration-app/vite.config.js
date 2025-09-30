import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import path from 'path';

/*

File Purpose:

  - customize vite's behavior in your project
  - specifically tell vite to look for localhost5432 for api backend requests.
  - configures development server proxy --> using server port!
  - allows react frontend, running on one port, to communicate with backend API operating on a diff port.

*/

dotenv.config({path: path.resolve(__dirname, '../../backend/database/.env')})
//debugging to see if the env variable can be read from here
const port = process.env.SERVER_PORT;
console.log('Loaded SERVER_PORT:', process.env.SERVER_PORT);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
    {
      fastRefresh: false,
    }
  )],

  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.SERVER_PORT}`, //backend database port url. process requests from here.
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/,'/api'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying request:', req.url);
          });

          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received response for:', req.url);
          });

          proxy.on('error', (err, req, res) => {
            console.error('Proxy error for request:', req.url, err);
          });
        }

      },


      // headers: {
      //   "Cross-Origin-Opener-Policy": "unsafe-none",
      //   "Cross-Origin-Opener-Policy": "same-origin",
      // },
    
    },
  },
});

// This Configuration file instructs react HOW to run the application.
