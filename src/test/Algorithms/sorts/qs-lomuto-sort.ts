import { describe, it, expect } from "vitest";
import QuickSortLomutoScheme from "../../../Algorithms/sorts/quick-sort/Lomuto-scheme";

describe("QuickSort with Lomuto Partitioning", () => {
  describe("Basic functionality", () => {
    it("should sort an unsorted array", () => {
      const input = [64, 34, 25, 12, 22, 11, 90];
      const expected = [11, 12, 22, 25, 34, 64, 90];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle already sorted array", () => {
      const input = [1, 2, 3, 4, 5];
      const expected = [1, 2, 3, 4, 5];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle reverse sorted array", () => {
      const input = [5, 4, 3, 2, 1];
      const expected = [1, 2, 3, 4, 5];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle random order array", () => {
      const input = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const expected = [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty array", () => {
      const input: number[] = [];
      const expected: number[] = [];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle single element array", () => {
      const input = [42];
      const expected = [42];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle two element array", () => {
      const input = [2, 1];
      const expected = [1, 2];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle array with all identical elements", () => {
      const input = [5, 5, 5, 5, 5];
      const expected = [5, 5, 5, 5, 5];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle array with many duplicates", () => {
      const input = [3, 1, 3, 2, 1, 3, 2, 1];
      const expected = [1, 1, 1, 2, 2, 3, 3, 3];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });
  });

  describe("Special numeric values", () => {
    it("should handle negative numbers", () => {
      const input = [-3, -1, -4, -1, -5];
      const expected = [-5, -4, -3, -1, -1];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle mix of positive and negative numbers", () => {
      const input = [3, -1, 4, -2, 0, 5, -3];
      const expected = [-3, -2, -1, 0, 3, 4, 5];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle zero", () => {
      const input = [0, 3, 0, -1, 0];
      const expected = [-1, 0, 0, 0, 3];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle floating point numbers", () => {
      const input = [3.14, 2.71, 1.41, 0.57];
      const expected = [0.57, 1.41, 2.71, 3.14];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle very large numbers", () => {
      const input = [Number.MAX_SAFE_INTEGER, 1, Number.MAX_SAFE_INTEGER - 1];
      const expected = [
        1,
        Number.MAX_SAFE_INTEGER - 1,
        Number.MAX_SAFE_INTEGER,
      ];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle very small numbers", () => {
      const input = [Number.MIN_SAFE_INTEGER, -1, Number.MIN_SAFE_INTEGER + 1];
      const expected = [
        Number.MIN_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER + 1,
        -1,
      ];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });
  });

  describe("Performance and stress tests", () => {
    it("should handle large array efficiently", () => {
      const size = 1000;
      const input = Array.from({ length: size }, () =>
        Math.floor(Math.random() * 1000),
      );
      const expected = [...input].sort((a, b) => a - b);

      const start = performance.now();
      const result = QuickSortLomutoScheme([...input]);
      const end = performance.now();

      expect(result).toEqual(expected);
      // Reasonable performance check - should complete well under 100ms for 1000 elements
      expect(end - start).toBeLessThan(100);
    });

    it("should handle worst-case scenario (already sorted)", () => {
      const input = Array.from({ length: 100 }, (_, i) => i);
      const expected = Array.from({ length: 100 }, (_, i) => i);
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle array with extreme values", () => {
      const input = [
        Number.MAX_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
        0,
        -1,
        1,
        Number.MAX_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
      ];
      const expected = [
        Number.MIN_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
        -1,
        0,
        1,
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
      ];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });
  });

  describe("In-place sorting verification", () => {
    it("should sort the original array in place", () => {
      const input = [3, 1, 4, 1, 5];
      const originalRef = input;
      const result = QuickSortLomutoScheme(input);

      // Should return the same array reference
      expect(result).toBe(originalRef);
      // Array should be sorted
      expect(result).toEqual([1, 1, 3, 4, 5]);
    });
  });

  describe("Stability considerations", () => {
    it("should handle arrays with many repeated elements", () => {
      const input = [1, 1, 1, 1, 1];
      const expected = [1, 1, 1, 1, 1];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });

    it("should handle alternating pattern", () => {
      const input = [1, 2, 1, 2, 1, 2];
      const expected = [1, 1, 1, 2, 2, 2];
      const result = QuickSortLomutoScheme([...input]);
      expect(result).toEqual(expected);
    });
  });

  describe("Correctness verification", () => {
    it("should produce same result as native sort for random arrays", () => {
      for (let i = 0; i < 10; i++) {
        const input = Array.from({ length: 50 }, () =>
          Math.floor(Math.random() * 100),
        );
        const expected = [...input].sort((a, b) => a - b);
        const result = QuickSortLomutoScheme([...input]);
        expect(result).toEqual(expected);
      }
    });

    it("should maintain array length", () => {
      const input = [5, 2, 8, 1, 9, 3];
      const originalLength = input.length;
      const result = QuickSortLomutoScheme([...input]);
      expect(result.length).toBe(originalLength);
    });

    it("should not add or remove elements", () => {
      const input = [3, 1, 4, 1, 5, 9, 2, 6];
      const inputSum = input.reduce((sum, val) => sum + val, 0);
      const result = QuickSortLomutoScheme([...input]);
      const resultSum = result.reduce((sum, val) => sum + val, 0);
      expect(resultSum).toBe(inputSum);
    });
  });
});
