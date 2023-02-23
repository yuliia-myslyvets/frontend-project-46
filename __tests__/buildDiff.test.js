import { test, expect } from "@jest/globals";
import buildDiff from "../src/buildDiff.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8");

// test("json diff", () => {
//   const result = readFile("result.txt");
//   const filepath1 = getFixturePath("file1.json");
//   const filepath2 = getFixturePath("file2.json");

//   expect(buildDiff(filepath1, filepath2)).toBe(result);
// });

// test("yml diff", () => {
//   const result = readFile("result.txt");
//   const filepath1 = getFixturePath("file1.yml");
//   const filepath2 = getFixturePath("file2.yml");

//   expect(buildDiff(filepath1, filepath2)).toBe(result);
// });
const jsonPath1 = getFixturePath("file1.json");
const jsonPath2 = getFixturePath("file2.json");
const yamlPath1 = getFixturePath("file1.yml");
const ymlPath2 = getFixturePath("file2.yml");

const stylishResult = readFile("stylishResult.txt");

test("displaying file differences in stylish form", () => {
  expect(buildDiff(jsonPath1, jsonPath2, "stylish")).toBe(stylishResult);
  expect(buildDiff(yamlPath1, ymlPath2, "stylish")).toBe(stylishResult);
});

const plainResult = readFile("plainResult.txt");

test("displaying file differences in plain form", () => {
  expect(buildDiff(jsonPath1, jsonPath2, "plain")).toBe(plainResult);
  expect(buildDiff(yamlPath1, ymlPath2, "plain")).toBe(plainResult);
});
