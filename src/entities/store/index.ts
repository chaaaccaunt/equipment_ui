import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { equipments, iEquipmentStore } from './modules/equipments'
import { cabinets, iCabinetsStore } from './modules/cabinets'
import { personal, iPersonalStore } from './modules/personal'
import { messages, iMessagesStore } from './modules/messages'
import { brands, iBrandsStore } from './modules/brands'
import { models, iModelsStore } from './modules/models'
import { iTypesStore, types } from './modules/types'

export interface RootStore {
  equipments: iEquipmentStore
  cabinets: iCabinetsStore
  personal: iPersonalStore
  messages: iMessagesStore
  brands: iBrandsStore
  models: iModelsStore
  types: iTypesStore
}

export const key: InjectionKey<Store<RootStore>> = Symbol()

export const store = createStore<RootStore>({
  modules: {
    equipments,
    cabinets,
    personal,
    messages,
    brands,
    models,
    types
  }
})

export function useStore() {
  return baseUseStore(key)
}