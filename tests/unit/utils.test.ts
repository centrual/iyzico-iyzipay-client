import { describe, expect, test } from "vitest";
import { convertJsonToPKIString, convertNestedValueToString, createSha1SummaryAsBase64, extractPathFromUrl, generateRandomString } from "../../src/utils/utils";

describe("Utils Functions", () => {
  test("generateRandomString should generate a string of the correct length", () => {
    const length = 10;
    const randomString = generateRandomString(length);
    expect(randomString).toHaveLength(length);
  });

  test("generateRandomString should generate a string with valid characters", () => {
    const length = 10;
    const randomString = generateRandomString(length);
    const validCharacters = /^[A-Za-z0-9]+$/;
    expect(randomString).toMatch(validCharacters);
  });

  test("extractPathFromUrl should remove base URL and query string", () => {
    const url = "https://example.com/path/to/resource?query=string";
    const baseUrl = "https://example.com";
    const path = extractPathFromUrl(url, baseUrl);
    expect(path).toBe("/path/to/resource");
  });

  test("createSha1SummaryAsBase64 should create a valid SHA1 base64 hash", async () => {
    const data = "test data";
    const hash = await createSha1SummaryAsBase64(data);
    const expectedHash = "9I3YU4IIYIFsddVND1hNyGMyenw="; // Correct precomputed hash for "test data"
    expect(hash).toBe(expectedHash);
  });

  test("convertJsonToPKIString should convert object to PKI string", () => {
    const obj = { key1: "value1", key2: "value2" };
    const pkiString = convertJsonToPKIString(obj);
    expect(pkiString).toBe("[key1=value1,key2=value2]");
  });

  test("convertJsonToPKIString should convert array to PKI string", () => {
    const arr = ["value1", "value2"];
    const pkiString = convertJsonToPKIString(arr);
    expect(pkiString).toBe("[value1, value2]");
  });

  test("convertNestedValueToString should convert nested objects to PKI string", () => {
    const nestedObj = { key1: { nestedKey: "nestedValue" } };
    const pkiString = convertNestedValueToString(nestedObj);
    expect(pkiString).toBe("[key1=[nestedKey=nestedValue]]");
  });

  test("convertNestedValueToString should convert arrays to PKI string", () => {
    const nestedArr = ["value1", ["nestedValue"]];
    const pkiString = convertNestedValueToString(nestedArr);
    expect(pkiString).toBe("[value1, [nestedValue]]");
  });
});
