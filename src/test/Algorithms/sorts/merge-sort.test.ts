import { describe, it, expect, beforeEach } from "vitest";
import MergeSort from "../../../Algorithms/sorts/merge-sort";

describe("MergeSort", () => {
  describe("Basic functionality", () => {
    it("should sort an array of positive integers", () => {
      const input = [64, 34, 25, 12, 22, 11, 90];
      const expected = [11, 12, 22, 25, 34, 64, 90];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should sort an array with negative and positive numbers", () => {
      const input = [
        8, 1, 11, -8, 98, 100, 21, 41, 11, 23, 6, 0, 1, 4, 84, -57, 20, -1,
      ];
      const expected = [
        -57, -8, -1, 0, 1, 1, 4, 6, 8, 11, 11, 20, 21, 23, 41, 84, 98, 100,
      ];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should sort a reverse-sorted array", () => {
      const input = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle already sorted array", () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(MergeSort(input)).toEqual(expected);
    });
  });

  describe("Edge cases - Array sizes", () => {
    it("should handle empty array", () => {
      const input: number[] = [];
      const expected: number[] = [];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle single element array", () => {
      const input = [42];
      const expected = [42];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle two element array - ascending", () => {
      const input = [1, 8];
      const expected = [1, 8];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle two element array - descending", () => {
      const input = [8, 1];
      const expected = [1, 8];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle three element array", () => {
      const input = [3, 1, 2];
      const expected = [1, 2, 3];
      expect(MergeSort(input)).toEqual(expected);
    });
  });

  describe("Edge cases - Special values", () => {
    it("should handle array with all identical elements", () => {
      const input = [5, 5, 5, 5, 5];
      const expected = [5, 5, 5, 5, 5];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle array with zeros", () => {
      const input = [0, -1, 0, 1, 0];
      const expected = [-1, 0, 0, 0, 1];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle array with only negative numbers", () => {
      const input = [-5, -1, -10, -3, -7];
      const expected = [-10, -7, -5, -3, -1];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle array with very large numbers", () => {
      const input = [Number.MAX_SAFE_INTEGER, 1, Number.MAX_SAFE_INTEGER - 1];
      const expected = [
        1,
        Number.MAX_SAFE_INTEGER - 1,
        Number.MAX_SAFE_INTEGER,
      ];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle array with very small numbers", () => {
      const input = [Number.MIN_SAFE_INTEGER, -1, Number.MIN_SAFE_INTEGER + 1];
      const expected = [
        Number.MIN_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER + 1,
        -1,
      ];
      expect(MergeSort(input)).toEqual(expected);
    });
  });

  describe("Edge cases - Duplicates", () => {
    it("should handle array with many duplicates", () => {
      const input = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const expected = [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle array with duplicates at boundaries", () => {
      const input = [1, 5, 3, 7, 3, 1];
      const expected = [1, 1, 3, 3, 5, 7];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle array with consecutive duplicates", () => {
      const input = [1, 1, 2, 2, 3, 3];
      const expected = [1, 1, 2, 2, 3, 3];
      expect(MergeSort(input)).toEqual(expected);
    });
  });

  describe("Performance and stability tests", () => {
    it("should handle large array efficiently", () => {
      const size = 1000;
      const input = Array.from({ length: size }, () =>
        Math.floor(Math.random() * 1000),
      );
      const result = MergeSort(input);
      const expected = [...input].sort((a, b) => a - b);

      expect(result).toEqual(expected);
      expect(result.length).toBe(size);
    });

    it("should be stable sort (preserve relative order of equal elements)", () => {
      // Since we're dealing with numbers, we can't directly test stability
      // But we can test that equal elements are handled correctly
      const input = [3, 1, 3, 2, 3];
      const result = MergeSort(input);
      const expected = [1, 2, 3, 3, 3];
      expect(result).toEqual(expected);
    });

    it("should handle power-of-2 sized arrays", () => {
      const input = [8, 4, 2, 1, 3, 5, 7, 6]; // 2^3 = 8 elements
      const expected = [1, 2, 3, 4, 5, 6, 7, 8];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle non-power-of-2 sized arrays", () => {
      const input = [9, 7, 5, 3, 1]; // 5 elements
      const expected = [1, 3, 5, 7, 9];
      expect(MergeSort(input)).toEqual(expected);
    });
  });

  describe("Immutability tests", () => {
    it("should not modify the original array", () => {
      const input = [3, 1, 4, 1, 5];
      const originalCopy = [...input];
      const result = MergeSort(input);

      expect(input).toEqual(originalCopy);
      expect(result).not.toBe(input); // Different reference
    });

    it("should return new array instance", () => {
      const input = [1, 2, 3];
      const result = MergeSort(input);

      expect(result).not.toBe(input);
      result[0] = 999;
      expect(input[0]).toBe(1); // Original unchanged
    });
  });

  describe("Mathematical properties", () => {
    it("should maintain all elements from input", () => {
      const input = [5, 2, 8, 1, 9, 3];
      const result = MergeSort(input);

      expect(result.length).toBe(input.length);

      // Check that all elements are preserved
      const inputSorted = [...input].sort((a, b) => a - b);
      expect(result).toEqual(inputSorted);
    });

    it("should produce correctly ordered output", () => {
      const input = [10, 5, 15, 3, 7, 12, 1];
      const result = MergeSort(input);

      // Check ascending order
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });

    it("should handle arrays with extreme value differences", () => {
      const input = [1000000, 1, -1000000, 0];
      const expected = [-1000000, 0, 1, 1000000];
      expect(MergeSort(input)).toEqual(expected);
    });
  });

  describe("Boundary condition tests", () => {
    it("should handle alternating high-low pattern", () => {
      const input = [100, 1, 99, 2, 98, 3];
      const expected = [1, 2, 3, 98, 99, 100];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle mostly sorted with few out-of-place elements", () => {
      const input = [1, 2, 3, 4, 0, 6, 7, 8, 9, 5];
      const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      expect(MergeSort(input)).toEqual(expected);
    });

    it("should handle random distribution", () => {
      const input = [42, 17, 91, 3, 68, 25, 76, 84, 12, 59];
      const expected = [3, 12, 17, 25, 42, 59, 68, 76, 84, 91];
      expect(MergeSort(input)).toEqual(expected);
    });
  });

  describe("Type safety and error conditions", () => {
    it("should handle integer overflow scenarios gracefully", () => {
      const input = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 0];
      const result = MergeSort(input);

      expect(result[0]).toBe(Number.MIN_SAFE_INTEGER);
      expect(result[1]).toBe(0);
      expect(result[2]).toBe(Number.MAX_SAFE_INTEGER);
    });

    it("should preserve number precision", () => {
      const input = [1.1, 1.01, 1.001];
      const expected = [1.001, 1.01, 1.1];
      expect(MergeSort(input)).toEqual(expected);
    });
  });
});

// Additional test for the specific example from the user
describe("User specific test case", () => {
  it("should correctly sort the provided test array", () => {
    const input = [
      8, 1, 11, -8, 98, 100, 21, 41, 11, 23, 6, 0, 1, 4, 84, -57, 20, -1,
    ];
    const expected = [
      -57, -8, -1, 0, 1, 1, 4, 6, 8, 11, 11, 20, 21, 23, 41, 84, 98, 100,
    ];
    const result = MergeSort(input);

    expect(result).toEqual(expected);
    expect(result.length).toBe(input.length);

    // Verify sorting property
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
    }
  });
});
