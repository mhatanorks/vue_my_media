<!-- 
機能
Google Books APIs
本の検索、表示
-->

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useLogin } from "../hooks/useLogin";
import FavButton from "./FavButton.vue";
import LoadingSearch from "./LoadingSearch.vue";
import RecordButton from "./RecordButton.vue";
const loginUser = useLogin();

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
const isActiveSearchBox = ref(false); // 検索ボックススライド

// 検索ボタン押下
const searchBooks = async (e: Event) => {
  e.preventDefault();
  isActiveSearchBox.value = true;
  searchPending.value = true; // 検索中
  searchResults.value = []; // resultリセット
  resultNull.value = false; // 検索0件リセット
  try {
    await axios
      .get(`${url}intitle:${searchText.value}`)
      // https://qiita.com/stella0270/items/8fdd2efcdd9db96a5c4d
      .then((response) => (searchResults.value = response.data.items));
    searchPending.value = false; // 検索終了
    searchError.value = false; // エラー表記リセット
    console.log(searchResults.value[0]);
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
</script>

<template>
  <div
    class="search-contents"
    :class="{ isActiveSearchBox: isActiveSearchBox }"
  >
    <form>
      <input
        type="text"
        v-model="searchText"
        class="w-96 h-16 mx-3 rounded-lg border-4 border-teal-600 text-3xl p-2"
      />
      <button
        type="submit"
        @click="searchBooks"
        class="h-16 px-6 bg-teal-400 rounded-lg font-bold text-3xl"
      >
        検索
      </button>
    </form>

    <p v-if="searchError">エラーが発生しました。</p>
    <p v-if="resultNull">検索結果はありません。他のワードで検索してみてね。</p>
    <p v-if="searchPending">
      <LoadingSearch />
      <LoadingSearch />
      <LoadingSearch />
      <LoadingSearch />
      <LoadingSearch />
    </p>
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
          src="../images/Noimages.png"
        />
      </div>

      <div class="w-72 ml-4">
        <div>
          {{ result.volumeInfo.title }}
        </div>
        <div>
          {{ result.volumeInfo.publishedDate }}
        </div>
        <div class="flex justify-center">
          <div
            v-for="author in result.volumeInfo.authors"
            :key="result.id"
            class="m-1"
          >
            {{ author }}
          </div>
        </div>
        <div>
          <FavButton :result="result" />
          <!-- <button class="p-2 m-1 bg-teal-400 rounded-lg">レコード</button> -->
          <RecordButton :fav="result.volumeInfo"/>
          <button class="p-2 m-1 bg-amber-500 rounded-lg">
            <a
              :href="`https://www.amazon.co.jp/s?k=${result.volumeInfo.title}&i=stripbooks&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=20Z9KH2B14U9V&sprefix=${result.volumeInfo.title}stripbooks%2C154&ref=nb_sb_noss`"
              target="_blank"
              rel="noopener noreferrer"
              >amazon</a
            >
          </button>
        </div>
      </div>
    </div>

    <!-- 
    UI Stack
    - 検索結果なし
    - 検索中(グレーアウト？)
    - 結果表示
    - 検索結果０件
  --></div>
</template>

<style scoped lang="scss">
img {
  max-width: 128px;
}

.search-contents {
  position: relative;
  transition: all 0.4s;
  transform: translateY(33vh);
}
.isActiveSearchBox {
  transform: translateY(0);
  input {
    transition: all 0.4s;
    font-size: 1.125rem;
    line-height: 1.75rem;
    width: 18rem;
    height: 2.5rem;
    margin: 0 0.75rem;
    border: 2px solid rgb(13 148 136 / var(--tw-border-opacity));
  }
  button {
    transition: all 0.4s;
    line-height: 1.75rem;
    padding: 0 0.5rem;
    height: 2.5rem;
    font-size: 1.125rem;
  }
}

.gray-scale {
  background: linear-gradient(
    90deg,
    #838383,
    #a1a1a1,
    #b3b3b3,
    #a1a1a1,
    #838383
  ); /*グラデーションを定義*/
  background-size: 200% 200%; /*サイズを大きくひきのばす*/
  animation: bgGradient 2.5s ease infinite;
}
@keyframes bgGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
