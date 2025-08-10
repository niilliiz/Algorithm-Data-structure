import { describe, it, expect } from "vitest";
import QuickSortMedianOfThreeScheme from "../../../Algorithms/sorts/quick-sort/median-of-three-scheme";

describe("QuickSortMedianOfThreeScheme", () => {
  it("should return the same array for empty input", () => {
    expect(QuickSortMedianOfThreeScheme([])).toEqual([]);
  });

  it("should return the same array for single element", () => {
    expect(QuickSortMedianOfThreeScheme([42])).toEqual([42]);
  });

  it("should correctly sort an already sorted array", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(QuickSortMedianOfThreeScheme([...arr])).toEqual([1, 2, 3, 4, 5]);
  });

  it("should correctly sort a reverse sorted array", () => {
    const arr = [5, 4, 3, 2, 1];
    expect(QuickSortMedianOfThreeScheme([...arr])).toEqual([1, 2, 3, 4, 5]);
  });

  it("should correctly sort an array with random integers", () => {
    const arr = [8, 0, 9, -4, 11, 2, 7, 1, 6, 3, 10, 17, -11];
    expect(QuickSortMedianOfThreeScheme([...arr])).toEqual(
      [...arr].sort((a, b) => a - b),
    );
  });

  it("should correctly sort an array with duplicate values", () => {
    const arr = [5, 1, 3, 3, 2, 5, 1];
    expect(QuickSortMedianOfThreeScheme([...arr])).toEqual(
      [...arr].sort((a, b) => a - b),
    );
  });

  it("should correctly sort an array with negative numbers", () => {
    const arr = [-3, -1, -7, -2, 0, 4, -5];
    expect(QuickSortMedianOfThreeScheme([...arr])).toEqual(
      [...arr].sort((a, b) => a - b),
    );
  });

  it("should handle large arrays correctly", () => {
    const arr = Array.from({ length: 1000 }, () =>
      Math.floor(Math.random() * 2000 - 1000),
    );
    const sortedArr = QuickSortMedianOfThreeScheme([...arr]);
    expect(sortedArr).toEqual([...arr].sort((a, b) => a - b));
  });

  it("should not mutate the input array when passed a frozen copy", () => {
    const arr = [3, 1, 2];
    const frozenArr = Object.freeze([...arr]);
    const result = QuickSortMedianOfThreeScheme([...frozenArr]);
    expect(result).toEqual([1, 2, 3]);
  });
});
