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
    SET_LIST(state, payload: Cabinets.Cabinet[]) {
      state.list = payload
    },
    ADD_CABINET(state, payload: Cabinets.Cabinet) {
      state.list.push(payload)
    },
    DELETE_CABINET(state, payload: { id: number }) {
      state.list = state.list.filter(p => p.id !== payload.id)
    }
  },
  actions: {
    GET_CABINET_LIST({ commit }) {
      return new Promise((resolve, reject) => {
        httpRequest("/cabinets", "GET")
          .then((response) => {
            commit("SET_LIST", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    GET_CABINET_BY_ID({ }, id: number): Promise<Cabinets.Cabinet> {
      return new Promise((resolve, reject) => {
        httpRequest<Cabinets.Cabinet>(`/cabinets?${new URLSearchParams({ id: id.toString() })}`, "GET")
          .then((response) => resolve(response))
          .catch(error => reject(error))
      })
    },
    CREATE_CABINET({ commit, state }, payload: Cabinets.Cabinet) {
      return new Promise((resolve, reject) => {
        httpRequest<Cabinets.Cabinet>("/cabinets", "POST", payload)
          .then((response) => {
            commit("ADD_CABINET", response)
            return resolve(state.list.find(p => p.id === response.id))
          })
          .catch(error => reject(error))
      })
    },
    UPDATE_CABINET({ commit }, payload: { id: number } & Partial<Cabinets.Cabinet>) {
      return new Promise((resolve, reject) => {
        httpRequest("/cabinets", "PUT", payload)
          .then((response) => {
            commit("ADD_EQUIPMENT", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    DELETE_CABINET({ commit }, payload: { id: number }) {
      return new Promise((resolve, reject) => {
        httpRequest("/cabinets", "DELETE", payload)
          .then((response) => {
            commit("DELETE_CABINET", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    }
  },
  getters: {
    GET_LIST(state) {
      return state.list
    }
  }
}