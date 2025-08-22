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
    SET_LIST(state, payload: Equipments.Equipment[]) {
      state.list = payload
    },
    ADD_EQUIPMENT(state, payload: Equipments.Equipment) {
      state.list.push(payload)
    },
    DELETE_EQUIPMENT(state, payload: { id: number }) {
      state.list = state.list.filter(p => p.id !== payload.id)
    }
  },
  actions: {
    GET_EQUIPMENT_LIST({ commit }) {
      return new Promise((resolve, reject) => {
        httpRequest("/equipments", "GET")
          .then((response) => {
            commit("SET_LIST", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    GET_EQUIPMENT_BY_ID({ }, id: number): Promise<Equipments.Equipment> {
      return new Promise((resolve, reject) => {
        httpRequest<Equipments.Equipment>(`/equipments?${new URLSearchParams({ id: id.toString() })}`, "GET")
          .then((response) => resolve(response))
          .catch(error => reject(error))
      })
    },
    CREATE_EQUIPMENT({ commit, state }, payload: Equipments.Equipment) {
      return new Promise((resolve, reject) => {
        httpRequest<Equipments.Equipment>("/equipments", "POST", payload)
          .then((response) => {
            commit("ADD_EQUIPMENT", response)
            return resolve(state.list.find(p => p.id === response.id))
          })
          .catch(error => reject(error))
      })
    },
    UPDATE_EQUIPMENT({ commit }, payload: { id: number } & Partial<Equipments.Equipment>) {
      return new Promise((resolve, reject) => {
        httpRequest("/equipments", "POST", payload)
          .then((response) => {
            commit("ADD_EQUIPMENT", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    DELETE_EQUIPMENT({ commit }, payload: { id: number }) {
      return new Promise((resolve, reject) => {
        httpRequest("/equipments", "DELETE", payload)
          .then((response) => {
            commit("DELETE_EQUIPMENT", response)
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