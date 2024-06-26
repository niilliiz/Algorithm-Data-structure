import { getSortedRandomArray } from "../../../utils/array-random";

export function BinarySearch(arr: number[], value: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((high + low) / 2);

    if (arr[mid] === value) {
      return mid;
    }

    if (value < arr[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return -1;
}

BinarySearch(getSortedRandomArray(), -8);
