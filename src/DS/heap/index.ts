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

    console.log("Heapify up hellorecursive");
  }

  // better performance than recursive if there are a lot of elements
  private heapifyUpLoop(currIndex: number) {
    let i = currIndex;

    while (i > 0) {
      const parentIndex = Math.floor((i - 1) / 2);

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

  private minChildIndexAt(currIndex: number, length: number): number {
    const left = currIndex * 2 + 1;
    const right = currIndex * 2 + 2;

    if (left >= length) return -1;
    if (right >= length) return left;

    return this.data[left] <= this.data[right] ? left : right;
  }

  private heapifyDownRecursive(currIndex: number) {
    const minIndex = this.minChildIndexAt(currIndex, this.data.length);
    if (minIndex === -1) return;

    if (this.data[currIndex] > this.data[minIndex]) {
      [this.data[currIndex], this.data[minIndex]] = [
        this.data[minIndex],
        this.data[currIndex],
      ];
      this.heapifyDownRecursive(minIndex);
    } else {
      return;
    }
  }

  private heapifyDownLoop(currIndex: number) {
    const n = this.data.length;
    let idx = currIndex;

    while (true) {
      const minIndex = this.minChildIndexAt(currIndex, this.data.length);
      if (minIndex === -1) break;

      if (this.data[currIndex] > this.data[minIndex]) {
        [this.data[currIndex], this.data[minIndex]] = [
          this.data[minIndex],
          this.data[currIndex],
        ];
        idx = minIndex;
      } else {
        break;
      }
    }
  }

  delete() {
    if (this.isEmpty()) return;

    const outNode = this.data[0];

    this.data[0] = this.data[this.data.length - 1];
    this.data.pop();
    this.heapifyDownRecursive(0);

    return outNode;
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
