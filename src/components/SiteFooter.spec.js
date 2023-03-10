import { mount } from "@vue/test-utils";
import SearchBooks from "./SearchBooks.vue";
import { setActivePinia, createPinia } from 'pinia'

describe("Click buttons expect contents", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })
  it("click syoko", () => {
    const wrapper = mount(SearchBooks);
    expect(2 + 2).toBe(4);
  });
});
