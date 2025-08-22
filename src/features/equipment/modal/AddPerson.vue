<script lang="ts" setup>
import { useStore } from "@/entities";
import { ref } from "vue";
import Loader from "@/share/components/Loader.vue";

const store = useStore();
const emits = defineEmits(["closeModal"]);

const loader = ref(false);
const payload = ref({
  firstName: null as string | null,
  lastName: null as string | null,
  surName: null as string | null,
  position: null as string | null,
});

const existRecord = localStorage.getItem("new_person");

if (existRecord) payload.value = JSON.parse(existRecord);

function clear() {
  payload.value.firstName = null;
  payload.value.lastName = null;
  payload.value.surName = null;
  payload.value.position = null;
}

function addPerson() {
  loader.value = true;
  localStorage.setItem("new_person", JSON.stringify(payload.value));
  store
    .dispatch("personal/CREATE_PERSON", payload.value)
    .then(async () => {
      loader.value = false;
      localStorage.removeItem("new_person");
      await store.dispatch("personal/GET_PERSON_LIST");
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
  emits("closeModal", "personalId");
}
</script>

<template>
  <div class="add-person">
    <Loader v-if="loader" />
    <form @submit.prevent="addPerson" v-else>
      <h1>Добавление сотрудника</h1>
      <label for="person_firstName">
        Имя
        <input type="text" v-model="payload.firstName" id="person_firstName" required pattern="[\.\sа-яА-Я]{2,}" />
      </label>
      <label for="person_lastName">
        Фамилия
        <input type="text" v-model="payload.lastName" id="person_lastName" required pattern="[\.\sа-яА-Я]{2,}" />
      </label>
      <label for="person_surName">
        Отчество
        <input type="text" v-model="payload.surName" id="person_surName" required pattern="[\.\sа-яА-Я]{2,}" />
      </label>
      <label for="person_position">
        Должность
        <input type="text" v-model="payload.position" id="person_position" required pattern="[\.\sа-яА-Я]{2,}" />
      </label>
      <div>
        <button type="submit">Добавить</button>
        <button @click="clear">Очистить</button>
        <button @click="close">Закрыть</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.add-person {
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
