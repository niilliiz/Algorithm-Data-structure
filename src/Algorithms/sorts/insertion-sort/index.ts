export default function InsertionSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && key < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
}
