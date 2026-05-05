// O(n)

/**
 * arr: [−2, 1, −3, 4, −1, 2, 1, −5, 4]
 * solution: { subArray: [ 4, -1, 2, 1 ], maxSum: 6 }
 */

export default function MaxContiguousSubArraySum(arr: number[]) {
  let currentSum = 0;
  let maxSum = -Infinity;
  let subStart = 0;
  let subEnd = 0;
  let currentStart = 0;

  for (let pos = 0; pos < arr.length; pos++) {
    const optionA = arr[pos] + currentSum;
    const optionB = arr[pos];
    const isExtending = optionA > optionB;

    if (isExtending) {
      currentSum = optionA;
    } else {
      currentSum = optionB;
      currentStart = pos;
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      subStart = currentStart;
      subEnd = pos;
    }
  }
  const subArray = arr.slice(subStart, subEnd + 1);
  return { subArray, maxSum };
}
