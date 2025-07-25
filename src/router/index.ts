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

import {createRouter, createWebHistory, createWebHashHistory, Router, RouteRecordRaw,NavigationGuardNext,RouteLocationNormalized} from 'vue-router';
// import overviewRoutes from './overview'
// import managementRoutes from './management'
// import detailRoutes from './detail'
// import swaggerRoutes from './swagger'
// import editorRoutes from './editor'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { setupLayouts } from "virtual:meta-layouts";


// const my_routes = [
//   {
//     path: '/',
//     name: 'main',
//     redirect: {
//       name: 'layout'
//     }
//   },
//   {
//     path: '/layout',
//     name: 'layout',
//     component: () => import('@/layout/index.vue'),
//     redirect: 'overview',
//     children: [
//       ...overviewRoutes,
//       ...managementRoutes,
//       ...detailRoutes,
//       ...swaggerRoutes,
//       ...editorRoutes
//     ]
//   }
// ]


const __routes = setupLayouts(routes).map(route => ({
  ...route,
  meta: {
    requireAuth: false,
    keepAlive: true,
    title: route.name || 'Default Title',
    ...route.meta
  }
}))

const router = createRouter({
  history: createWebHistory('/ui'),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
  // routes: routes,
  routes: __routes,
})

// router.beforeEach((to, from, next) => {
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {  

  if (to.meta.requireAuth) {
    next(`/login?redirect=${to.fullPath}`)
  } else {
    next();
  }


})

//Handle hot reload for routes (vue router unplugin)
if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
