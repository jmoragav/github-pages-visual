import { defineConfig ,searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// https://vitejs.dev/config/
export default defineConfig({
 
  plugins: [react(),
  ],
  base:"/github-pages-visual/",

  
 
  optimizeDeps: {
	esbuildOptions: {
		// Node.js global to browser globalThis
		define: {
			global: 'globalThis'
		},
		// Enable esbuild polyfill plugins
		plugins: [
			NodeGlobalsPolyfillPlugin({
				buffer: true
			})
		]
	}
}

, 
resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
}	
})
