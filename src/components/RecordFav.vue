<!-- 
機能
ユーザー登録
inputデータをDBに送信 
-->
<script setup lang="ts">
import axios from "axios";
import { ref, Ref } from "vue";
import { useLogin } from "../hooks/useLogin";
import { DeleteFavBooks } from "../hooks/deleteFav";

interface Fav {
  authors: string[];
  delete: boolean;
  thumbnail: string;
  title: string;
}

const uni = defineProps<{ show: Boolean; fav: Fav | any }>();
const getDate = new Date();
getDate.setDate(getDate.getDate());
const yyyy = getDate.getFullYear();
const mm = ("0" + (getDate.getMonth() + 1)).slice(-2);
const dd = ("0" + getDate.getDate()).slice(-2);
const todaysDate = ref<Date | string>(`${yyyy}-${mm}-${dd}`);
const recordMemo = ref<string>("");

// カスタムフック
const loginUser = useLogin();

const recordBooks = async (e: Event) => {
  // お気に入り delete = true async
  await DeleteFavBooks(uni.fav, loginUser.value);
  // ユーザーデータ取得 async
  const userData = ref<number | null | any>();
  await axios
    .get(`http://127.0.0.1:8000/users?username=${loginUser.value}`)
    .then((res) => (userData.value = res.data[0]));
  const newRecordBook = {
    title: uni.fav.title,
    authors: uni.fav.authors,
    thumbnail: uni.fav.thumbnail,
    date: todaysDate.value,
    Memo: recordMemo.value,
    delete: false,
  };
  userData.value.recordBooks.push(newRecordBook);
  // record挿入 async
  await axios.put(
    `http://127.0.0.1:8000/users/${userData.value.id}`,
    userData.value
  );
  // location.reload();
};
</script>

<template>
  <Transition name="modal">
    <!-- transitions css用name -->
    <section v-if="show" class="modal-mask">
      <div class="modal-container">
        <h3>Record Form</h3>
        <form action="">
          <div class="flex justify-center">
            <div class="fav-text w-72 ml-4">
              <div>タイトル: {{ fav.title }}</div>
              <div class="flex justify-center">
                <div v-for="author in fav.authors" :key="fav.title" class="m-1">
                  著者: {{ author }}
                </div>
              </div>
              <div class="">
                <label for="">記録日: </label>
                <input type="date" v-model="todaysDate" />
              </div>
              <div class="">
                <label for="">メモ</label>
                <textarea
                  class="tracking-wider p-2"
                  name=""
                  id=""
                  cols="28"
                  rows="10"
                  v-model="recordMemo"
                ></textarea>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              class="modal-default-button p-3 m-1 bg-teal-400 rounded-lg"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="recordBooks(fav)"
              class="p-3 m-1 bg-teal-400 rounded-lg"
            >
              記録する
            </button>
          </div>
        </form>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  transition: opacity 0.3s ease;
}
.modal-container {
  width: auto;
  margin: auto;
  padding: 20px 30px;
  background-color: #e5f3f1;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  font-size: 18px;
  font-weight: 700;
}
input {
  width: 200px;
  height: 40px;
  border-radius: 12px;
  margin-left: 20px;
  padding-left: 20px;
}

/* フワッと現れる */
.modal-enter-from {
  opacity: 0;
}

/* フワッと消える */
.modal-leave-to {
  opacity: 0;
}

/* 現消時大きくなる */
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  /* -webkit-transform: scale(1.1); */
  transform: scale(1.1);
}

textarea {
  position: relative;
  right: 22px;
}
</style>
