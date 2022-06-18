module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: { "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest" },
  testMatch: ["<rootDir>/src/**/*.test.ts?(x)"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "ts-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/file-mock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/setup-tests.ts"],
  collectCoverageFrom: [
    "/*.{jsx,tsx,ts}",
    "!/.d.ts",
    "!/node_modules/",
    "!/coverage/",
    "!**/config*.js",
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: -1000,
    },
  },
  coverageDirectory: "<rootDir>/reports/coverage",
};
