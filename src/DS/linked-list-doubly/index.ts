import { ILinkedList, ILinkedListNode } from "../../interfaces/ILinked-list";

export default class DoublyLinkedList<T> implements ILinkedList<T, true> {
  private length: number;
  private head: ILinkedListNode<T> | undefined;
  private tail: ILinkedListNode<T> | undefined;
  private readonly size: number;

  constructor(size: number) {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
    this.size = size;
  }

  traverse(position?: number): ILinkedListNode<T, true> | null {}

  insertAtBeginning(value: T) {}

  insertAtMiddle(value: T, position: number) {}

  insertAtEnd(value: T) {}

  deleteAtBeginning(): T | undefined {}
  deleteAtEnd(): T | undefined {}
  deleteAtMiddle(position: number): T | undefined {}

  isFull(): boolean {
    return this.size === this.length;
  }
  isEmpty(): boolean {
    return this.length === 0;
  }
}
