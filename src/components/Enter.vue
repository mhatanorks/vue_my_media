<!-- 
機能
ユーザー登録
inputデータをDBに送信 
-->

<script setup lang="ts">
import { ref } from "vue";
// defineProps<{ msg: string }>();

let userName = ref("");
let email = ref("");
let password = ref("");

const entryUser = (e: any) => {
  e.preventDefault();
  console.log(email.value);
  // db送信
  // 遷移
};
</script>

<template>
  <h3>Entry Form</h3>
  <form action="">
    <div>
      <label for="">登録名<input type="text" v-model="userName" /></label>
    </div>
    <div>
      <label for="">メールアドレス<input type="text" v-model="email" /></label>
    </div>
    <div>
      <label for="">パスワード<input type="text" v-model="password" /></label>
    </div>
    <div>
      <button @click="entryUser" class="p-3 bg-teal-400 rounded-lg">
        登録
      </button>
    </div>
  </form>
  <p>{{ userName }}:{{ email }}:{{ password }}</p>
</template>

<style scoped></style>
