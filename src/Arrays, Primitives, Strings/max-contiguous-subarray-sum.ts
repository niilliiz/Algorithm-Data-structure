export default function MaxContiguousSubArraySum(arr: number[]) {
  let currentSum = 0;
  let maxSum = -Infinity;
  let bestStart = 0;
  let bestEnd = 0;
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
      bestStart = currentStart;
      bestEnd = pos;
    }
  }
  const subArray = arr.slice(bestStart, bestEnd + 1);
  return { subArray, maxSum };
}
