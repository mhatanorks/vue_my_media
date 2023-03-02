<script setup lang="ts">
import { ref } from "vue";
import FavToRecord from "./FavToRecord.vue"
const props = defineProps({
  fav: Object,
});
const showModal = ref(false); // 登録モーダル
</script>

<template>
     <!-- コンポーネントにする -->
     <button
          class="p-2 m-1 bg-teal-400 rounded-lg"
          id="show-modal"
          @click="showModal = true"
        >
          Record
        </button>
        <Teleport to="body">
          <FavToRecord :show="showModal" :fav="fav" @close="showModal = false" />
        </Teleport>
</template>
