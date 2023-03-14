<script setup lang="ts">
/*
お気に入りの書籍の表示 
axios取得
v-for

filter delete= false の書籍のみ
*/

import { ref, onMounted } from "vue";
import axios from "axios";
import { useLogin } from "../hooks/useLogin";
import { DeleteFavBooks } from "../hooks/deleteFav";
import RecordButton from "./RecordButton.vue";

interface Book {
  // Book型のプロパティを定義する
  title: string;
  author: string;
  thumbnail: string;
  delete: boolean;
  date: Date;
  Memo: string,
}

const loginUser = useLogin();
const userData = ref<number | null | any>();

const Loading = async () => {
  await axios
    .get(`http://127.0.0.1:8000/users?username=${loginUser.value}`)
    .then(
      (res) =>
        // console.log(res.data[0]), (userData.value = res.data[0].favBooks)
        (userData.value = res.data[0].recordBooks.filter(
          (e: Book) => e.delete == false
        ))
    );
};

onMounted(() => {
  Loading();
});

</script>
<template>
  <p data-test="rec-books"></p>
  <div v-for="fav in userData" :key="fav.title" class="flex justify-center">
    <div class="thumbnail w-32">
      <!-- 画像がある場合   -->
      <img v-if="fav.thumbnail && fav.thumbnail" :src="fav.thumbnail" />
      <!-- 画像がない場合 -->
      <img v-if="!fav.thumbnail" src="../images/noImages.png" />
    </div>
    <div class="fav-text w-72 ml-4">
      <div>{{ fav.title }}</div>
      <div class="flex justify-center">
        <div v-for="author in fav.authors" :key="fav.id" class="m-1">
          {{ author }}
        </div>
      </div>
      <div class="">
        記録日: {{ fav.date }}
      </div>
      <div class="">
        メモ: {{ fav.Memo }}
      </div>

    </div>
  </div>
</template>
