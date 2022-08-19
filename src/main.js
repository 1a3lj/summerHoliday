//import './plugins/axios'

import Ele from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './components/state.vue'

createApp(App).use(router).use(store).use(Ele).mount('#app')
