import {
  ISinglyLinkedList,
  ISinglyLinkedListNode,
} from "../../interfaces/ILinked-list";

export default class SinglyLinkedList<T> implements ISinglyLinkedList<T> {
  private length: number;
  private head: ISinglyLinkedListNode<T> | undefined;
  private readonly size: number;

  constructor(size: number) {
    this.length = 0;
    this.head = undefined;
    this.size = size;
  }

  print(): string {}

  traverse(position?: number | undefined): ISinglyLinkedListNode<T> {
    if (this.isEmpty()) return null;

    let count = 0;
    let currentNode = this.head;

    if (position === undefined) {
      while (currentNode?.next) {
        currentNode = currentNode.next;
      }
      return currentNode;
    }

    while (count < position - 1 && currentNode?.next) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
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
  insertAtMiddle(value: T, position: number) {
    // at pos-1 -> this.traverse(position-1)

    if (this.isFull()) {
      return;
    }
  }

  deleteAtBeginning(position: number) {
    // at pos-1 -> this.traverse(position-1)
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
