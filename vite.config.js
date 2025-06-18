import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Thermometa2/', // <--- ADD THIS LINE!
  plugins: [react()],
})