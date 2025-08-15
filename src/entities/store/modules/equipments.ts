import { Module } from "vuex";
import { RootStore } from "..";
import { httpRequest } from "@/libs";

export interface iEquipmentStore {
  list: Equipments.Equipment[]
}

export const equipments: Module<iEquipmentStore, RootStore> = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    ADD_EQUIPMENT(state, payload: Equipments.Equipment) {
      state.list.push(payload)
    }
  },
  actions: {
    CREATE_EQUIPMENT({ commit }, payload: Equipments.CreatePayload) {
      return new Promise((resolve, reject) => {
        httpRequest("/equipments", "POST", payload)
          .then((response) => {
            commit("ADD_EQUIPMENT", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    }
  },
  getters: {}
}