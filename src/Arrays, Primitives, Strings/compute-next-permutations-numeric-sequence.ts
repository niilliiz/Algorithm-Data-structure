// time complexity
// find pivot -> O(n)
// find successor -> O(n)
// reverse -> O(n)
// total: O(n+n+n) => O(n)

// space complexity
// O(1)

function computeNextPermutationsNumericSequence(arr: number[]): number[] {
  let pivot = -1;

  // 1. Find pivot
  let i = arr.length - 1;

  while (i > 0) {
    if (arr[i] > arr[i - 1]) {
      pivot = i - 1;
      break;
    }

    i--;
  }

  // 2. If no pivot exists,
  // array is highest permutation
  if (pivot === -1) {
    reverse(arr, 0, arr.length - 1);
    return arr;
  }

  // 3. Find successor
  let successor = -1;

  i = arr.length - 1;

  while (i > pivot) {
    if (arr[i] > arr[pivot]) {
      successor = i;
      break;
    }

    i--;
  }

  [arr[pivot], arr[successor]] = [arr[successor], arr[pivot]];

  reverse(arr, pivot + 1, arr.length - 1);

  return arr;
}

function reverse(arr: number[], left: number, right: number) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];

    left++;
    right--;
  }
}
