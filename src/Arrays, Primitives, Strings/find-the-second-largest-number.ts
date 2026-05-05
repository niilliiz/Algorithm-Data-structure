import { Heap } from "../DS/heap";

// space: O(1) - time: O(n)
export function findTheSecondLargetsNumber_twoPointer(arr) {
  if (arr.length === 0) return;

  let first = -Infinity;
  let second = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== first && arr[i] !== second) {
      if (arr[i] > first) {
        second = first;
        first = arr[i];
      } else if (arr[i] > second) {
        second = arr[i];
      }
    }
  }

  return second;
}

findTheSecondLargetsNumber_twoPointer([-1, 10, 8, 9, 10, 9, -8, 11]);

// space: O(1) - time: O(n)
export function findTheSecondLargetsNumber_heap(arr: number[]) {
  const minHeap = new Heap<number>((a, b) => a - b);

  for (let i = 0; i < arr.length; i++) {
    if (minHeap.size() < 2) {
      minHeap.insert(arr[i]);
    } else if (arr[i] > minHeap.peek() && minHeap.peek() === arr[i]) {
      minHeap.extract();
      minHeap.insert(arr[i]);
    }
  }

  return minHeap.peek();
}

findTheSecondLargetsNumber_heap([-1, 10, 8, 9, 10, 9, -8, 11]);
