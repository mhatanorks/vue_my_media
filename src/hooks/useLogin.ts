import { ref, onMounted } from "vue";

export const useLogin = () => {
  const loginUser = ref<string[] | null>(null);
  onMounted(async () => {
    const item = JSON.parse(localStorage.getItem("login") ?? '{"user":[]}');
    if (item.user.length === 0) {
      loginUser.value = null;
    } else {
      loginUser.value = item.user;
    }
  });
  return loginUser;
};

/*
How to use ?
=> add this code.

import { useLogin } from "../hooks/useLogin";
const loginUser = useLogin();

*/
