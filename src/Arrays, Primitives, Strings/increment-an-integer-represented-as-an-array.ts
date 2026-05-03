// Time -> Best case: O(n) with early break (like [1,2,9] → [1,3,0]) - Worst case: O(n) + O(n) = O(2n) = O(n) (like [9,9,9])
// Space -> Best case: O(1) with early break (like [1,2,9] → [1,3,0]) - Worst case: O(n) create new array (like [9,9,9])

function PlusOne(arr: number[]): number[] {
  let carry = 1;

  for (let i = arr.length - 1; i >= 0; i--) {
    const plusOne = arr[i] + carry;

    if (plusOne === 10) {
      carry = 1;
      arr[i] = 0;
    } else {
      carry = 0;
      arr[i] = plusOne;
      break;
    }
  }

  if (carry === 1) {
    return [1, ...arr];
  }

  return arr;
}
