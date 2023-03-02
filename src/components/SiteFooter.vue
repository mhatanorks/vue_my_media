<!-- 
機能

ナビメニュー
ユーザーネーム
-->

<script setup lang="ts"></script>

<template>
  <footer class="text-center pt-3 pb-5 w-100%">
    <nav>
      <RouterLink to="/">
        <button class="px-7 py-2 mx-3 bg-teal-50 rounded-lg font-bold text-xl">
          <img src="../images/icons/book_image.png" alt="">
          <p>書庫</p>
        </button>
      </RouterLink>
      <RouterLink to="/SearchPage">
        <button class="px-7 py-2 mx-3 bg-teal-50 rounded-lg font-bold text-xl">
          <img src="../images/icons/search_image.png" alt="">
          <p>検索</p>
        </button>
      </RouterLink>
      <RouterLink to="/anonymous">
        <button class="px-7 py-2 mx-3 bg-teal-50 rounded-lg font-bold text-xl">
          <img src="../images/icons/warp_image.png" alt="">
          <p>異次元</p>
        </button>
      </RouterLink>
    </nav>
  </footer>
</template>

<style scoped>
img {
  width: 40px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 10px;
}
</style>
