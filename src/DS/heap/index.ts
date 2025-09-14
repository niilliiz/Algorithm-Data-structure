import { IHeap } from "../../interfaces/IHeap";
import { IBinaryTreeNode } from "../../interfaces/IBinary-Tree-Node";

export class Heap<T> implements IHeap<T> {
  private data: T[];

  constructor() {
    this.data = [];
  }

  private heapifyUpRecursive(currIndex: number) {
    if (currIndex === 0) return;

    const parentIndex = Math.floor((currIndex - 1) / 2);
    if (this.data[parentIndex] > this.data[currIndex]) {
      [this.data[parentIndex], this.data[currIndex]] = [
        this.data[currIndex],
        this.data[parentIndex],
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

      if (this.data[parentIndex] > this.data[currIndex]) {
        [this.data[parentIndex], this.data[currIndex]] = [
          this.data[currIndex],
          this.data[parentIndex],
        ];

        i = parentIndex;
      } else {
        break;
      }
    }
  }

  insert(value: T) {
    this.data.push(value);

    this.heapifyUpRecursive(this.data.length - 1);
  }

  private heapifyDownRecursive(currIndex: number) {
    if (currIndex === this.data.length - 1) return;
    // here
  }

  delete() {
    if (this.isEmpty()) return;

    const outNode = this.data[0];

    this.data[0] = this.data[this.data.length - 1];
    this.data.pop();
    this.heapifyDownRecursive(0);
  }

  heapifyDown() {}

  buildHeap() {}

  peek() {
    return this.data[0];
  }

  size() {
    return this.data.length;
  }
  isEmpty() {
    return this.data.length === 0;
  }
}
