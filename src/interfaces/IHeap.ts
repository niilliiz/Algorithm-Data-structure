export interface IHeap<T> {
  insert(value: T): void; // Heapify up
  extract(): T | undefined; // extract root
  peek(): T | undefined;
  buildHeap(array: T[]): void; // heapify
  size(): number;
  isEmpty(): boolean;
}
