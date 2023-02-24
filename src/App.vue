<script setup lang="ts">
import Enter from "./components/Enter.vue";
import Login from "./components/Login.vue";
import SearchBook from "./components/SearchBooks.vue";
import SiteFooter from "./components/SiteFooter.vue";
import SiteHeader from "./components/SiteHeader.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <SiteHeader />
  
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
  <RouterLink to="/anonymous">異次元</RouterLink>
  <RouterView />

  <!-- 
  <Enter />
  <Login />
  <SearchBook />
  <SiteFooter />
   -->
</template>

<style scoped></style>
