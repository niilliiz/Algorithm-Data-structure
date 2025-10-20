/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
 *
 * Example 1:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 */

// number of pairs => n(n-1)/2
// time complexity: O(n^2)
// space: O(1)
function twoSum_bruteForce(
  arr: number[],
  target: number,
): [i: number, j: number] | "not found" {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }

  return "not found";
}

// time and space: O(n)
function twoSum_obj(
  nums: number[],
  target: number,
): [number, number] | "not found" {
  const map: Record<number, number> = {}; // stores number → index

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];

    if (map[needed] !== undefined) {
      return [map[needed], i];
    }

    map[nums[i]] = i;
  }

  return "not found";
}

function twoSum_map(arr: number[], target: number): [number, number] | null {
  const mapped = new Map<number, number>();

  for (let i = 0; i < arr.length; i++) {
    const minus = target - arr[i];

    if (mapped.has(minus)) {
      return [mapped.get(minus)!, i];
    }

    mapped.set(arr[i], i);
  }

  return null;
}
