import { defineStore } from "pinia";

export const useTabStore = defineStore("user", {
  state: () => ({
    activeButton: "button1" as string,
    viewActive: true,
    checked: "p-2 m-2 bg-teal-400 rounded-lg border-4 border-teal-400" as string,
    unchecked: "p-2 m-2 bg-teal-50 rounded-lg border-4 border-teal-400" as string,
  }),
  actions: {
    changeTab(tabName: string) {
      this.activeButton = tabName;
      this.viewActive = !this.viewActive
      console.log(this.viewActive)
    },
  },
});
