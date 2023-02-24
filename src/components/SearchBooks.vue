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
  value: any;
  id: string;
  volumeInfo: VolumeInfo;
}

const url = "https://www.googleapis.com/books/v1/volumes?&maxResults=20&q=";
const searchText = ref(""); // 検索欄value
const searchResults = ref<Book[]>([]); // 検索結果を格納
// UI Strick
const resultNull = ref(false); // 検索0件表示
const searchPending = ref(false); // 検索中
const searchError = ref(false); // 検索エラー

// 検索ボタン押下
const searchBooks = async () => {
  searchPending.value = true; // 検索中
  searchResults.value = []; // resultリセット
  resultNull.value = false; // 検索0件リセット
  try {
    await axios
      .get(`${url}intitle:${searchText.value}`)
      // https://qiita.com/stella0270/items/8fdd2efcdd9db96a5c4d
      .then((response) => (searchResults.value = response.data.items));
    searchPending.value = false; // 検索終了
    searchError.value = false;   // エラー表記リセット
    if (searchResults.value == undefined) {
      resultNull.value = true; // 検索0件表示
    } else {
      resultNull.value = false;
    }
  } catch (error) {
    searchPending.value = false; // 検索終了
    searchError.value = true;
  }
};
// お気に入り機能
const keepBooks = (uni: VolumeInfo) => {
  console.log(uni.title);
  // ユーザーIDのデータに書籍情報を挿入
};
</script>

<template>
  <label for="">書籍検索</label>
  <div>
    <input type="text" v-model="searchText" />
    <button @click="searchBooks" class="p-1 bg-teal-400 rounded-lg">
      検索
    </button>

    <p v-if="searchPending">検索中</p>
    <p v-if="searchError">エラーが発生しました。</p>
    <p v-if="resultNull">検索結果はありません。他のワードで検索してみてね。</p>

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
          <div
            v-for="author in result.volumeInfo.authors"
            :key="result.id"
            class="m-1"
          >
            {{ author }}
          </div>
        </div>
        <div>
          <button
            @click="keepBooks(result.volumeInfo)"
            class="p-1 m-1 bg-teal-400 rounded-lg"
          >
            キープ
          </button>
          <button class="p-1 m-1 bg-teal-400 rounded-lg">読んだ</button>
        </div>
      </div>
    </div>
    <!-- 検索結果 -->

    <!-- 
      UI Stack
      - 検索結果なし
      - 検索中(グレーアウト？)
      - 結果表示
      - 検索結果０件
    -->
  </div>
</template>

<style scoped>
img {
  max-width: 128px;
}
</style>
