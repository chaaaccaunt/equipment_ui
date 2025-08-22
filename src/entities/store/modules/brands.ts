import { Module } from "vuex";
import { RootStore } from "..";
import { httpRequest } from "@/libs";

export interface iBrandsStore {
  list: Brands.Brand[]
}

export const brands: Module<iBrandsStore, RootStore> = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    SET_LIST(state, payload: Brands.Brand[]) {
      state.list = payload
    },
    ADD_BRAND(state, payload: Brands.Brand) {
      state.list.push(payload)
    },
    DELETE_BRAND(state, payload: { id: number }) {
      state.list = state.list.filter(p => p.id !== payload.id)
    }
  },
  actions: {
    GET_BRANDS_LIST({ commit }) {
      return new Promise((resolve, reject) => {
        httpRequest("/brands", "GET")
          .then((response) => {
            commit("SET_LIST", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    GET_BRAND_BY_ID({ }, id: number): Promise<Brands.Brand> {
      return new Promise((resolve, reject) => {
        httpRequest<Brands.Brand>(`/brands?${new URLSearchParams({ id: id.toString() })}`, "GET")
          .then((response) => resolve(response))
          .catch(error => reject(error))
      })
    },
    CREATE_BRAND({ commit, state }, payload: Brands.Brand) {
      return new Promise((resolve, reject) => {
        httpRequest<Brands.Brand>("/brands", "POST", payload)
          .then((response) => {
            commit("ADD_BRAND", response)
            return resolve(state.list.find(p => p.id === response.id))
          })
          .catch(error => reject(error))
      })
    },
    UPDATE_BRAND({ commit }, payload: { id: number } & Partial<Brands.Brand>) {
      return new Promise((resolve, reject) => {
        httpRequest("/brands", "PUT", payload)
          .then((response) => {
            commit("ADD_EQUIPMENT", response)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    DELETE_BRAND({ commit }, payload: { id: number }) {
      return new Promise((resolve, reject) => {
        httpRequest("/brands", "DELETE", payload)
          .then((response) => {
            commit("DELETE_BRAND", response)
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