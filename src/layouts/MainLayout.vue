<script lang="ts" setup>
import { ErrorRender } from "@/widgets";
</script>

<template>
  <div class="container">
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
