import { getRandomArray } from "../../../utils/array-random";

function BinarySearch(arr: number[], value: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((high + low) / 2);

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

BinarySearch(getRandomArray(), 45);
