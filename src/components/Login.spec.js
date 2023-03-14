import { mount } from "@vue/test-utils";
import Login from "./Login.vue";

describe("Login.vue", () => {
  it("should no text push enter login button to be error", async () => {
    const wrapper = mount(Login);
    // loginErrorの値がfalseである確認
    expect(wrapper.vm.loginError).toBe(false);
    // loginErrorの値をtrueに設定
    wrapper.vm.loginError = true;
    // VueがDOMを更新するのを待つ
    await wrapper.vm.$nextTick();
    // 該当ユーザーなしのメッセージが表示されているかを確認
    expect(wrapper.find('[data-test="loginError"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loginError"]').text()).toBe(
      "該当ユーザーなし"
    );
  });
});
