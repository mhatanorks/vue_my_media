<!-- 
機能

ナビメニュー
ユーザーネーム
-->

<script setup lang="ts"></script>

<template>
  <footer class="text-center p-3 w-100%">
    <nav>
      <button class="p-2 m-2 bg-teal-50 rounded-lg">
        <RouterLink to="/">Home</RouterLink>
      </button>
      <button class="p-2 m-2 bg-teal-50 rounded-lg">
        <RouterLink to="/about">About</RouterLink>
      </button>
      <button class="p-2 m-2 bg-teal-50 rounded-lg">
        <RouterLink to="/anonymous">異次元</RouterLink>
      </button>
    </nav>
  </footer>
</template>

<style scoped>

</style>
