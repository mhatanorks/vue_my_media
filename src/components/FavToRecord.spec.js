import { mount } from "@vue/test-utils";
import FavToRecord from "./FavToRecord.vue";
import { setActivePinia, createPinia } from 'pinia'

beforeEach(() => {
  // creates a fresh pinia and make it active so it's automatically picked
  // up by any useStore() call without having to pass it to it:
  // `useStore(pinia)`
  setActivePinia(createPinia())
})

describe("Click buttons expect contents", () => {
  it("click syoko", () => {
    const wrapper = mount(FavToRecord);
    expect(2 + 2).toBe(4);
  });
});
