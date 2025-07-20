import { describe, it, expect } from "vitest";
import InsertionSort from "../../../Algorithms/sorts/insertion-sort";

describe("Insertion Sort Algorithm", () => {
  describe("Edge Cases", () => {
    it("should handle empty array", () => {
      expect(InsertionSort([])).toEqual([]);
    });

    it("should handle single element array", () => {
      expect(InsertionSort([5])).toEqual([5]);
    });

    it("should handle two element array - unsorted", () => {
      expect(InsertionSort([5, 2])).toEqual([2, 5]);
    });

    it("should handle two element array - already sorted", () => {
      expect(InsertionSort([2, 5])).toEqual([2, 5]);
    });
  });

  describe("Best Case - Already Sorted Arrays", () => {
    it("should handle already sorted small array", () => {
      expect(InsertionSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle already sorted larger array", () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(InsertionSort(input)).toEqual(expected);
    });

    it("should handle nearly sorted array (one element out of place)", () => {
      expect(InsertionSort([1, 2, 4, 3, 5])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("Worst Case - Reverse Sorted Arrays", () => {
    it("should handle reverse sorted small array", () => {
      expect(InsertionSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle reverse sorted larger array", () => {
      const input = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(InsertionSort(input)).toEqual(expected);
    });
  });

  describe("Average Case - Random Arrays", () => {
    it("should sort random unsorted array", () => {
      expect(InsertionSort([9, 4, 5, 2, 8, 1, 3, 0, 1, 11])).toEqual([
        0, 1, 1, 2, 3, 4, 5, 8, 9, 11,
      ]);
    });

    it("should sort array with mixed positive and negative numbers", () => {
      expect(InsertionSort([3, -1, 0, 5, -3, 2])).toEqual([-3, -1, 0, 2, 3, 5]);
    });

    it("should sort array with all negative numbers", () => {
      expect(InsertionSort([-5, -2, -8, -1, -3])).toEqual([-8, -5, -3, -2, -1]);
    });
  });

  describe("Special Cases", () => {
    it("should handle array with duplicate elements", () => {
      expect(InsertionSort([5, 2, 5, 1, 2, 5])).toEqual([1, 2, 2, 5, 5, 5]);
    });

    it("should handle array with all identical elements", () => {
      expect(InsertionSort([7, 7, 7, 7, 7])).toEqual([7, 7, 7, 7, 7]);
    });

    it("should handle array with zeros", () => {
      expect(InsertionSort([0, 3, 0, 1, 0])).toEqual([0, 0, 0, 1, 3]);
    });

    it("should handle large numbers", () => {
      expect(InsertionSort([1000000, 999999, 1000001])).toEqual([
        999999, 1000000, 1000001,
      ]);
    });

    it("should handle decimal numbers", () => {
      expect(InsertionSort([3.14, 2.71, 1.41, 4.2])).toEqual([
        1.41, 2.71, 3.14, 4.2,
      ]);
    });
  });

  describe("Performance Considerations", () => {
    it("should handle medium-sized array efficiently", () => {
      const input = Array.from({ length: 100 }, () =>
        Math.floor(Math.random() * 100),
      );
      const result = InsertionSort([...input]);
      const expected = [...input].sort((a, b) => a - b);

      expect(result).toEqual(expected);
      expect(result.length).toBe(100);
    });

    it("should not modify original array (if we want immutability)", () => {
      const original = [3, 1, 4, 1, 5];
      const originalCopy = [...original];
      const result = InsertionSort(original);

      expect(original).toEqual(result);
      expect(original).not.toEqual(originalCopy);
    });
  });

  describe("Correctness Verification", () => {
    it("should produce same result as built-in sort for random arrays", () => {
      const testCases = [
        [64, 34, 25, 12, 22, 11, 90],
        [5, 2, 4, 6, 1, 3],
        [1],
        [],
        [2, 1],
        [1, 1, 1],
        [-5, 0, 3, -2, 1],
      ];

      testCases.forEach((testCase) => {
        const insertionResult = InsertionSort([...testCase]);
        const builtInResult = [...testCase].sort((a, b) => a - b);
        expect(insertionResult).toEqual(builtInResult);
      });
    });

    it("should maintain all elements (no elements lost or added)", () => {
      const input = [9, 4, 5, 2, 8, 1, 3, 0, 1, 11];
      const result = InsertionSort([...input]);

      expect(result.length).toBe(input.length);

      const inputFreq = input.reduce(
        (acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        },
        {} as Record<number, number>,
      );

      const resultFreq = result.reduce(
        (acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        },
        {} as Record<number, number>,
      );

      expect(resultFreq).toEqual(inputFreq);
    });

    it("should produce sorted array (ascending order)", () => {
      const input = [9, 4, 5, 2, 8, 1, 3, 0, 1, 11];
      const result = InsertionSort([...input]);

      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });
  });
});
