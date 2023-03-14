import { mount } from "@vue/test-utils";
import Home from "./Home.vue";
import RecordBooks from "../components/RecordBooks.vue";
import Login from "../components/Login.vue";
import { setActivePinia, createPinia } from "pinia";

beforeEach(() => {
  // creates a fresh pinia and make it active so it's automatically picked
  // up by any useStore() call without having to pass it to it:
  // `useStore(pinia)`
  setActivePinia(createPinia());
});

describe("Login.vue", () => {
  it("should view login page", async () => {
    const wrapper = mount(Home);
    const loginPage = wrapper.findComponent(Login);
    expect(loginPage.find('[data-test="LoginForm"]').exists()).toBe(true);
  });
  it("should view user recordBooks ", async () => {
    const wrapper = mount(Home);
    wrapper.vm.loginUser = "uni";
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test="user-page"]').exists()).toBe(true);

    const recButton = wrapper.find('[data-test="my-records"]');
    await recButton.trigger("click");
    const RecordBook = wrapper.findComponent(RecordBooks);
    expect(RecordBook.find('[data-test="rec-books"]').exists()).toBe(true);
  });
});
