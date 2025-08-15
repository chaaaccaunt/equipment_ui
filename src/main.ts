import { createApp } from 'vue'
import { store, key, router } from "@/entities"
import App from './App.vue'

import './registerServiceWorker'

const app = createApp(App)

app.use(store, key)
app.use(router)
app.mount('#app')
