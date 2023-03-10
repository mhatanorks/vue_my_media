<script setup lang="ts">
import Login from "../components/Login.vue";
import { useLogin } from "../hooks/useLogin";
import { ref } from "vue";
import FavBooks from "../components/FavBooks.vue";
import RecordBooks from "../components/RecordBooks.vue";
import { useTabStore } from "../stores/ProductStore";

const loginUser = useLogin();
const store = useTabStore();

const checked = store.checked;
const unchecked = store.unchecked;

console.log(store.checked);
</script>

<template>
  <!-- ログインしてたら -->
  <section v-if="loginUser">
    <div class="mb-32">
      <!-- タブ切り替え -->
      <button
        @click="store.changeTab('button1')"
        :class="store.viewActive ? checked : unchecked"
      >
        My Records
      </button>
      <button
        @click="store.changeTab('button2')"
        :class="store.viewActive ? unchecked : checked"
      >
        fav Books
      </button>

      <!-- My Books -->
      <div v-if="store.activeButton === 'button1'">
        <RecordBooks />
      </div>

      <!-- SearchBooks -->
      <div v-if="store.activeButton === 'button2'">
        <FavBooks />
      </div>
    </div>
  </section>

  <!-- ログインしてなかったら -->
  <section v-else>
    <Login />
  </section>
</template>
