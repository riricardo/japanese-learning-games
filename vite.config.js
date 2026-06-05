import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = 'japanese-learning-games';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? `/${repositoryName}/` : '/',
}));
