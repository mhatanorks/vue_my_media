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

  const item = JSON.parse(localStorage.getItem("login") ?? '{"user":[]}');

  if (location.href === "http://localhost:5173/") {
    location.reload();
  } else {
    loginUser.value = null;
    router.push("/");
    // loginUser.value = item.user;
  }
};
</script>

<template>
  <header class="flex justify-between">
    <p
      class="text-3xl tracking-tightest font-thin italic mt-3 ml-5 sm:text-2xl sm:mt-4 sm:ml-3"
    >
      MYBOOKSRECORDER
    </p>
    <nav class="flex">
      <p
        v-if="loginUser"
        class="pt-4 font-bold text-xl sm:text-base sm:pt-5"
        test-data="username"
      >
        🌞 Hello {{ loginUser }} !! 🌞
      </p>
      <button
        v-if="loginUser"
        class="p-2 m-2 bg-teal-50 rounded-lg"
        @click="logoutUser"
      >
        Logout
      </button>
      <div v-else></div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  background: #7bd1c4;
  height: 60px;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
