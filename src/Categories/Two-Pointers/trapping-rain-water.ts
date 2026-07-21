/*You are given an array of non-negative integers height which represent an elevation map.
Each value height[i] represents the height of a bar, which has a width of 1.
Return the maximum area of water that can be trapped between the bars.

Input: height = [0,2,0,3,1,0,1,3,2,1]
Output: 9

Constraints:
1 <= height.length <= 1000
0 <= height[i] <= 1000
*/

function trap(height: number[]): number {
  let l = 0;
  let r = height.length - 1;

  let lMax = 0;
  let rMax = 0;

  let water = 0;

  while (l < r) {
    const lH = height[l];
    const rH = height[r];

    if (lH < rH) {
      if (lH >= lMax) {
        lMax = lH;
      } else {
        water += lMax - height[l];
      }

      l++;
    } else {
      if (rH >= rMax) {
        rMax = rH;
      } else {
        water += rMax - height[r];
      }

      r--;
    }
  }
  return water;
}
