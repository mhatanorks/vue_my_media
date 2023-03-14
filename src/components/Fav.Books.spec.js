import { shallowMount } from "@vue/test-utils";
import FavBooks from "./FavBooks.vue";
import { Loading } from "./FavBooks.vue";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://127.0.0.1:8000/users", (req, res, ctx) => {
    const query = req.url.searchParams;
    const username = query.get("username");
    return res(
      ctx.json([
        {
          username: username,
          favBooks: [
            {
              title: "Book 1",
              authors: ["Author 1", "Author 2"],
              thumbnail: "book1.png",
              id: 1,
            },
            {
              title: "Book 2",
              authors: ["Author 3"],
              thumbnail: "",
              id: 2,
            },
          ],
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("FavBooks.vue", () => {
  it("uni", async () => {
    const wrapper = shallowMount(FavBooks);
    expect(wrapper.find('[data-test="fav-stocks"]').exists()).toBe(true);
  });

  it("mock api", async () => {
    const wrapper = shallowMount(FavBooks);
    // モックされたレスポンスを準備する
    const mockData = [
      {
        title: "Book 1",
        authors: ["Author 1", "Author 2"],
        thumbnail: "book1.png",
        id: 1,
      },
      {
        title: "Book 2",
        authors: ["Author 3"],
        thumbnail: "",
        id: 2,
      },
    ];
    server.use(
      rest.get("http://127.0.0.1:8000/users", (req, res, ctx) => {
        return res(ctx.json([{ favBooks: mockData }]));
      })
    );
    wrapper.vm.userData = mockData;
    await wrapper.vm.$nextTick();
    // userDataが正しく設定されていることを確認する
    expect(wrapper.vm.userData).toEqual(mockData);

      // Assert the rendered book titles
      const bookTitles = wrapper.findAll('[data-test="fav-title"]');
      expect(bookTitles).toHaveLength(mockData.length);
      expect(bookTitles[0].text()).toEqual("Book 1");
      expect(bookTitles[1].text()).toEqual("Book 2");
  });
});
