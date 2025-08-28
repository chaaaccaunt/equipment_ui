<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, integer, helpers } from "@vuelidate/validators";
import { useStore } from "@/entities";
import AddCabinet from "./modal/AddCabinet.vue";
import AddModel from "./modal/AddModel.vue";
import AddPerson from "./modal/AddPerson.vue";

const store = useStore();
const selectedModal = ref<"cabinet" | "model" | "person" | null>(null);
const load = ref(true);
const responsibility = ref(false);
const emits = defineEmits(["closeModal"]);

const personalList = computed(() => store.getters["personal/GET_LIST"] as Personal.Person[]);
const cabinetList = computed(() => store.getters["cabinets/GET_LIST"] as Cabinets.Cabinet[]);
const modelsList = computed(() => store.getters["models/GET_LIST"] as iModels.Model[]);

const modals = computed(() => {
  if (selectedModal.value === null) return;
  const list = {
    cabinet: AddCabinet,
    model: AddModel,
    person: AddPerson,
  };
  return list[selectedModal.value];
});

const payload = ref<Equipments.CreatePayload>({
  cabinetId: null,
  modelId: null,
  personalId: null,
  inventoryNumber: null,
  serialNumber: null,
});

const rules = computed(() => ({
  cabinetId: { required: helpers.withMessage("Выберите кабинет", required), integer },
  modelId: { required: helpers.withMessage("Выберите модель оборудования", required), integer },
  personalId: {},
  inventoryNumber: {},
  serialNumber: {},
}));

const v$ = useVuelidate(rules, payload);

function clear() {
  Object.entries(payload.value).forEach(([k, v]) => (payload.value[k as keyof typeof payload.value] = null));
}

function create() {
  v$.value
    .$validate()
    .then((valid) => {
      if (!valid) return;
      store
        .dispatch("equipments/CREATE_EQUIPMENT", payload.value)
        .then(() => {
          store.dispatch("equipments/GET_EQUIPMENT_LIST");
          clear();
        })
        .catch((error) => {
          store.dispatch("messages/PUSH_MESSAGE", { type: "error", message: error });
        });
    })
    .catch((error) => {
      store.dispatch("messages/PUSH_MESSAGE", { type: "error", message: error });
    });
}

function closeModal(key: keyof Equipments.CreatePayload) {
  selectedModal.value = null;
  payload.value[key] = null;
}

watch(payload.value, (newValue) => {
  Object.entries(newValue).forEach(([key, value]) => {
    if (typeof value === "undefined") {
      if (key === "cabinetId") {
        selectedModal.value = "cabinet";
      } else if (key === "modelId") {
        selectedModal.value = "model";
      } else if (key === "personalId") {
        selectedModal.value = "person";
      }
    }
  });
});

function close() {
  emits("closeModal", "personalId");
}

onMounted(async () => {
  await store.dispatch("personal/GET_PERSON_LIST");
  await store.dispatch("cabinets/GET_CABINET_LIST");
  await store.dispatch("models/GET_MODEL_LIST");
  load.value = false;
});
</script>

<template>
  <Loader v-if="load"></Loader>
  <div class="equipment" v-else>
    <form @submit.prevent="create">
      <h1>Добавление оборудования</h1>
      <div>
        <p>
          <select v-model="payload.cabinetId">
            <option :value="null" disabled>Выберите кабинет</option>
            <option v-for="c in cabinetList" :key="c.id" :value="c.id">{{ `№${c.number} ${c.responsible ? c.responsible : ""}` }}</option>
            <option :value="undefined">Добавить кабинет</option>
          </select>
          <span v-if="v$.cabinetId.$errors.length">{{ v$.cabinetId.$errors[0].$message }}</span>
          <span v-else>&nbsp;</span>
        </p>
        <p>
          <select v-model="payload.modelId" required>
            <option :value="null" disabled>Выберите оборудование</option>
            <option v-for="p in modelsList" :key="p.id" :value="p.id">{{ p.name }}</option>
            <option :value="undefined">Добавить оборудование</option>
          </select>
          <span v-if="v$.modelId.$errors.length">{{ v$.modelId.$errors[0].$message }}</span>
          <span v-else>&nbsp;</span>
        </p>
        <p>
          <input type="text" v-model="payload.serialNumber" />
          <span v-if="v$.serialNumber.$error">{{ v$.serialNumber.errors[0] }}</span>
          <span v-else>&nbsp;</span>
        </p>
        <p>
          <input type="text" v-model="payload.inventoryNumber" pattern="[]{}" />
          <span v-if="v$.inventoryNumber.error">{{ v$.inventoryNumber.errors[0] }}</span>
          <span v-else>&nbsp;</span>
        </p>
        <p>
          <label for="_responsibility"
            >Назначить ответственного
            <input type="checkbox" id="_responsibility" v-model="responsibility" />
          </label>
        </p>
        <p v-if="responsibility">
          <select v-model="payload.personalId">
            <option :value="null" disabled>Выберите сотрудника</option>
            <option v-for="p in personalList" :key="p.id" :value="p.id">{{ p.shortName }}</option>
            <option :value="undefined">Добавить сотрудника</option>
          </select>
          <span v-if="v$.personalId.$errors.length">{{ v$.personalId.$errors[0].$message }}</span>
          <span v-else>&nbsp;</span>
        </p>
      </div>
      <div>
        <button type="submit">Добавить</button>
        <button @click="clear">Очистить</button>
        <button @click="close">Закрыть</button>
      </div>
    </form>
    <div class="equipment__modals" v-if="selectedModal">
      <component :is="modals" @closeModal="closeModal"></component>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.equipment {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  & form {
    width: 20%;
    & p {
      display: flex;
      flex-direction: column;
    }
  }
  &__modals {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: #00000041;
  }
}
</style>
