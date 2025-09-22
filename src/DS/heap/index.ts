// src/path/to/heap.ts
import { IHeap } from "../../interfaces/IHeap";

export class Heap<T> implements IHeap<T> {
  private data: T[];
  private readonly compare: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number, initialArray?: T[]) {
    this.data = [];
    this.compare =
      compare ?? ((a: any, b: any) => (a as number) - (b as number));

    if (initialArray && initialArray.length > 0) {
      this.buildHeap(initialArray);
    }
  }

  // ---- Helpers: compare-based heapify up ----
  private heapifyUpRecursive(currIndex: number) {
    if (currIndex === 0) return;

    const parentIndex = Math.floor((currIndex - 1) / 2);
    if (this.compare(this.data[parentIndex], this.data[currIndex]) > 0) {
      [this.data[parentIndex], this.data[currIndex]] = [
        this.data[currIndex],
        this.data[parentIndex],
      ];
      this.heapifyUpRecursive(parentIndex);
    } else {
      return;
    }
  }

  private heapifyUpLoop(currIndex: number) {
    let i = currIndex;

    while (i > 0) {
      const parentIndex = Math.floor((i - 1) / 2);

      if (this.compare(this.data[parentIndex], this.data[i]) > 0) {
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

  // returns -1 when no children
  private getBestChildIndex(currIndex: number, length: number): number {
    const left = currIndex * 2 + 1;
    const right = currIndex * 2 + 2;

    if (left >= length) return -1;
    if (right >= length) return left;

    return this.compare(this.data[left], this.data[right]) <= 0 ? left : right;
  }

  private heapifyDownRecursive(currIndex: number) {
    const minIndex = this.getBestChildIndex(currIndex, this.data.length);
    if (minIndex === -1) return;

    if (this.compare(this.data[currIndex], this.data[minIndex]) > 0) {
      [this.data[currIndex], this.data[minIndex]] = [
        this.data[minIndex],
        this.data[currIndex],
      ];
      this.heapifyDownRecursive(minIndex);
    } else {
      return;
    }
  }

  // length param optional; if omitted, use full array length
  private heapifyDownLoop(currIndex: number, length?: number) {
    const n = length ?? this.data.length;
    let idx = currIndex;

    while (true) {
      const bestIndex = this.getBestChildIndex(idx, n);
      if (bestIndex === -1) break;

      if (this.compare(this.data[idx], this.data[bestIndex]) > 0) {
        [this.data[idx], this.data[bestIndex]] = [
          this.data[bestIndex],
          this.data[idx],
        ];
        idx = bestIndex;
      } else {
        break;
      }
    }
  }

  extract(): T | undefined {
    if (this.isEmpty()) return;

    if (this.data.length === 1) return this.data.pop();

    const outNode = this.data[0];

    this.data[0] = this.data[this.data.length - 1];
    this.data.pop();
    this.heapifyDownLoop(0, this.data.length);

    return outNode;
  }

  buildHeap(arr: T[]) {
    // avoid mutating caller array
    this.data = arr.slice();

    let i = Math.floor(this.data.length / 2) - 1;

    while (i >= 0) {
      this.heapifyDownLoop(i, this.data.length);
      i--;
    }
  }

  peek(): T | undefined {
    return this.data[0];
  }

  size(): number {
    return this.data.length;
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  // optional utility: return a shallow copy of internal array for testing/debugging
  toArray(): T[] {
    return this.data.slice();
  }
}
