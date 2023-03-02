<script setup lang="ts">
import SearchBooks from "../components/SearchBooks.vue";
import { useLogin } from "../hooks/useLogin";
import { ref } from "vue";

const loginUser = useLogin();
const activeButton = ref("button1");

function showInfo(buttonName: any) {
  activeButton.value = buttonName;
}
</script>

<template>
  <section>
    <SearchBooks />
  </section>



</template>
