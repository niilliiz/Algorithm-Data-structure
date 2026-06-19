const list = [-20, -12, -11, -8, -3, -2, 0, 1, 3, 5, 7, 9, 11, 15, 19];

function squaresOfASortedArray(arr: number[]): number[] {
  let left = 0;
  let right = arr.length - 1;

  const result = Array(arr.length);
  let k = right;

  while (left <= right) {
    const positiveLeft = Math.abs(arr[left]);
    const positiveRight = Math.abs(arr[right]);

    if (positiveLeft > positiveRight) {
      result[k] = positiveLeft ** 2;
      left++;
    } else {
      result[k] = positiveRight ** 2;
      right--;
    }

    k--;
  }

  return result;
}

squaresOfASortedArray(list);
