export function InsertionSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      for (let j = i - 1; j >= 0; j--) {
        if (arr[i] < arr[i - 1]) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
        } else {
          break;
        }
      }
    }
  }

  return arr;
}
