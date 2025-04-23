import { IStackNode } from "../../interfaces/interfaces";

export default class Stack<T> {
  private length: number;
  private head: IStackNode<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
  }

  push(value: T): void {
    const node = { value } as IStackNode<T>;

    if (this.isEmpty()) {
      this.length++;

      this.head = node;
      return;
    }

    this.length++;

    node.prev = this.head;
    this.head = node;
  }
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    this.length--;

    const poppedNode = this.head;
    this.head = this.head.prev;

    poppedNode.prev = undefined;
    return poppedNode.value;
  }
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.head.value;
  }
  isEmpty(): boolean {
    return this.length === 0;
  }
  size(): number {
    return this.length;
  }
}
