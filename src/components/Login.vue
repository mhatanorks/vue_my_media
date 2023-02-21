<!-- 
機能
db接続
-->

<script setup lang="ts">
import { ref } from "vue";
// defineProps<{ msg: string }>();

let email = ref("");
let password = ref("");

const loginUser = (e: any) => {
  e.preventDefault();
  console.log(email.value);
  // db照会
  // 遷移
};
</script>

<template>
  <h3>Login Form</h3>
  <form action="">
    <div>
      <label for="">メールアドレス<input type="text" v-model="email" /></label>
    </div>
    <div>
      <label for="">パスワード<input type="text" v-model="password" /></label>
    </div>
    <div>
      <button @click="loginUser" class="p-3 bg-teal-400 rounded-lg">
        登録
      </button>
    </div>
  </form>
  <p>{{ email }}:{{ password }}</p>
  
</template>

<style scoped></style>
