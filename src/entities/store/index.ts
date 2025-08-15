import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { equipments, iEquipmentStore } from './modules/equipments'
import { cabinets, iCabinetsStore } from './modules/cabinets'

export interface RootStore {
  equipments: iEquipmentStore
  cabinets: iCabinetsStore
}

export const key: InjectionKey<Store<RootStore>> = Symbol()

export const store = createStore<RootStore>({
  modules: {
    equipments,
    cabinets
  }
})

export function useStore() {
  return baseUseStore(key)
}