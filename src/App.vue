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
    <div class="routers">
      <RouterView />
    </div>
  <SiteFooter />
</template>

<style scoped>
.routers {
  margin-top: 60px;
}
</style>
