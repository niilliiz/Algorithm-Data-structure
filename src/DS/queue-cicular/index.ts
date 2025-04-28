import { IQueue, IQueueNode } from "../../interfaces/interfaces";

export class QueueCircular<T> implements IQueue<T> {
  private length: number;
  private readonly size: number;
  private head: IQueueNode<T> | undefined;
  private tail: IQueueNode<T> | undefined;

  constructor(size: number) {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
    this.size = size;
  }

  enqueue(value: T) {
    if (this.isFull()) {
      return;
    }

    const node = { value } as IQueueNode<T>;
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
      this.tail.next = this.head;
      this.length++;

      return;
    }

    this.length++;
    this.tail.next = node;
    this.tail = node;
    this.tail.next = this.head;
    return;
  }
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return;
    }

    if (this.head === this.tail) {
      const outNode = this.head;
      this.head = this.tail = undefined;

      this.length--;
      return outNode.value;
    }

    this.length--;
    const outNode = this.head;

    this.head = outNode.next;
    this.tail.next = this.head;

    outNode.next = undefined;
    return outNode.value;
  }
  peek(): T | undefined {
    return this.head?.value;
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
