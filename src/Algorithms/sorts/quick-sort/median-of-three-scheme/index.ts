import { hoarePartition } from "../hoare-scheme";

function quickSort(arr: number[], lo: number, hi: number) {
  if (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const medianValue = [arr[lo], arr[mid], arr[hi]].sort((a, b) => a - b)[1];

    let medianIndex: number;
    if (medianValue === arr[lo]) {
      medianIndex = lo;
    } else if (medianValue === arr[mid]) {
      medianIndex = mid;
    } else {
      medianIndex = hi;
    }

    [arr[lo], arr[medianIndex]] = [arr[medianIndex], arr[lo]];
    const pivotIndex = hoarePartition(arr, lo, hi);

    quickSort(arr, lo, pivotIndex);
    quickSort(arr, pivotIndex + 1, hi);
  }
}

export default function QuickSortMedianOfThreeScheme(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  quickSort(arr, 0, arr.length - 1);
  return arr;
}
