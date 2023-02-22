<!-- 
機能
Google Books APIs
本の検索、表示
-->

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

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
interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

const url = "https://www.googleapis.com/books/v1/volumes?&maxResults=20&q=";
const searchText = ref("");
const searchResults = ref<Book[]>([]);
const searchPending = ref(false); // 検索中
const searchError = ref(false); // 検索エラー

const searchBooks = async () => {
  searchPending.value = true; // 検索中
  try {
    await axios
      .get(`${url}intitle:${searchText.value}`)
      .then((response) => (searchResults.value = response.data.items));
    searchPending.value = false; // 検索終了
    searchError.value = false;
  } catch (error) {
    searchPending.value = false; // 検索終了
    searchError.value = true;
  }
};
const keepBooks = (uni: VolumeInfo) => {
  console.log(uni.title)
  // ユーザーIDの
}
</script>

<template>
  <div>
    <label for="">書籍検索</label>
    <input type="text" v-model="searchText" />
    <button @click="searchBooks" class="p-1 bg-teal-400 rounded-lg">
      検索
    </button>

    <p v-if="searchPending">検索中</p>
    <p v-if="searchError">エラーが発生しました。</p>
    <!-- 検索結果 -->
    <div
      v-for="result in searchResults"
      :key="result.id"
      class="flex justify-center"
    >
      <div>
        <!-- 画像がある場合   -->
        <img
          v-if="
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.smallThumbnail
          "
          :src="result.volumeInfo.imageLinks.smallThumbnail"
        />
        <!-- 画像がない場合 -->
        <img
          v-if="!result.volumeInfo.imageLinks"
          src="../images/noImages.png"
        />
      </div>

      <div>
        <div>
          {{ result.volumeInfo.title }}
        </div>
        <div>
          {{ result.volumeInfo.publishedDate }}
        </div>
        <div class="flex">
          <div v-for="author in result.volumeInfo.authors" :key="result.id" class="m-1">
            {{ author }}
          </div>
        </div>
        <div>
          <button @click="keepBooks(result.volumeInfo)" class="p-1 m-1 bg-teal-400 rounded-lg">キープ</button>
          <button class="p-1 m-1 bg-teal-400 rounded-lg">読んだ</button>
        </div>
      </div>
    </div>
    <!-- 検索結果 -->
  </div>

  <!-- UI Stack
          - 検索結果なし
          - 検索中(グレーアウト？)
          - 結果表示
          - 検索結果０件 -->
</template>

<style scoped>
img {
  max-width: 128px;
}
</style>
