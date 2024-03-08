import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import presetEnvPlugin from 'postcss-preset-env';
import compression from 'vite-plugin-compression'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd());

  const { VITE_BUILD_COMPRESS } = env
  const compressPlugin = []
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(',')
    if (compressList.includes('gzip')) {
      compressPlugin.push(
        compression({
          ext: '.gz',
          deleteOriginFile: false
        })
      )
    }
    if (compressList.includes('brotli')) {
      compressPlugin.push(
        compression({
          ext: '.br',
          algorithm: 'brotliCompress',
          deleteOriginFile: false
        })
      )
    }
  }

  return {
    base: './',
    server: {
      port: 5777,
      host: true,
      open: false,
      proxy: {
        '/api': {
          // 此处修改为你自己的开发环境地址
          target: 'http://www.example.com:8080',
          changeOrigin: true,
          rewrite: (p: string) => p.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '~': resolve(__dirname, './')
      }
    },
    css: {
      postcss: {
        plugins: [
          presetEnvPlugin()
        ]
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia'
        ],
        resolvers: [ElementPlusResolver()],
        dts: false
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ...compressPlugin,
    ],

  }
})
