import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../views/SearchPage.vue";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/SearchPage",
      name: "SearchPage",
      // HomeView と同じように以下のように書き換える
      component: SearchPage,
    },
    { path: "/:catchAll(.*)", component: NotFound },
  ],
});

export default router;
