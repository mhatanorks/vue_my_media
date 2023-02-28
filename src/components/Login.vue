<!-- 
機能
db接続
-->

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import Enter from "./Enter.vue";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

const email = ref("");
const password = ref("");
const loginError = ref(false); // ログインエラー
const catchError = ref(false); // サーバーエラー
const showModal = ref(false); // 登録モーダル

const loginUser = async (e: any) => {
  e.preventDefault();
  const data = ref<User | null>();
  // db照会
  try {
    await axios
      .get(
        `http://127.0.0.1:8000/users?email=${email.value}&password=${password.value}`
      )
      .then((res) => (console.log(res), (data.value = res.data[0])));
    console.log(data.value);
    if (data.value) {
      console.log("login");
      // localstrage付与
      localStorage.setItem(
        "login",
        JSON.stringify({ user: data.value.username })
      );
      // 遷移
      location.reload();
    } else {
      loginError.value = true;
    }
  } catch (error) {
    catchError.value = true;
    console.log(error);
  }
};
</script>

<template>
  <div class="login-form">
    <p>Login Form</p>
    <form action="">
      <div>
        <label for=""
          >メールアドレス<input type="text" v-model="email"
        /></label>
      </div>
      <div>
        <label for="" class="tracking-custom"
          >パスワード<input type="text" v-model="password"
        /></label>
      </div>
      <div>
        <button @click="loginUser" class="p-3 mt-4 bg-teal-400 rounded-lg">
          ログイン
        </button>
      </div>
    </form>
    <p v-if="loginError">該当ユーザーなし</p>
    <p v-if="catchError">サーバーエラーです。時間をおいてお試しください</p>

    <button
      id="show-modal"
      @click="showModal = true"
      class="p-3 mt-4 bg-teal-400 rounded-lg"
    >
      登録はこちら
    </button>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <Enter :show="showModal" @close="showModal = false" />
    </Teleport>
  </div>
</template>

<style scoped>
.login-form {
  font-size: 18px;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
input {
  width: 200px;
  height: 40px;
  border-radius: 12px;
  margin-left: 20px;
  padding-left: 20px;
}
</style>
