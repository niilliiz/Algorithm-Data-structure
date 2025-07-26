function merge(arr: number[], lo: number, hi: number): number[] {
  if (lo === hi) {
    return [arr[lo]];
  }

  const mid = lo + Math.floor((hi - lo) / 2);
  const leftArray = merge(arr, lo, mid);
  const rightArray = merge(arr, mid + 1, hi);

  let k = 0;
  let i = 0;
  let j = 0;

  const sortedArray: number[] = [];

  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      sortedArray[k] = leftArray[i];
      i++;
    } else {
      sortedArray[k] = rightArray[j];
      j++;
    }
    k++;
  }

  while (i < leftArray.length) {
    sortedArray[k] = leftArray[i];
    i++;
    k++;
  }

  while (j < rightArray.length) {
    sortedArray[k] = rightArray[j];
    j++;
    k++;
  }

  return sortedArray;
}

export default function MergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  return merge(arr, 0, arr.length - 1);
}
