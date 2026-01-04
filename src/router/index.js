import { createRouter, createWebHistory } from 'vue-router'
import StudioHome from '../views/StudioHome.vue'
import HomePage from '../views/HomePage.vue'
import ToolboxHub from '../views/ToolboxHub.vue'
import GalleryView from '../views/GalleryView.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: StudioHome,
    meta: { title: 'Studio — Home', description: 'Overview of tools, gallery, and studio updates.' }
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: GalleryView,
    meta: { title: 'Studio — Gallery', description: 'Photo gallery and latest shoots.' }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { title: 'Studio — About', description: 'About the studio, services, and contact.' }
  },
  {
    path: '/resume',
    name: 'Resume',
    component: HomePage
  },
  {
    path: '/tools',
    component: ToolboxHub,
    children: [
      {
        path: '',
        name: 'Tools',
        component: ToolboxHub
      },
      {
        path: 'pdf',
        name: 'PdfTools',
        component: () => import('tool_pdf/PdfTools'),
        meta: { toolName: 'PDF Tools', toolId: 'pdf' }
      },
      {
        path: 'tictactoe',
        name: 'TicTacToe',
        component: () => import('tool_tictactoe/TicTacToe'),
        meta: { toolName: 'Tic Tac Toe', toolId: 'tictactoe' }
      },
      {
        path: 'flipcoin',
        name: 'FlipCoin',
        component: () => import('tool_flipcoin/FlipCoin'),
        meta: { toolName: 'Flip Coin', toolId: 'flipcoin' }
      }
    ]
  }
  , { path: '/toolbox', redirect: '/tools' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Simple SEO: set document title from route meta
router.beforeEach((to, from, next) => {
  const title = to.meta?.title || 'Studio'
  if (typeof document !== 'undefined') {
    document.title = title
  }
  next()
})

export default router
