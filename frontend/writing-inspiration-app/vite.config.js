import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


/*

File Purpose:

  - customize vite's behavior in your project
  - specifically tell vite to look for localhost5432 for api backend requests.
  - configures development server proxy
  - allows react frontend, running on one port, to communicate with backend API operating on a diff port.

*/


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5432', //backend port url. process requests from here.
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/,'')
      },
    },
  },
});

// This Configuration file instructs react HOW to run the application.