export interface IHeap<T> {
  insert(value: T): void; // Heapify up
  delete(): T | undefined; // extract root
  peek(): T | undefined;
  heapifyDown(array: T[]): void;
  buildHeap(array: T[]): void; // heapify
}
