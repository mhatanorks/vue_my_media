<script setup lang="ts">
import Login from "../components/Login.vue";
import SearchBooks from "../components/SearchBooks.vue";
import { useLogin } from "../hooks/useLogin";
import { ref } from "vue";
import FavBooks from "../components/FavBooks.vue";

const loginUser = useLogin();
const activeButton = ref("button1");

function showInfo(buttonName: any) {
  activeButton.value = buttonName;
}
</script>

<template>
  <!-- ログインしてたら -->
  <section v-if="loginUser">
    <p class="p-8 text-xl">welcome!!</p>
    <div>
      <!-- タブ切り替え -->
      <button
        @click="showInfo('button1')"
        class="p-2 m-2 bg-teal-400 rounded-lg"
      >
        My Books
      </button>
      <button
        @click="showInfo('button2')"
        class="p-2 m-2 bg-teal-400 rounded-lg"
      >
        書籍検索
      </button>

      <!-- My Books -->
      <div v-if="activeButton === 'button1'">
      <p>My Books</p>
      <FavBooks />
      </div>

      <!-- SearchBooks -->
      <div v-if="activeButton === 'button2'">
        <SearchBooks />
      </div>
    </div>
  </section>


  <!-- ログインしてなかったら -->
  <section v-else>
    <Login />
  </section>
</template>
