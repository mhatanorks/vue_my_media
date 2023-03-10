module.exports = {
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(t|j)s?$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest"
  },
  "moduleNameMapper": {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
};
