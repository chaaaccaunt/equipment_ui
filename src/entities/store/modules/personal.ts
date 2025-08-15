import { Module } from "vuex";
import { RootStore } from "..";
import { httpRequest } from "@/libs";

export interface iPersonalStore {
  list: Personal.Person[]
}

export const Personal: Module<iPersonalStore, RootStore> = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    ADD_PERSON(state, payload: Personal.Person) {
      state.list.push(payload)
    }
  },
  actions: {
    CREATE_PERSON({ commit }, payload: Personal.Person) {
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