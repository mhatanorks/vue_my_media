<!-- 
機能
ユーザー登録
inputデータをDBに送信 
-->
<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useLogin } from "../hooks/useLogin";

const props = defineProps({
  show: Boolean,
});

interface User {
  username: string;
  email: string;
  password: string;
}
// カスタムフック
const loginUser = useLogin();

const userName = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");

const entryUser = async (e: Event) => {
  e.preventDefault();
  const newUser: User = {
    username: userName.value,
    email: email.value,
    password: password.value,
  };
  // db送信
  await axios.post("http://127.0.0.1:8000/users", newUser);
  location.reload();
};
</script>

<template>
  <Transition name="modal">
    <!-- transitions css用name -->
    <section v-if="show" class="modal-mask">
      <div class="modal-container">
        <h3>Entry Form</h3>
        <form action="">
          <div>
            <label for="">登録名<input type="text" v-model="userName" /></label>
          </div>
          <div>
            <label for=""
              >メールアドレス<input type="text" v-model="email"
            /></label>
          </div>
          <div>
            <label for=""
              >パスワード<input type="password" v-model="password"
            /></label>
          </div>
          <div>
            <button
              type="button"
              class="modal-default-button p-3 m-1 bg-teal-400 rounded-lg"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button @click="entryUser" class="p-3 m-1 bg-teal-400 rounded-lg">
              登録
            </button>
          </div>
        </form>
        <h2>{{ loginUser }}</h2>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}
.modal-container {
  width: 284px;
  margin: auto;
  padding: 20px 30px;
  background-color: #e5f3f1;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  font-size: 18px;
  font-weight: 700;
}
input {
  width: 200px;
  height: 40px;
  border-radius: 12px;
  margin-left: 20px;
  padding-left: 20px;
}

/* フワッと現れる */
.modal-enter-from {
  opacity: 0;
}

/* フワッと消える */
.modal-leave-to {
  opacity: 0;
}

/* 現消時大きくなる */
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  /* -webkit-transform: scale(1.1); */
  transform: scale(1.1);
}
</style>
