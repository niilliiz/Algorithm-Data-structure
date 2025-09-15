import { IHeap } from "../../interfaces/IHeap";

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
      const parentIndex = Math.floor((i - 1) / 2);

      if (this.data[parentIndex] > this.data[i]) {
        [this.data[parentIndex], this.data[i]] = [
          this.data[i],
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

    this.heapifyUpLoop(this.data.length - 1);
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

  private heapifyDownLoop(currIndex: number, length: number) {
    let idx = currIndex;

    while (true) {
      const minIndex = this.minChildIndexAt(idx, length);
      if (minIndex === -1) break;

      if (this.data[idx] > this.data[minIndex]) {
        [this.data[idx], this.data[minIndex]] = [
          this.data[minIndex],
          this.data[idx],
        ];
        idx = minIndex;
      } else {
        break;
      }
    }
  }

  extract() {
    if (this.isEmpty()) return;

    if (this.data.length === 1) return this.data.pop();

    const outNode = this.data[0];

    this.data[0] = this.data[this.data.length - 1];
    this.data.pop();
    this.heapifyDownLoop(0, this.data.length);

    return outNode;
  }

  buildHeap(arr: T[]) {
    this.data = arr.slice();

    let i = Math.floor(this.data.length / 2) - 1;

    while (i >= 0) {
      this.heapifyDownLoop(i, this.data.length);
      i--;
    }
  }

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
