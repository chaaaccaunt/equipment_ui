<script lang="ts" setup>
import { useStore } from "@/entities";
import { ErrorRender } from "@/widgets";
import { onMounted, ref } from "vue";

const store = useStore();
const loader = ref(false);

onMounted(() => {
  store
    .dispatch("equipments/GET_EQUIPMENT_LIST")
    .then(() => {
      loader.value = true;
    })
    .catch((error) => {});
});
</script>

<template>
  <Loader v-if="!loader"></Loader>
  <div class="container" v-else>
    <header></header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <ErrorRender />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.footer {
  display: flex;
}
</style>
