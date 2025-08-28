<script lang="ts" setup>
import { ref } from "vue";

const links = ref([
  {
    name: "Главная",
    to: "/",
  },
  {
    name: "Оборудование",
    to: "/equipments",
  },
  {
    name: "Добавить",
    to: "/add",
  },
]);
</script>

<template>
  <aside class="aside">
    <ul>
      <li v-for="(r, i) in links" :key="i">
        <router-link :to="r.to">{{ r.name }}</router-link>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
.aside {
  & ul {
    margin: 2em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding-inline-start: 0;
    & li {
      list-style-type: none;
    }
  }
}
</style>
