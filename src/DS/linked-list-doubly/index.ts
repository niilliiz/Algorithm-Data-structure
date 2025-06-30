import { ILinkedList, ILinkedListNode } from "../../interfaces/ILinked-list";

export default class DoublyLinkedList<T> implements ILinkedList<T, true> {
  private length: number;
  private head: ILinkedListNode<T, true> | undefined;
  private tail: ILinkedListNode<T, true> | undefined;
  private readonly size: number;

  constructor(size: number) {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
    this.size = size;
  }

  traverse(position?: number): ILinkedListNode<T, true> | null {
    if (this.isEmpty()) return null;

    if (position === undefined) {
      return this.tail || null;
    }

    if (position < 0 || position >= this.length) {
      return null;
    }

    const fromStart = position;
    const fromEnd = this.length - 1 - position;

    if (fromStart <= fromEnd) {
      // Traverse from head (forward)
      let currentNode = this.head;
      for (let i = 0; i < position && currentNode; i++) {
        currentNode = currentNode.next;
      }
      return currentNode;
    } else {
      // Traverse from tail (backward)
      let currentNode = this.tail;
      for (let i = 0; i < fromEnd && currentNode; i++) {
        currentNode = currentNode.prev;
      }
      return currentNode;
    }
  }

  insertAtBeginning(value: T) {
    if (this.isFull()) {
      return;
    }

    const node = { value } as ILinkedListNode<T, true>;

    if (this.isEmpty()) {
      this.head = this.tail = node;
      node.next = undefined;
      node.prev = undefined;

      this.length++;
      return;
    }

    this.length++;

    const currentNode = this.head;
    this.head = node;
    node.next = currentNode;
    node.prev = undefined;
    currentNode.prev = node;

    return;
  }

  insertAtMiddle(value: T, position: number) {
    if (this.isFull()) {
      return null;
    }

    if (this.isEmpty() || position === 0) {
      this.insertAtBeginning(value);

      return;
    }

    if (position === this.length) {
      this.insertAtEnd(value);

      return;
    }

    const node = { value } as ILinkedListNode<T, true>;
    const currentNode = this.traverse(position);

    if (currentNode) {
      this.length++;

      node.next = currentNode;
      node.prev = currentNode.prev;

      currentNode.prev.next = node;
      currentNode.prev = node;
    }
  }

  insertAtEnd(value: T) {
    if (this.isFull()) {
      return null;
    }
  }

  deleteAtBeginning(): T | undefined {
    if (this.isEmpty()) {
      return null;
    }
  }
  deleteAtEnd(): T | undefined {
    if (this.isEmpty()) {
      return null;
    }
  }
  deleteAtMiddle(position: number): T | undefined {
    if (this.isEmpty()) {
      return null;
    }
  }

  isFull(): boolean {
    return this.size === this.length;
  }
  isEmpty(): boolean {
    return this.length === 0;
  }
}
