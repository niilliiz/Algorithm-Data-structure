import { IDeQueue, IDeQueueNode } from "../../interfaces/IQueue";

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

    const node = { value } as IDeQueueNode<T>;

    if (this.isEmpty()) {
      this.length++;
      this.head = this.tail = node;
      return;
    }

    this.length++;

    node.next = this.head;
    this.head!.prev = node;
    this.head = node;
  }
  addTail(value: T) {
    if (this.isFull()) {
      return;
    }

    if (this.isEmpty()) {
      this.addHead(value);
      return;
    }

    const node = { value } as IDeQueueNode<T>;
    this.length++;

    node.prev = this.tail;
    this.tail!.next = node;
    this.tail = node;
  }

  removeHead(): T | undefined {
    if (this.isEmpty()) {
      return;
    }

    const outNode = this.head;
    this.length--;

    if (this.head === this.tail) {
      this.tail = this.head = undefined;

      outNode.next = outNode.prev = undefined;
      return outNode.value;
    }

    this.head = outNode.next;
    this.head.prev = undefined;
    outNode.next = outNode.prev = undefined;

    return outNode.value;
  }
  removeTail(): T | undefined {
    if (this.isEmpty()) {
      return;
    }

    if (this.head === this.tail) {
      return this.removeHead();
    }

    const outNode = this.tail;
    this.length--;

    this.tail = outNode.prev;
    this.tail.next = undefined;
    outNode.prev = undefined;

    return outNode.value;
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
