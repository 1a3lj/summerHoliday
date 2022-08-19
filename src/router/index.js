import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Management from '../views/Management.vue'
import ManagerLogin from '../views/ManagerLogin.vue'
import Login from '../views/Login.vue'
import UserRegister from '../views/UserRegister.vue'
import center from '../views/center.vue'
import UserManagement from '../views/UserManagement.vue'
import Whole from '../views/whole.vue'
import Index from '../components/index.vue'

import SalesExpect from '../views/SalesExpect.vue'
import SalesArea from '../views/SalesArea.vue'
import SalesTarget from '../views/SalesTarget.vue'
import SalesCom from '../views/SalesCom.vue'
import TargetCom from '../views/TargetCom.vue'
import PriceCom from '../views/PriceCom.vue'
import OilCom from '../views/OilCom.vue'
import HeatMap from '../views/MyMap.vue'

const routes = [
  {
    path: '/',
    name: 'center',
    component: center,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/index',
    name:'Index',
    component:Index
  },
  {
    path: '/login',
    name:'Login',
    component:Login
  },
  {
    path: '/userregister',
    name:'UserRegister',
    component:UserRegister
  },
  {
    path: '/usermanagement',
    name:'UserManagement',
    component:UserManagement
  },
  {
    path: '/management',
    name:'Management',
    component:Management
  },
  {
    path: '/managerLogin',
    name:'ManagerLogin',
    component:ManagerLogin
  },
  {
    path:'/whole',
    name:'Whole',
    component: Whole
  },
  {
    path: '/salesExpect',
    name: 'SalesExpect',
    component: SalesExpect
  },
  {
    path: '/salesArea',
    name: 'SalesArea',
    component: SalesArea
  },
  {
    path: '/salesTarget',
    name: 'SalesTarget',
    component: SalesTarget
  },
  {
    path: '/salesCom',
    name: 'SalesCom',
    component: SalesCom
  },
  {
    path: '/oilCom',
    name: 'OilCom',
    component: OilCom
  },
  {
    path: '/priceCom',
    name: 'PriceCom',
    component: PriceCom
  },
  {
    path: '/targetCom',
    name: 'TargetCom',
    component: TargetCom
  },
  {
    path: '/map',
    name: 'HeatMap',
    component: HeatMap
  }
  
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
