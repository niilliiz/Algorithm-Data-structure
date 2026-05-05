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

function UnOptimized_PlusOne(arr) {
  let num = Number(arr.join("")); // O(n)
  num = num + 1; // O(1)
  return String(num).split("").map(Number); // O(n)
}

/*
* Time Complexity: O(n) - Space Complexity: O(n) — new arrays created during conversions
Problem: Fails with large arrays! JavaScript numbers have a limit (~2^53). [9,9,9,...huge array] will lose precision.
* */
