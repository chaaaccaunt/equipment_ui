<script lang="ts" setup>
import { useStore } from "@/entities";
import { computed, ref } from "vue";
import Loader from "@/share/components/Loader.vue";

const store = useStore();
const emits = defineEmits(["closeModal"]);

const loader = ref(false);
const payload = ref({
  name: null as string | null,
});

const existRecord = localStorage.getItem("new_brand");

if (existRecord) payload.value = JSON.parse(existRecord);

function clear() {
  payload.value.name = null;
}

function addPerson() {
  loader.value = true;
  localStorage.setItem("new_brand", JSON.stringify(payload.value));
  store
    .dispatch("brands/CREATE_BRAND", payload.value)
    .then(async () => {
      loader.value = false;
      localStorage.removeItem("new_brand");
      await store.dispatch("brands/GET_BRANDS_LIST");
      clear();
      close();
    })
    .catch((error) => {
      store.dispatch("messages/PUSH_MESSAGE", { type: "error", message: error });
      loader.value = false;
      close();
    });
}

function close() {
  emits("closeModal");
}
</script>

<template>
  <div class="add-brands">
    <Loader v-if="loader" />
    <form @submit.prevent="addPerson" v-else>
      <h1>Добавление производителя</h1>
      <p>
        <label for="_brand-name">
          Имя
          <input type="text" v-model="payload.name" id="_brand-name" required pattern="[а-яА-Яa-zA-Z]{2,}" />
        </label>
      </p>
      <div>
        <button type="submit">Добавить</button>
        <button @click="clear">Очистить</button>
        <button @click="close">Закрыть</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.add-brands {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  z-index: 3;
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
}
</style>
