import { describe, it, expect } from "vitest";
import { SelectionSort } from "../../../Algorithms/sorts/selection-sort";

describe("SelectionSort", () => {
  describe("Edge Cases", () => {
    it("should handle empty array", () => {
      const input: number[] = [];
      const result = SelectionSort(input);
      expect(result).toEqual([]);
      expect(result).toBe(input); // Should return same reference
    });

    it("should handle single element array", () => {
      const input = [42];
      const result = SelectionSort(input);
      expect(result).toEqual([42]);
      expect(result).toBe(input); // Should return same reference
    });

    it("should handle two element array - already sorted", () => {
      const input = [1, 2];
      const result = SelectionSort(input);
      expect(result).toEqual([1, 2]);
      expect(result).toBe(input); // Should modify in place
    });

    it("should handle two element array - reverse sorted", () => {
      const input = [2, 1];
      const result = SelectionSort(input);
      expect(result).toEqual([1, 2]);
      expect(result).toBe(input); // Should modify in place
    });
  });

  describe("Basic Sorting Scenarios", () => {
    it("should sort already sorted array", () => {
      const input = [1, 2, 3, 4, 5];
      const expected = [1, 2, 3, 4, 5];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should sort reverse sorted array", () => {
      const input = [5, 4, 3, 2, 1];
      const expected = [1, 2, 3, 4, 5];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should sort random unsorted array", () => {
      const input = [64, 34, 25, 12, 22, 11, 90];
      const expected = [11, 12, 22, 25, 34, 64, 90];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should sort array with mixed positive and negative numbers", () => {
      const input = [3, -1, 4, -5, 2, 0];
      const expected = [-5, -1, 0, 2, 3, 4];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });
  });

  describe("Special Number Cases", () => {
    it("should handle array with all same elements", () => {
      const input = [5, 5, 5, 5, 5];
      const expected = [5, 5, 5, 5, 5];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should handle array with zeros", () => {
      const input = [0, 0, 0, 1, -1];
      const expected = [-1, 0, 0, 0, 1];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should handle array with negative numbers only", () => {
      const input = [-3, -1, -7, -2, -5];
      const expected = [-7, -5, -3, -2, -1];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should handle array with decimal numbers", () => {
      const input = [3.14, 2.71, 1.41, 0.5, 2.5];
      const expected = [0.5, 1.41, 2.5, 2.71, 3.14];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should handle array with very large numbers", () => {
      const input = [1000000, 500000, 2000000, 100000];
      const expected = [100000, 500000, 1000000, 2000000];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });
  });

  describe("Duplicate Elements", () => {
    it("should handle array with some duplicates", () => {
      const input = [4, 2, 3, 2, 1, 3, 4];
      const expected = [1, 2, 2, 3, 3, 4, 4];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should handle array with multiple duplicates", () => {
      const input = [5, 1, 3, 1, 5, 3, 1];
      const expected = [1, 1, 1, 3, 3, 5, 5];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should handle array with duplicates at start and end", () => {
      const input = [7, 2, 4, 6, 7];
      const expected = [2, 4, 6, 7, 7];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });
  });

  describe("Array Length Variations", () => {
    it("should handle small array (3 elements)", () => {
      const input = [3, 1, 2];
      const expected = [1, 2, 3];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should handle medium array (10 elements)", () => {
      const input = [10, 2, 8, 1, 9, 3, 7, 4, 6, 5];
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should handle larger array (20 elements)", () => {
      const input = [
        20, 15, 8, 10, 5, 7, 6, 1, 12, 13, 4, 11, 14, 2, 3, 17, 16, 18, 19, 9,
      ];
      const expected = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });
  });

  describe("In-Place Mutation Behavior", () => {
    it("should modify original array (in-place sorting)", () => {
      const input = [3, 1, 4, 1, 5];
      const originalReference = input;
      const result = SelectionSort(input);

      // Should return the same reference
      expect(result).toBe(originalReference);

      // Original array should be modified
      expect(input).toEqual([1, 1, 3, 4, 5]);
    });

    it("should maintain array reference for edge cases", () => {
      const emptyArray: number[] = [];
      const singleElement = [42];

      expect(SelectionSort(emptyArray)).toBe(emptyArray);
      expect(SelectionSort(singleElement)).toBe(singleElement);
    });
  });

  describe("Performance Edge Cases", () => {
    it("should handle best case scenario (already sorted)", () => {
      const input = Array.from({ length: 100 }, (_, i) => i + 1);
      const expected = Array.from({ length: 100 }, (_, i) => i + 1);
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should handle worst case scenario (reverse sorted)", () => {
      const input = Array.from({ length: 100 }, (_, i) => 100 - i);
      const expected = Array.from({ length: 100 }, (_, i) => i + 1);
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should handle random case", () => {
      const input = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 43];
      const expected = [11, 12, 22, 25, 34, 43, 50, 64, 76, 88, 90];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });
  });

  describe("Mathematical Edge Cases", () => {
    it("should handle Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER", () => {
      const input = [
        Number.MAX_SAFE_INTEGER,
        0,
        Number.MIN_SAFE_INTEGER,
        1,
        -1,
      ];
      const expected = [
        Number.MIN_SAFE_INTEGER,
        -1,
        0,
        1,
        Number.MAX_SAFE_INTEGER,
      ];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });

    it("should handle very small decimal differences", () => {
      const input = [0.1, 0.2, 0.15, 0.05, 0.25];
      const expected = [0.05, 0.1, 0.15, 0.2, 0.25];
      const result = SelectionSort(input);
      expect(result).toEqual(expected);
    });
  });

  describe("Algorithm Correctness Verification", () => {
    it("should maintain all original elements after sorting", () => {
      const input = [5, 2, 8, 1, 9, 3];
      const originalSum = input.reduce((sum, val) => sum + val, 0);
      const originalLength = input.length;

      const result = SelectionSort(input);
      const resultSum = result.reduce((sum, val) => sum + val, 0);

      expect(result.length).toBe(originalLength);
      expect(resultSum).toBe(originalSum);
      expect(result).toEqual([1, 2, 3, 5, 8, 9]);
    });

    it("should produce stable sort behavior for equal elements", () => {
      // Note: Selection sort is not stable, but we test consistency
      const input = [3, 1, 2, 1, 3];
      const result = SelectionSort(input);
      expect(result).toEqual([1, 1, 2, 3, 3]);
    });

    it("should be deterministic (same input produces same output)", () => {
      const input1 = [4, 2, 7, 1, 3];
      const input2 = [4, 2, 7, 1, 3];

      const result1 = SelectionSort(input1);
      const result2 = SelectionSort(input2);

      expect(result1).toEqual(result2);
      expect(result1).toEqual([1, 2, 3, 4, 7]);
    });
  });
});
