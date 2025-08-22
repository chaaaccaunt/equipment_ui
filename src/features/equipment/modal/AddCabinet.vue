<script lang="ts" setup>
import { useStore } from "@/entities";
import { computed, ref, watch } from "vue";
import Loader from "@/share/components/Loader.vue";
import AddPerson from "./AddPerson.vue";

const store = useStore();
const emits = defineEmits(["closeModal"]);
const state = ref(false);

const loader = ref(false);
const payload = ref({
  number: null as string | null,
  responsibleId: null as string | null,
});

const existRecord = localStorage.getItem("new_cabinet");

if (existRecord) payload.value = JSON.parse(existRecord);

const personalList = computed(() => store.getters["personal/GET_LIST"] as Personal.Person[]);

function clear() {
  payload.value.number = null;
  payload.value.responsibleId = null;
}

function addCabinet() {
  loader.value = true;
  localStorage.setItem("new_cabinet", JSON.stringify(payload.value));
  store
    .dispatch("cabinets/CREATE_CABINET", { number: payload.value.number?.toString(), responsibleId: payload.value.responsibleId })
    .then(async () => {
      loader.value = false;
      localStorage.removeItem("new_cabinet");
      await store.dispatch("cabinets/GET_CABINET_LIST");
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
  if (typeof newValue.responsibleId === "undefined") {
    state.value = true;
  }
});

function close() {
  emits("closeModal", "cabinetId");
}
</script>

<template>
  <div class="add-cabinet">
    <Loader v-if="loader" />
    <form @submit.prevent="addCabinet" v-else>
      <h1>Добавление кабинета</h1>
      <p>
        <label for="cab_number">
          Номер кабинета
          <input type="number" v-model="payload.number" id="cab_number" required pattern="[0-9]{1,}" />
        </label>
      </p>
      <p>
        <select v-model="payload.responsibleId">
          <option :value="null" disabled>Выберите сотрудника</option>
          <option v-for="p in personalList" :key="p.id" :value="p.id">{{ p.shortName }}</option>
          <option :value="undefined">Добавить сотрудника</option>
        </select>
      </p>
      <div>
        <button type="submit">Добавить</button>
        <button @click="clear">Очистить</button>
        <button @click="close">Закрыть</button>
      </div>
    </form>
    <div class="add-cabinet__modal" v-if="state">
      <AddPerson @close-modal="state = false" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-cabinet {
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
