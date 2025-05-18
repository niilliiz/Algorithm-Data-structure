import { ISinglyLinkedList } from "../../interfaces/ILinked-list";

export default class SinglyLinkedList<T> implements ISinglyLinkedList<T> {
  private length: number;
  private head: ISinglyLinkedList<T> | undefined;
  private readonly size: number;

  constructor(size: number) {
    this.length = 0;
    this.head = undefined;
    this.size = size;
  }

  traverse(position?: number): string {
    if (this.isEmpty()) return "";

    // if position is given, means we want to traverse to the position
    // if position is not given, means we want to traverse to the end of lined-list(next is null)
  }

  insertAtBeginning(value: T) {
    if (this.isFull()) {
      return;
    }
  }
  insertAtEnd(value: T) {
    if (this.isFull()) {
      return;
    }
  }
  insertAtMiddle(value: T) {
    if (this.isFull()) {
      return;
    }
  }

  deleteAtBeginning(position: number) {
    if (this.isEmpty()) {
      return;
    }
  }
  deleteAtEnd(position: number) {
    if (this.isEmpty()) {
      return;
    }
  }
  deleteAtMiddle(position: number) {
    if (this.isEmpty()) {
      return;
    }
  }

  search(value: T): boolean {}
  sort(): string {}

  isFull(): boolean {
    return this.size === this.length;
  }
  isEmpty(): boolean {
    return this.length === 0;
  }
}
