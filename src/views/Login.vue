<script lang="ts" setup>
import { computed, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { httpRequest } from "@/libs";
import { useRouter } from "vue-router";

const router = useRouter();

const payload = ref<{ login: string | null; password: string | null }>({
  login: null,
  password: null,
});

const rules = computed(() => ({
  login: { required, minLength: minLength(2) },
  password: { required, minLength: minLength(4) },
}));

const v$ = useVuelidate(rules, payload);

function login() {
  v$.value
    .$validate()
    .then((valid) => {
      if (!valid) return;
      httpRequest("/authorization/login", "POST", payload.value)
        .then(() => router.push({ name: "Home" }))
        .catch((error) => {});
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <div class="login">
    <form class="form" @submit.prevent="login">
      <h2>Авторизация</h2>
      <input type="text" placeholder="Логин" v-model="payload.login" />
      <input type="password" placeholder="Пароль" v-model="payload.password" />
      <button type="submit" class="login_btn">Войти</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  text-align: center;
  & h2 {
    margin: 0;
  }
}
</style>
