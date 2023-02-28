<script setup lang="ts">
/*
お気に入りの書籍の表示 
axios取得
v-for
*/

import { ref, onMounted } from "vue";
import axios from "axios";
import { useLogin } from "../hooks/useLogin";

const loginUser = useLogin();
const userData = ref<number | null | any>();
onMounted(async () => {
  await axios
    .get(`http://127.0.0.1:8000/users?username=${loginUser.value}`)
    .then(
      (res) => (
        console.log(res.data[0]), (userData.value = res.data[0].favBooks)
      )
    );
  console.log(userData.value);
});
</script>
<template>
  <h1>favbooks</h1>
  <div v-for="fav in userData" :key="fav.title" class="flex justify-center">
    <div class="thumbnail">
      <!-- 画像がある場合   -->
      <img v-if="fav.thumbnail && fav.thumbnail" :src="fav.thumbnail" />
      <!-- 画像がない場合 -->
      <img v-if="!fav.thumbnail" src="../images/noImages.png" />
    </div>
    <div class="fav-text w-72 ml-4">
      <div>{{ fav.title }}</div>
      <div class="flex justify-center">
          <div
            v-for="author in fav.authors"
            :key="fav.id"
            class="m-1"
          >
            {{ author }}
          </div>
        </div>
    </div>
  </div>
</template>
