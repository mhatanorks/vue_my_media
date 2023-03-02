import { ref } from "vue";
import axios from "axios";

const favCheck = ref(true); // お気に入り

// お気に入り削除
export const DeleteFavBooks = async (uni: VolumeInfo, user: any) => {
  console.log(user);
  console.log(uni);
  favCheck.value = true;
  const userData = ref<number | null | any>();
  await axios
    .get(`http://127.0.0.1:8000/users?username=${user}`)
    //   .then((res) => (console.log(res.data[0])));
    .then((res) => (userData.value = res.data[0]));
  // userData.value.favBooks
  const unii = userData.value.favBooks.findIndex(
    (e: any) => e.title === uni.title
  );
  if (userData.value.favBooks[unii] === undefined) {
    return
  } else {

    
    // index番号のbooleanをひっくり返す
    console.log(userData.value.favBooks[unii]);
    userData.value.favBooks[unii].delete = true;
    console.log(userData.value.favBooks[unii].delete);
    
    // 更新
    // 送信
    await axios.put(
      `http://127.0.0.1:8000/users/${userData.value.id}`,
      userData.value
      );
    }
};

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

/*
How to use ?
=> add this code.

import { DeleteFavBooks } from "../hooks/deleteFav"

@click="DeleteFavBooks(書籍情報取得オブジェクト, loginUser)"

*/
