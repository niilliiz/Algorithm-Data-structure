import { IDeQueue, IDeQueueNode } from "../../interfaces/interfaces";

export class DeQueue<T> implements IDeQueue<T> {
  private length: number;
  private readonly size: number;
  private head: IDeQueueNode<T> | undefined;
  private tail: IDeQueueNode<T> | undefined;

  constructor(size: number) {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
    this.size = size;
  }

  addHead(value: T): void {
    if (this.isFull()) {
      return;
    }
  }
  addTail(value: T) {
    if (this.isFull()) {
      return;
    }
  }

  removeHead(): T | undefined {
    if (this.isEmpty()) {
      return;
    }
  }
  removeTail(): T | undefined {
    if (this.isEmpty()) {
      return;
    }
  }

  peekHead(): T | undefined {
    return this.head?.value;
  }
  peekTail(): T | undefined {
    return this.tail?.value;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }
  isFull(): boolean {
    return this.size === this.length;
  }

  getSize(): number {
    return this.size;
  }
}
