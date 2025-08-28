<script lang="ts" setup>
import { features } from "@/features";
import { DefineComponent, ref } from "vue";

const action = ref<DefineComponent<any, any, any, any> | null>(null);

const actions = ref([
  {
    name: "Оборудование",
    component: features.AddEquipment,
  },
  {
    name: "Сотрудника",
    component: features.AddPerson,
  },
  {
    name: "Кабинет",
    component: features.AddCabinet,
  },
]);
</script>

<template>
  <div class="home__actions">
    <CButton v-for="(a, i) in actions" :key="i" @click="action = a.component">{{ a.name }}</CButton>
  </div>
  <div v-if="action" class="home__component">
    <component :is="action" @closeModal="action = null"></component>
  </div>
</template>
