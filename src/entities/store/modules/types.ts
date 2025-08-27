import { Module } from "vuex";
import { RootStore } from "..";
import { httpRequest } from "@/libs";

export interface iTypesStore {
  list: iTypes.iType[]
}

export const types: Module<iTypesStore, RootStore> = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    SET_LIST(state, payload: iTypes.iType[]) {
      state.list = payload
    },
    ADD_TYPE(state, payload: iTypes.iType) {
      state.list.push(payload)
    },
    DELETE_TYPE(state, payload: { id: number }) {
      state.list = state.list.filter(p => p.id !== payload.id)
    }
  },
  actions: {
    GET_TYPES_LIST({ commit }) {
      return new Promise((resolve, reject) => {
        httpRequest("/types", "GET")
          .then((response) => {
            commit("SET_LIST", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    GET_TYPE_BY_ID({ }, id: number): Promise<iTypes.iType> {
      return new Promise((resolve, reject) => {
        httpRequest<iTypes.iType>(`/types?${new URLSearchParams({ id: id.toString() })}`, "GET")
          .then((response) => resolve(response))
          .catch(error => reject(error))
      })
    },
    CREATE_TYPE({ commit, state }, payload: iTypes.iType) {
      return new Promise((resolve, reject) => {
        httpRequest<iTypes.iType>("/types", "POST", payload)
          .then((response) => {
            commit("ADD_TYPE", response)
            return resolve(state.list.find(p => p.id === response.id))
          })
          .catch(error => reject(error))
      })
    },
    UPDATE_TYPE({ commit }, payload: { id: number } & Partial<iTypes.iType>) {
      return new Promise((resolve, reject) => {
        httpRequest("/types", "PUT", payload)
          .then((response) => {
            commit("ADD_EQUIPMENT", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    DELETE_TYPE({ commit }, payload: { id: number }) {
      return new Promise((resolve, reject) => {
        httpRequest("/types", "DELETE", payload)
          .then((response) => {
            commit("DELETE_TYPE", response)
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