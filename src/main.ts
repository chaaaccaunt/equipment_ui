import { createApp } from 'vue'
import { store, key, router } from "@/entities"
import App from './App.vue'

import './registerServiceWorker'
import { uiElements } from './share/components'

const app = createApp(App)

uiElements.forEach((el) => {
  const file = el.__file!.split("/")
  const name = file[file.length - 1].split(".")[0]
  app.component(name, el)
})

app.use(store, key)
app.use(router)
app.mount('#app')
