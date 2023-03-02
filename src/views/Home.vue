<script setup lang="ts">
import Login from "../components/Login.vue";
import SearchBooks from "../components/SearchBooks.vue";
import { useLogin } from "../hooks/useLogin";
import { ref } from "vue";
import FavBooks from "../components/FavBooks.vue";
import RecordBooks from "../components/RecordBooks.vue";

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
    <div class="mb-32">
      <!-- タブ切り替え -->
      <button
        @click="showInfo('button1')"
        class="p-2 m-2 bg-teal-400 rounded-lg"
      >
        My Records
      </button>
      <button
        @click="showInfo('button2')"
        class="p-2 m-2 bg-teal-400 rounded-lg"
      >
        fav Books
      </button>

      <!-- My Books -->
      <div v-if="activeButton === 'button1'">
      <RecordBooks />
    </div>
    
    <!-- SearchBooks -->
    <div v-if="activeButton === 'button2'">
      <FavBooks />
      </div>
    </div>
  </section>


  <!-- ログインしてなかったら -->
  <section v-else>
    <Login />
  </section>
</template>
