import { Module } from "vuex";
import { RootStore } from "..";
import { httpRequest } from "@/libs";

export interface iCabinetsStore {
  list: Cabinets.Cabinet[]
}

export const cabinets: Module<iCabinetsStore, RootStore> = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    ADD_CABINET(state, payload: Cabinets.Cabinet) {
      state.list.push(payload)
    }
  },
  actions: {
    CREATE_CABINET({ commit }, payload: Cabinets.Cabinet) {
      return new Promise((resolve, reject) => {
        httpRequest("/cabinets", "POST", payload)
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