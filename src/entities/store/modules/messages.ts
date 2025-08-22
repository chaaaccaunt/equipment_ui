import { Module } from "vuex";
import { RootStore } from "..";

export interface iMessagesStore {
  intervalStarted: boolean
  list: Messages.Message[];
}

const characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
function getStr(len: number) {
  let res = ""
  for (let i = 0; i < len; i++) {
    res += characters[Math.floor(Math.random() * characters.length)]
  }
  return res
}

export const messages: Module<iMessagesStore, RootStore> = {
  namespaced: true,
  state: {
    intervalStarted: false,
    list: []
  },
  mutations: {
    PUSH_MESSAGE(state, payload: { message: string, type: "error" | "warn" | "info" }) {
      state.list.push({
        message: payload.message,
        type: payload.type,
        timestamp: Date.now(),
        hold: false,
        uid: `${getStr(8)}-${getStr(4)}-${getStr(4)}-${getStr(20)}`
      })
    },
    STATE_MESSAGE(state, { action, uid }: { action: "del" | "hold", uid: string }) {
      const index = state.list.findIndex(m => m.uid === uid)
      if (index === -1) return
      switch (action) {
        case "hold": {
          state.list[index].hold = true
          break
        }
        case "del": {
          state.list.splice(index, 1)
          break
        }
        default: {
          break
        }
      }
    },
    SET_MESSAGES_AS_READED(state) {
      let interval = setInterval(() => {
        state.list.forEach((m, index) => {
          if (m.hold) return
          if (Date.now() - m.timestamp > 3500) state.list.splice(index, 1)
        });
        if (!state.list.length) {
          state.intervalStarted = false
          return clearInterval(interval)
        }
        const holdMessagesCount = state.list.filter(m => m.hold)
        if (holdMessagesCount.length === state.list.length) {
          state.intervalStarted = false
          return clearInterval(interval)
        }
      }, 500)
    },
  },
  actions: {
    DELETE_MESSAGE({ commit }, uid: string) {
      commit("STATE_MESSAGE", { action: "del", uid })
    },
    HOLD_MESSAGE({ commit }, uid: string) {
      commit("STATE_MESSAGE", { action: "hold", uid })
    },
    PUSH_MESSAGE({ state, commit }, payload: { message: string, type: "error" | "warn" | "info" }) {
      commit("PUSH_MESSAGE", payload)
      if (!state.intervalStarted) {
        state.intervalStarted = true
        commit("SET_MESSAGES_AS_READED")
      }
    }
  },
  getters: {
    GET_LIST(state) {
      return state.list
    }
  }
}