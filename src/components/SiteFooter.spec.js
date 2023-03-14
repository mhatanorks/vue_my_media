import { mount } from "@vue/test-utils";
import SiteFooter from "./SiteFooter.vue";

import { setActivePinia, createPinia } from "pinia";
beforeEach(() => {
  // creates a fresh pinia and make it active so it's automatically picked
  // up by any useStore() call without having to pass it to it:
  // `useStore(pinia)`
  setActivePinia(createPinia());
});

describe("Footer", () => {
  it("should render Home", async () => {
    const wrapper = mount(SiteFooter);
    const button = wrapper.find('[data-test="search-page"]');
    await button.trigger("click");
  });
});
