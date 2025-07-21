function merge(arr: number[], lo: number, hi: number): number[] {
  if (lo === hi) {
    return arr;
  }

  const mid = lo + Math.floor(hi - lo);
  const left = merge(arr, lo, mid);
  const right = merge(arr, mid + 1, hi);
}

export default function MergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
  }

  return merge(arr, 0, arr.length - 1);
}
