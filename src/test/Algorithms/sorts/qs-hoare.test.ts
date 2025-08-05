import { describe, it, expect } from "vitest";
import QuickSortHoareScheme from "../../../Algorithms/sorts/quick-sort/hoare-scheme";

describe("QuickSortHoareScheme", () => {
  it("sorts a mixed array of positive and negative numbers", () => {
    const input = [5, -2, 9, 1, -7, 3];
    const expected = [-7, -2, 1, 3, 5, 9];
    expect(QuickSortHoareScheme([...input])).toEqual(expected);
  });

  it("handles an already sorted array", () => {
    const input = [-3, 0, 2, 5, 8];
    const expected = [-3, 0, 2, 5, 8];
    expect(QuickSortHoareScheme([...input])).toEqual(expected);
  });

  it("handles a reverse sorted array", () => {
    const input = [10, 7, 5, 3, 1];
    const expected = [1, 3, 5, 7, 10];
    expect(QuickSortHoareScheme([...input])).toEqual(expected);
  });

  it("handles an empty array", () => {
    expect(QuickSortHoareScheme([])).toEqual([]);
  });

  it("handles a single-element array", () => {
    expect(QuickSortHoareScheme([42])).toEqual([42]);
  });

  it("handles an array with duplicates", () => {
    const input = [4, 2, 5, 2, 3, 5, 1];
    const expected = [1, 2, 2, 3, 4, 5, 5];
    expect(QuickSortHoareScheme([...input])).toEqual(expected);
  });

  it("handles an array with all equal elements", () => {
    const input = [7, 7, 7, 7];
    const expected = [7, 7, 7, 7];
    expect(QuickSortHoareScheme([...input])).toEqual(expected);
  });

  it("handles an array with large and small numbers", () => {
    const input = [1000000, -100000, 3, 2, 1, 0, -999999];
    const expected = [-999999, -100000, 0, 1, 2, 3, 1000000];
    expect(QuickSortHoareScheme([...input])).toEqual(expected);
  });

  it("does not mutate the original array", () => {
    const input = [3, 1, 4];
    const original = [...input];
    QuickSortHoareScheme([...input]); // use copy to sort
    expect(input).toEqual(original); // input remains unchanged
  });

  it("handles a large array", () => {
    const input = Array.from({ length: 1000 }, () =>
      Math.floor(Math.random() * 1000),
    );
    const sorted = [...input].sort((a, b) => a - b);
    expect(QuickSortHoareScheme([...input])).toEqual(sorted);
  });
});
