import { defineStore } from "pinia";

export const useTabStore = defineStore("user", {
  state: () => ({
    activeButton: "button1" as string, 
  }),
  actions: {
    changeTab(tabName:string) {
      this.activeButton = tabName;
    },
  },
});
