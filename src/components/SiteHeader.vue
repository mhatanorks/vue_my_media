<!-- 
機能

ナビメニュー
ユーザーネーム
-->

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useLogin } from "../hooks/useLogin";

const loginUser = useLogin();

const router = useRouter();
const route = useRoute();
const logoutUser = async () => {
  localStorage.clear();
  location.reload();
  //   await router.push("/");
};
</script>

<template>
  <header class="flex justify-between">
    <p class="text-3xl">logo</p>
    <nav class="flex">
      <button class="p-2 m-2 bg-teal-50 rounded-lg">
        <RouterLink to="/">Home</RouterLink>
      </button>
      <button class="p-2 m-2 bg-teal-50 rounded-lg">
        <RouterLink to="/about">About</RouterLink>
      </button>
      <button class="p-2 m-2 bg-teal-50 rounded-lg">
        <RouterLink to="/anonymous">異次元</RouterLink>
      </button>

      <p v-if="loginUser" class="pt-4">
        {{ loginUser }}
      </p>
      <button
        v-if="loginUser"
        class="p-2 m-2 bg-teal-50 rounded-lg"
        @click="logoutUser"
      >
        ログアウト
      </button>
      <div v-else>v-else</div>
    </nav>
  </header>
</template>

<style scoped>
header {
  background: #7bd1c4;
  height: 60px;
}
</style>
