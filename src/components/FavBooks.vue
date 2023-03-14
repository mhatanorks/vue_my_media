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
}

interface Users {
  favBooks: Book;
}

const loginUser = useLogin();
const userData = ref<number | null | any>();

const Loading = async () => {
  await axios
    .get(`http://127.0.0.1:8000/users?username=${loginUser.value}`)
    .then(
      (res) =>
        // console.log(res.data[0]), (userData.value = res.data[0].favBooks)
        (console.log(res.data[0]),userData.value = res.data[0].favBooks.filter(
          (e: Book) => e.delete == false
        ))
    );
  console.log(userData.value[0]);
};

onMounted(() => {
  Loading();
});

const clickDelete = async (fav: any) => {
  DeleteFavBooks(fav, loginUser.value);
  await Loading();
  location.reload();
};
</script>
<template>
  <p data-test="fav-stocks"></p>
  <div
    data-test="favorite-book"
    v-for="fav in userData"
    :key="fav.title"
    class="flex justify-center"
  >
    <div class="thumbnail">
      <!-- 画像がある場合   -->
      <img v-if="fav.thumbnail && fav.thumbnail" :src="fav.thumbnail" />
      <!-- 画像がない場合 -->
      <img v-if="!fav.thumbnail" src="../images/noImages.png" />
    </div>
    <div class="fav-text w-72 ml-4">
      <div data-test="fav-title">{{ fav.title }}</div>
      <div class="flex justify-center">
        <div v-for="author in fav.authors" :key="fav.id" class="m-1">
          {{ author }}
        </div>
      </div>
      <div class="buttons">
        <button
          @click="clickDelete(fav)"
          class="p-2 m-1 bg-rose-500 rounded-lg"
        >
          ♡
        </button>
        <button class="p-2 m-1 bg-amber-500 rounded-lg">
          <a
            :href="`https://www.amazon.co.jp/s?k=${fav.title}&i=stripbooks&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=20Z9KH2B14U9V&sprefix=${fav.title}stripbooks%2C154&ref=nb_sb_noss`"
            target="_blank"
            rel="noopener noreferrer"
            >amazon</a
          >
        </button>
        <RecordButton :fav="fav" />
      </div>
    </div>
  </div>
</template>
