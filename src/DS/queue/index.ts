import { IQueue, IQueueNode } from "../../interfaces/interfaces";

export class Queue<T> implements IQueue<T> {
  private length: number;
  private head: IQueueNode<T> | undefined;
  private tail: IQueueNode<T> | undefined;
  private readonly size: number;

  constructor(size: number) {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
    this.size = size;
  }

  enqueue(value: T): void {
    if (this.isFull()) {
      return;
    }

    const node = { value } as IQueueNode<T>;
    if (this.isEmpty()) {
      this.head = this.tail = node;
      this.length++;

      return;
    }

    this.length++;

    this.tail.next = node;
    this.tail = node;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const outNode = this.head;

    if (this.head === this.tail) {
      this.head = this.tail = undefined;
    } else {
      this.head = this.head!.next;
    }

    this.length--;

    outNode!.next = undefined; // safe now
    return outNode!.value;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.head!.value;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  isFull(): boolean {
    return this.length === this.size;
  }
  getSize(): number {
    return this.length;
  }
}
