function lomutoPartition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi];
  let i = lo - 1;
  let j = lo;

  while (j <= hi) {
    if (arr[j] <= pivot) {
      i++;
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    j++;
  }

  return i;
}

function quickSort(arr: number[], lo: number, hi: number) {
  if (lo >= hi) {
    return arr;
  }

  const pivotIndex = lomutoPartition(arr, lo, hi);

  quickSort(arr, lo, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, hi);
}

export default function QuickSortLomutoScheme(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  quickSort(arr, 0, arr.length - 1);
  return arr;
}
