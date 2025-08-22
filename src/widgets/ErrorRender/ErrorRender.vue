<script lang="ts" setup>
import { useStore } from "@/entities";
import { computed } from "vue";

const store = useStore();

const messages = computed(() => store.getters["messages/GET_LIST"] as Messages.Message[]);

function holdMessage(uid: string) {
  store.dispatch("messages/HOLD_MESSAGE", uid);
}

function deleteMessage(uid: string) {
  store.dispatch("messages/DELETE_MESSAGE", uid);
}
</script>

<template>
  <div class="error-render">
    <div v-for="(m, i) in messages" :data-bottom="`${(i + 1) * 4}`" @mouseover="holdMessage(m.uid)" @click="deleteMessage(m.uid)">{{ m.message }}</div>
  </div>
</template>

<style lang="scss" scoped>
.error-render {
  width: 100%;
  position: relative;
  & div {
    position: absolute;
    right: 2em;
    bottom: attr(data-bottom em);
    padding: 1em;
    background-color: #636363;
    color: #fff;
    border-radius: 0.8em;
    animation: 0.5s linear 3s forwards alternate remove;
    transition: bottom 0.1s;
    cursor: pointer;
    &:hover {
      animation-play-state: paused;
      opacity: 1;
    }
  }
}

@keyframes remove {
  0% {
    // opacity: 1;
  }
  80% {
    right: -10em;
  }
  100% {
    opacity: 0;
  }
}
</style>
