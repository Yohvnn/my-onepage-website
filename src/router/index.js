import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ToolboxHub from '../views/ToolboxHub.vue'
import ToolboxIndex from '../views/ToolboxIndex.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/toolbox',
    component: ToolboxHub,
    children: [
      {
        path: '',
        name: 'Toolbox',
        component: ToolboxIndex
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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
