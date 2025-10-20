/**
 * Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
 *
 * Example 1:
 * Input: nums = [1,2,3,1]
 * Output: true
 *
 * Example 2:
 * Input: nums = [1,2,3,4]
 * Output: false
 */

// Time Complexity: O(n)
// Space Complexity: O(n)
function MyAnswer_isContainedDuplication(nums: number[]): boolean {
  const object = {};
  for (let i = 0; i < nums.length; i++) {
    object[nums[i]] = (object[nums[i]] ?? 0) + 1;

    if (object[nums[i]] > 1) {
      return true;
    }
  }

  return false;
}

// Time Complexity: O(n)
// Space Complexity: O(n)
function OtherAnswer_isContainedDuplication(nums: number[]): boolean {
  const seen = new Set();

  for (let num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }

  return false;
}
