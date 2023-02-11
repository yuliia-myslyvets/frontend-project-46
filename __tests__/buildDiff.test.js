import { test, expect } from "@jest/globals";
import buildDiff from "../src/buildDiff.js";
import { fileURLToPath } from "url";
import { dirname, path } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8");

test("json diff", () => {
  const result = readFile("result.json");
  const filepath1 = getFixturePath("file1.json");
  const filepath2 = getFixturePath("file2.json");

  expect(buildDiff(filepath1, filepath2)).toBe(result);
});
