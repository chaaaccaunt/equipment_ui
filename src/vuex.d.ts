import { Store } from 'vuex'
import { RootStore } from "./entities/store"
declare module 'vue' {
  interface ComponentCustomProperties {
    $store: Store<RootStore>
  }
}