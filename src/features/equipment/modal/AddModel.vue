<script lang="ts" setup>
import { useStore } from "@/entities";
import { computed, onMounted, ref, watch } from "vue";
import Loader from "@/share/components/Loader.vue";
import AddBrand from "./AddBrand.vue";
import AddType from "./AddType.vue";

const store = useStore();
const emits = defineEmits(["closeModal"]);
const state = ref<null | "brand" | "type">(null);

const loader = ref(false);
const payload = ref({
  name: null as string | null,
  brandId: null as string | null,
  typeId: null as string | null,
});

const existRecord = localStorage.getItem("new_model");

if (existRecord) payload.value = JSON.parse(existRecord);

const components = {
  brand: AddBrand,
  type: AddType,
};

const modals = computed(() => {
  if (state.value === null) return;
  return components[state.value];
});

const brandsList = computed(() => store.getters["brands/GET_LIST"] as Brands.Brand[]);
const typeList = computed(() => store.getters["types/GET_LIST"] as iTypes.iType[]);

function clear() {
  payload.value.name = null;
  payload.value.brandId = null;
  payload.value.typeId = null;
}

function addCabinet() {
  loader.value = true;
  localStorage.setItem("new_model", JSON.stringify(payload.value));
  store
    .dispatch("models/CREATE_MODEL", payload.value)
    .then(async () => {
      loader.value = false;
      localStorage.removeItem("new_model");
      await store.dispatch("models/GET_MODEL_LIST");
      clear();
      close();
    })
    .catch((error) => {
      store.dispatch("messages/PUSH_MESSAGE", { type: "error", message: error });
      loader.value = false;
      close();
    });
}

watch(payload.value, (newValue) => {
  if (typeof newValue.brandId === "undefined") {
    state.value = "brand";
  } else if (typeof newValue.typeId === "undefined") {
    state.value = "type";
  }
});

function close() {
  emits("closeModal", "modelId");
}

function closeSubModal() {
  state.value = null;
  payload.value.brandId = null;
}

onMounted(async () => {
  await store.dispatch("brands/GET_BRANDS_LIST");
});
</script>

<template>
  <div class="add-model">
    <Loader v-if="loader" />
    <form @submit.prevent="addCabinet" v-else>
      <h1>Добавление оборудования</h1>
      <p>
        <label for="cab_number">
          Название модели
          <input type="text" v-model="payload.name" id="cab_number" required pattern="[a-zA-Zа-яА-Я0-9]{1,}" />
        </label>
      </p>
      <p>
        <select v-model="payload.typeId">
          <option :value="null" disabled>Выберите тип оборудования</option>
          <option v-for="p in typeList" :key="p.id" :value="p.id">{{ p.name }}</option>
          <option :value="undefined">Добавить тип</option>
        </select>
      </p>
      <p>
        <select v-model="payload.brandId">
          <option :value="null" disabled>Выберите производителя</option>
          <option v-for="p in brandsList" :key="p.id" :value="p.id">{{ p.name }}</option>
          <option :value="undefined">Добавить производителя</option>
        </select>
      </p>
      <div>
        <button type="submit">Добавить</button>
        <button @click="clear">Очистить</button>
        <button @click="close">Закрыть</button>
      </div>
    </form>
    <div class="add-model__modal" v-if="state">
      <component :is="modals" @closeModal="closeSubModal"></component>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-model {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  position: relative;
  & form {
    padding: 2em;
    width: 20%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: #fff;
    border-radius: 0.8em;
    text-align: center;
    & label {
      display: flex;
      flex-direction: column;
    }
    & div {
      display: flex;
      justify-content: space-around;
    }
    & button {
      display: block;
    }
  }
  &__modal {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: #00000041;
  }
}
</style>
