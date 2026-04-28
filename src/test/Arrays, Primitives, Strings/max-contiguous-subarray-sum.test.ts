import { describe, it, expect } from "vitest";
import MaxContiguousSubArraySum from "../../Arrays, Primitives, Strings/max-contiguous-subarray-sum";

describe("MaxContiguousSubArraySum", () => {
  describe("Basic cases", () => {
    it("should find max subarray in mixed positive and negative array", () => {
      const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBe(6);
      expect(result.subArray).toEqual([4, -1, 2, 1]);
    });

    it("should handle array with all positive numbers", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBe(15);
      expect(result.subArray).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle array with all negative numbers", () => {
      const arr = [-5, -2, -8, -1, -4];
      const result = MaxContiguousSubArraySum(arr);

      // The maximum will be the least negative number
      expect(result.maxSum).toBe(-1);
      expect(result.subArray).toEqual([-1]);
    });
  });

  describe("Edge cases", () => {
    it("should handle single element array", () => {
      const arr = [5];
      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBe(5);
      expect(result.subArray).toEqual([5]);
    });

    it("should handle single negative element", () => {
      const arr = [-10];
      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBe(-10);
      expect(result.subArray).toEqual([-10]);
    });

    it("should handle array with zero", () => {
      const arr = [-2, 0, -1];
      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBe(0);
      expect(result.subArray).toEqual([0]);
    });

    it("should handle array with multiple zeros", () => {
      const arr = [0, 0, 0];
      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBe(0);
      expect(result.subArray).toEqual([0]);
    });
  });

  describe("Subarray location tests", () => {
    it("should find subarray at the beginning", () => {
      const arr = [5, 3, -10, 2, 1];
      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBe(8);
      expect(result.subArray).toEqual([5, 3]);
    });

    it("should find subarray at the end", () => {
      const arr = [-5, -3, 2, 4, 6];
      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBe(12);
      expect(result.subArray).toEqual([2, 4, 6]);
    });

    it("should find subarray in the middle", () => {
      const arr = [-1, -2, 3, 4, 5, -2, -1];
      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBe(12);
      expect(result.subArray).toEqual([3, 4, 5]);
    });

    it("should find single element subarray when it is the max", () => {
      const arr = [-1, -2, 100, -3, -4];
      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBe(100);
      expect(result.subArray).toEqual([100]);
    });
  });

  describe("Complex scenarios", () => {
    it("should handle array where extending is beneficial despite negative number", () => {
      const arr = [2, -1, 2, -1, 4, -5];
      const result = MaxContiguousSubArraySum(arr);

      // Best subarray: [2, -1, 2, -1, 4] = 6
      expect(result.maxSum).toBe(6);
      expect(result.subArray).toEqual([2, -1, 2, -1, 4]);
    });

    it("should prefer larger sum over multiple small subarrays", () => {
      const arr = [5, -3, 5, -3, 5];
      const result = MaxContiguousSubArraySum(arr);

      // [5, -3, 5, -3, 5] = 9 is better than [5] = 5
      expect(result.maxSum).toBe(9);
      expect(result.subArray).toEqual([5, -3, 5, -3, 5]);
    });

    it("should handle array with large positive and negative numbers", () => {
      const arr = [100, -200, 150, -50, 200];
      const result = MaxContiguousSubArraySum(arr);

      // [150, -50, 200] = 300 or just [200] = 200? [150, -50, 200] = 300 is better
      expect(result.maxSum).toBe(300);
      expect(result.subArray).toEqual([150, -50, 200]);
    });

    it("should handle array where extending throughout is best", () => {
      // All positive numbers, so entire array is best: 1+2+3+1+2+3 = 12
      const arr = [1, 2, 3, 1, 2, 3];
      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBe(12);
      expect(result.subArray).toEqual([1, 2, 3, 1, 2, 3]);
    });
  });

  describe("Large arrays", () => {
    it("should handle large array efficiently", () => {
      const arr = Array.from({ length: 1000 }, (_, i) => {
        // Create a pattern: positive, positive, negative
        return i % 3 === 2 ? -1 : 2;
      });

      const result = MaxContiguousSubArraySum(arr);

      expect(result.maxSum).toBeGreaterThan(0);
      expect(result.subArray.length).toBeGreaterThan(0);
      // Verify the sum calculation
      const calculatedSum = result.subArray.reduce((a, b) => a + b, 0);
      expect(calculatedSum).toBe(result.maxSum);
    });

    it("should handle array with many negative numbers and few positives", () => {
      const arr = [-1, -1, -1, -1, 5, -1, -1, -1, 6, -1];
      const result = MaxContiguousSubArraySum(arr);

      // [5] + [-1] + [6] connected = [5, -1, 6] = 10 or just [6] = 6?
      // [5, -1, 6] = 10 is better
      expect(result.maxSum).toBe(8);
      expect(result.subArray).toEqual([5, -1, -1, -1, 6]);
    });
  });

  describe("Result integrity tests", () => {
    it("should ensure subArray sum equals maxSum", () => {
      const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      const result = MaxContiguousSubArraySum(arr);

      const calculatedSum = result.subArray.reduce((sum, num) => sum + num, 0);
      expect(calculatedSum).toBe(result.maxSum);
    });

    it("should ensure subArray is contiguous in original array", () => {
      const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      const result = MaxContiguousSubArraySum(arr);

      // Find where subArray appears in original array
      const startIndex = arr.indexOf(result.subArray[0]);
      const extractedSubarray = arr.slice(
        startIndex,
        startIndex + result.subArray.length,
      );

      expect(extractedSubarray).toEqual(result.subArray);
    });

    it("should never return an empty subarray", () => {
      const testArrays = [
        [-5, -2, -8],
        [1],
        [0],
        [-1, -2, -3, -4, -5],
        [1, 2, 3, 4, 5],
      ];

      testArrays.forEach((arr) => {
        const result = MaxContiguousSubArraySum(arr);
        expect(result.subArray.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Return type tests", () => {
    it("should return an object with subArray and maxSum properties", () => {
      const arr = [1, 2, 3];
      const result = MaxContiguousSubArraySum(arr);

      expect(result).toHaveProperty("subArray");
      expect(result).toHaveProperty("maxSum");
      expect(Array.isArray(result.subArray)).toBe(true);
      expect(typeof result.maxSum).toBe("number");
    });

    it("should return subArray as a new array instance", () => {
      const arr = [1, 2, 3];
      const result = MaxContiguousSubArraySum(arr);

      // Verify it's an array created by slice (not same reference)
      expect(result.subArray).not.toBe(arr);
    });
  });
});
