/**
 * You are given an integer array heights where heights[i] represents the height of the ith bar *
 * You may choose any two bars to form a container. Return the maximum amount of water a container can store.
 *
 * Example 1:
 * Input: height = [1,7,2,5,4,7,3,6]
 * Output: 36
 *
 * Example 2:
 * Input: height = [2,2,2]
 * Output: 4
 */

/**
 * ✅ Time complexity: O(n)
 * ✅ Space complexity: O(1)
 */

function maxArea(heights: number[]): number {
  let l = 0;
  let r = heights.length - 1;

  let maxArea = 0;

  while (l < r) {
    const width = r - l;
    const minH = Math.min(heights[l], heights[r]);
    const currentArea = width * minH;

    maxArea = Math.max(currentArea, maxArea);

    if (heights[l] < heights[r]) {
      l++;
    } else {
      r--;
    }
  }

  return maxArea;
}
