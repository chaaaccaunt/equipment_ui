<script lang="ts" setup>
import { computed } from "vue";
import MainLayout from "./layouts/MainLayout.vue";
import { useRoute } from "vue-router";
import LoginLayout from "./layouts/LoginLayout.vue";

const layouts = {
  main: MainLayout,
  auth: LoginLayout,
};
const route = useRoute();

const layout = computed(() => layouts[route.meta.layout]);
</script>

<template>
  <component :is="layout"></component>
</template>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
