/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
import UnpluginSvgComponent from 'unplugin-svg-component/vite'
import { fileURLToPath, URL } from "node:url";
import { join } from 'node:path'
import {compression, defineAlgorithm, tarball} from 'vite-plugin-compression2';
import VueDevTools from 'vite-plugin-vue-devtools';
import ConfigPlugin from "unplugin-config/vite";
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import MetaLayouts from "vite-plugin-vue-meta-layouts";
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig(({ command,mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // console.log(command)
  
  return {
    build:{
      cssMinify: false,
      minify: false,

      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: false,
      //     drop_debugger: true,
      //     pure_funcs: ["console.log"]
      //   },
      //   format: {
      //     /** 删除注释 */
      //     comments: false
      //   }
      // },

    },
    base: env['VITE_PUBLIC_PATH'],
    resolve: {
      alias:{
        // '@': fileURLToPath(new URL('./src', import.meta.url)),
        "@": pathSrc,
        '~': path.resolve(__dirname, './'),
      }
      // alias: [
      //   {
      //     find: '@',
      //     replacement: pathSrc
      //   },
      //   // resolve warning of vue-i18n
      //   {
      //     find: 'vue-i18n',
      //     replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
      //   }
      // ]
    },
    server: {
      open: false,
      sourcemap: false,
      cors: true,
      strictPort: false,
      proxy: {
        '/api': {
          target: env['VITE_APP_DEV_WEB_URL'],
          changeOrigin: true, //是否允许跨域
          //将/api路径去掉
          rewrite: (p) => p.replace(/^\/api/, ''),
        },
        '/static':{}
      }
    },
  plugins: [
    MetaLayouts(
      {
        target: "src/layouts", // 布局目录，默认 src/layouts
        defaultLayout: "default", // 默认布局，默认为 default
        importMode: "sync", // 加载模式，支持 sync 和 async。默认为自动处理，SSG 时为 sync，非 SSG 时为 async
        skipTopLevelRouteLayout: true, // 打开修复 https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/134，默认为 false 关闭
        excludes: [], // 排除路径，仅接受 glob
      }
    ),
    VueRouter({
      dts: path.resolve(pathSrc, 'types', 'typed-router.d.ts'),
      routesFolder: path.resolve(pathSrc, 'pages'),
    }),
    Vue(),
    VueDevTools(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue","vue-router","pinia",'@vueuse/core',{
        lodash: [
          ['round','_round'],
          ['camelCase','_camelCase'],
        ]
      },
        {
          axios: [
            ['default', 'axios'], // import { default as axios } from 'axios',
            'AxiosResponse',
            'AxiosError',
            'AxiosRequestConfig'
          ],
        },

      ],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      vueTemplate: true,
      dirs: [
        './src/composables/**',
        // './src/utils/**',
      ],
      dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'),
    }),

    Icons({
      autoInstall: true,
      compiler: 'vue3',
      scale: 1.2,
      defaultStyle: '',
      defaultClass: 'unplugin-icon'
    }),



    UnpluginSvgComponent({
      iconDir: [fileURLToPath(new URL("./src/assets/svg", import.meta.url))],
      dts: true,
      dtsDir: "./src/types",
      prefix: "local",
      symbolIdFormatter: (svgName: string, prefix: string): string => {
          const nameArr = svgName.split('/')
          if (prefix)
            nameArr.unshift(prefix)
          const finalName = nameArr.join('-').replace(/\.svg$/, '')
          //console.log(finalName)
          return finalName;
        },
    }),
   Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        // ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, 'types', 'components.d.ts'),
    }),
    Inspect(),
    // compression({ threshold: 1024 }),
    compression({
      deleteOriginalAssets: false,
      algorithms: [
        'gzip',
        // 'brotliCompress',
        // 'zstd',
        // defineAlgorithm('deflate', { level: 9 })
      ],
      threshold: 1000 // Only compress files larger than 1KB
    }),
    ConfigPlugin({}),

    mockDevServerPlugin({
      // prefix: '^/api-dev/',
      // wsPrefix: ['/socket.io'],
      log: 'debug',
      reload: true,
      formidableOptions: {
        // 配置上传资源存放目录
        uploadDir: path.join(process.cwd(), '/uploads'),
      },
      build: false,
    }),


  ],
  // define 注入的变量， 在 mock文件中也可以使用
  define: {
    __IS_DEVELOPMENT__: JSON.stringify(mode === 'development'),
  }
  }
})
