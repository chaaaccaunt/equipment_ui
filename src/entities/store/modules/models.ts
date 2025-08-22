import { Module } from "vuex";
import { RootStore } from "..";
import { httpRequest } from "@/libs";

export interface iModelsStore {
  list: iModels.Model[]
}

export const models: Module<iModelsStore, RootStore> = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    SET_LIST(state, payload: iModels.Model[]) {
      state.list = payload
    },
    ADD_MODEL(state, payload: iModels.Model) {
      state.list.push(payload)
    },
    DELETE_MODEL(state, payload: { id: number }) {
      state.list = state.list.filter(p => p.id !== payload.id)
    }
  },
  actions: {
    GET_MODEL_LIST({ commit }) {
      return new Promise((resolve, reject) => {
        httpRequest("/models", "GET")
          .then((response) => {
            commit("SET_LIST", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    GET_MODEL_BY_ID({ }, id: number): Promise<iModels.Model> {
      return new Promise((resolve, reject) => {
        httpRequest<iModels.Model>(`/models?${new URLSearchParams({ id: id.toString() })}`, "GET")
          .then((response) => resolve(response))
          .catch(error => reject(error))
      })
    },
    CREATE_MODEL({ commit, state }, payload: iModels.Model) {
      return new Promise((resolve, reject) => {
        httpRequest<iModels.Model>("/models", "POST", payload)
          .then((response) => {
            commit("ADD_MODEL", response)
            return resolve(state.list.find(p => p.id === response.id))
          })
          .catch(error => reject(error))
      })
    },
    UPDATE_MODEL({ commit }, payload: { id: number } & Partial<iModels.Model>) {
      return new Promise((resolve, reject) => {
        httpRequest("/models", "PUT", payload)
          .then((response) => {
            commit("ADD_EQUIPMENT", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    DELETE_MODEL({ commit }, payload: { id: number }) {
      return new Promise((resolve, reject) => {
        httpRequest("/models", "DELETE", payload)
          .then((response) => {
            commit("DELETE_MODEL", response)
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