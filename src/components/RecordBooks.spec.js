import { shallowMount } from "@vue/test-utils";
import RecordBooks from "./RecordBooks.vue";
import { Loading } from "./RecordBooks.vue";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://127.0.0.1:8000/users", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          username: "uni",
          recordBooks: [
            {
              title: "Book 1",
              thumbnail: "book1.png",
              id: 1,
              date: "2023-03-03",
              Memo: "面白かった",
              delete: false,
            },
            {
              title: "Book 2",
              thumbnail: "",
              id: 2,
              date: "2023-03-04",
              Memo: "面白",
              delete: true,
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

describe("RecordBooks.vue", () => {
  it("mock api", async () => {
    const wrapper = shallowMount(RecordBooks);
    // モックされたレスポンスを準備する
    const mockData = [
      {
        title: "Book 1",
        thumbnail: "book1.png",
        id: 1,
        date: "2023-03-03",
        Memo: "面白かったあ",
        delete: false,
      },
      {
        title: "Book 2",
        thumbnail: "",
        id: 2,
        date: "2023-03-04",
        Memo: "面白",
        delete: true,
      },
    ];
    server.use(
      rest.get("http://127.0.0.1:8000/users", (req, res, ctx) => {
        return res(ctx.json([{ recordBooks: mockData }]));
      })
    );
    wrapper.vm.userData = mockData;
    await wrapper.vm.$nextTick();
    // userDataが正しく設定されていることを確認する
    expect(wrapper.vm.userData).toEqual(mockData);
  });
});
