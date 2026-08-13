import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base:"/Goa_Project/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Listen on all network interfaces (0.0.0.0) so mobile phones on Wi-Fi can connect
    port: 5173,
     allowedHosts: true,
  },
});
