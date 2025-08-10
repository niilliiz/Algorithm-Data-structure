function hoarePartition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[lo];
  let i = lo - 1;
  let j = hi + 1;

  while (true) {
    do {
      i++;
    } while (arr[i] < pivot);

    do {
      j--;
    } while (arr[j] > pivot);

    if (i >= j) {
      return j;
    }

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function quickSort(arr: number[], lo: number, hi: number) {
  if (lo < hi) {
    const index = hoarePartition(arr, lo, hi);

    quickSort(arr, lo, index);
    quickSort(arr, index + 1, hi);
  }
}

export default function QuickSortHoareScheme(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  quickSort(arr, 0, arr.length - 1);
  return arr;
}
