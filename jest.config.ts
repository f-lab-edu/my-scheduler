import "ts-node/register";
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  preset: "ts-jest",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(svg)$": "<rootDir>/__mocks__/svgMock.js",
    "^.+\\.(gif)$": "<rootDir>/__mocks__/fileMock.js",
  },
};

export default createJestConfig(config);
