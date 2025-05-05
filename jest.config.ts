import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(svg)$": "<rootDir>/__mocks__/svgMock.js",
  },
};

export default createJestConfig(config);
