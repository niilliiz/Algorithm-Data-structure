import { IHeap } from "../../interfaces/IHeap";
import { IBinaryTreeNode } from "../../interfaces/IBinary-Tree-Node";

export class Heap<T> implements IHeap<T> {
  private array: T[];

  constructor() {
    this.array = [];
  }

  private heapifyUpRecursive(currIndex: number) {
    if (currIndex === 0) return;

    const parentIndex = Math.floor((currIndex - 1) / 2);
    if (this.array[parentIndex] > this.array[currIndex]) {
      [this.array[parentIndex], this.array[currIndex]] = [
        this.array[currIndex],
        this.array[parentIndex],
      ];
      this.heapifyUpRecursive(parentIndex);
    } else {
      return;
    }
  }

  // better performance than recursive if there are a lot of elements
  private heapifyUpLoop(currIndex: number) {
    let i = currIndex;

    while (i > 0) {
      const parentIndex = Math.floor((currIndex - 1) / 2);

      if (this.array[parentIndex] > this.array[currIndex]) {
        [this.array[parentIndex], this.array[currIndex]] = [
          this.array[currIndex],
          this.array[parentIndex],
        ];

        i = parentIndex;
      } else {
        break;
      }
    }
  }

  insert(value: T) {
    this.array.push(value);

    this.heapifyUpRecursive(this.array.length - 1);
  }

  private heapifyDownRecursive(currIndex: number) {
    if (currIndex === this.array.length - 1) return;
    // here
  }

  delete() {
    if (this.isEmpty()) return;

    const outNode = this.array[0];

    this.array[0] = this.array[this.array.length - 1];
    this.array.pop();
    this.heapifyDownRecursive(0);
  }

  heapifyDown() {}

  buildHeap() {}

  peek() {
    return this.array[0];
  }

  size() {
    return this.array.length;
  }
  isEmpty() {
    return this.array.length === 0;
  }
}
