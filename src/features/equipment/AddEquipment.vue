<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, integer, helpers } from "@vuelidate/validators";
import AddCabinet from "./modal/AddCabinet.vue";
import AddModel from "./modal/AddModel.vue";
import AddPeron from "./modal/AddPeron.vue";
import { useStore } from "@/entities";

const store = useStore();

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
  personalId: { required: helpers.withMessage("Выберите ответственного", required), integer },
  inventoryNumber: {},
  serialNumber: {},
}));

const v$ = useVuelidate(rules, payload);

function create() {
  store.state.equipments.list;
  v$.value
    .$validate()
    .then((valid) => {
      if (!valid) return;
      store.dispatch("equipments/CREATE_EQUIPMENT", payload.value);
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <div class="equipment">
    <form @submit.prevent="create">
      <div>
        <p>
          <select v-model="payload.cabinetId">
            <option :value="null" disabled>Выберите кабинет</option>
            <option :value="undefined">Добавить кабинет</option>
          </select>
          <span v-if="v$.cabinetId.$errors.length">{{ v$.cabinetId.$errors[0].$message }}</span>
          <span v-else>&nbsp;</span>
        </p>
        <p>
          <select v-model="payload.modelId">
            <option :value="null" disabled>Выберите модель</option>
            <option :value="undefined">Добавить модель</option>
          </select>
          <span v-if="v$.modelId.$errors.length">{{ v$.modelId.$errors[0].$message }}</span>
          <span v-else>&nbsp;</span>
        </p>
        <p>
          <select v-model="payload.personalId">
            <option :value="null" disabled>Выберите сотрудника</option>
            <option :value="undefined">Добавить сотрудника</option>
          </select>
          <span v-if="v$.personalId.$errors.length">{{ v$.personalId.$errors[0].$message }}</span>
          <span v-else>&nbsp;</span>
        </p>
        <p>
          <input type="text" v-model="payload.serialNumber" />
          <span v-if="v$.serialNumber.$error">{{ v$.serialNumber.errors[0] }}</span>
          <span v-else>&nbsp;</span>
        </p>
        <p>
          <input type="text" v-model="payload.inventoryNumber" />
          <span v-if="v$.inventoryNumber.error">{{ v$.inventoryNumber.errors[0] }}</span>
          <span v-else>&nbsp;</span>
        </p>
      </div>
      <button type="submit">Добавить</button>
    </form>
    <div class="equipment__modals">
      <AddCabinet />
      <AddModel />
      <AddPeron />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.equipment {
  position: relative;
  display: flex;
  justify-content: center;
  width: calc(100% - 19px);
  & form {
    width: 20%;
    & p {
      display: flex;
      flex-direction: column;
    }
  }
  &__modals {
    position: absolute;
    background-color: #000;
  }
}
</style>
