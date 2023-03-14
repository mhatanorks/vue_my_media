import { mount } from "@vue/test-utils";
import Home from "@Home.vue";
import Header from "@Header.vue"

// piniaを使ってるコンポーネントのテストに入れる
import { setActivePinia, createPinia } from "pinia";
beforeEach(() => {
  // creates a fresh pinia and make it active so it's automatically picked
  // up by any useStore() call without having to pass it to it:
  // `useStore(pinia)`
  setActivePinia(createPinia());
});

// 基本型
describe("コンポーネント名", () => {
  it("テスト内容", async () => {
    // コンポーネント取得
    const wrapper = mount(Home);
    // 要素取得
    const button = wrapper.find('[data-test="search-page"]');
    // 正しい文字列が入っているか
    expect(button.text()).toBe("検索");
    // 一括で(要素取得+正しい文字列が入っているか)
    expect(wrapper.find('[data-test="search-page"]').text()).toBe("検索");
    // id=buttonが存在しているか
    expect(wrapper.find('#button').exists()).toBe(true);
    // 子コンポーネント取得
    const header = wrapper.getComponent(Header)
    expect(header.find('[data-test="search-page"]').exists()).toBe(true)
  });
});
