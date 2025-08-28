<script lang="ts" setup>
import { useStore } from "@/entities";
import { ErrorRender } from "@/widgets";
import { onMounted, ref } from "vue";
import { Navigation } from "@/widgets";

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
    <div class="container__content-wrp">
      <Navigation />
      <main class="main">
        <router-view />
      </main>
    </div>
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
  &__content-wrp {
    display: flex;
    height: 100%;
    flex-wrap: wrap;
  }
}
.main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
}
.footer {
  display: flex;
}
</style>
