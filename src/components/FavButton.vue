<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useLogin } from "../hooks/useLogin";
import { DeleteFavBooks } from "../hooks/deleteFav";

const loginUser = useLogin();

defineProps<{ result: any }>();

interface ImageLinks {
  smallThumbnail: string;
}
interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  imageLinks: ImageLinks;
}

const favCheck = ref(true); // お気に入り

// お気に入り機能
const favBooks = async (uni: VolumeInfo) => {
  favCheck.value = false;
  const userData = ref<number | null | any>();
  await axios
    .get(`http://127.0.0.1:8000/users?username=${loginUser.value}`)
    .then((res) => (console.log(res.data[0]), (userData.value = res.data[0])));
  const newFavBook = {
    title: uni.title,
    authors: uni.authors,
    thumbnail: uni.imageLinks.smallThumbnail,
    delete: false,
  };
  userData.value.favBooks.push(newFavBook);
  // ユーザーIDのデータに書籍情報を挿入
  await axios.put(
    `http://127.0.0.1:8000/users/${userData.value.id}`,
    userData.value
  );
};
</script>

<template>
  <button
    v-if="favCheck"
    @click="favBooks(result.volumeInfo)"
    class="p-2 m-1 bg-teal-400 rounded-lg"
  >
    ♡
  </button>
  <button
    v-else
    @click="DeleteFavBooks(result.volumeInfo, loginUser)"
    class="p-2 m-1 bg-rose-500 rounded-lg"
  >
    ♡
  </button>
</template>
