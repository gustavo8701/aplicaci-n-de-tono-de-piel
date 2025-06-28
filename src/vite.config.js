import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Añadimos esta sección para solucionar el error "React is not defined"
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
})