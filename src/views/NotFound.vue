<template>
  <p class="m-6 text-8xl font-bold font-sans italic">404 Not Found</p>
  <div class="max-w-3xl mx-auto">
    <div>
      HTTP 404、またはエラーメッセージ Not
      Found（「未検出」「見つかりません」の意）は、HTTPステータスコードの一つ。クライアントがサーバに接続できたものの、クライアントの要求に該当するもの
      (ウェブページ等)
      をサーバが見つけられなかったことを示すもの。また、要求に応えられない理由をごまかすためにも使われる。
      ウェブブラウザが表示する「サーバが見つかりません」のようなメッセージは、サーバとの接続に失敗したことを表すもので、404とは別である。
    </div>
  </div>
  <div>
    <a
      class="p-2"
      href="https://ja.wikipedia.org/wiki/HTTP_404"
      target="_blank"
      rel="noopener noreferrer"
      >Wikipediaより</a
    >
  </div>
  <div>
    <button class="p-3 bg-teal-400 rounded-lg">
      <RouterLink to="/">Homeに戻る</RouterLink>
    </button>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
