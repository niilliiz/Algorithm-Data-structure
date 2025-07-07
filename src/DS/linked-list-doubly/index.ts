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
      return this.tail || undefined;
    }

    if (position < 0 || position >= this.length) {
      return;
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
      this.length++;

      this.head = node;
      this.tail = node;
      node.next = undefined;
      node.prev = undefined;

      return;
    }

    this.length++;

    const firstNode = this.head!;
    this.head = node;
    node.next = firstNode;
    node.prev = undefined;
    firstNode.prev = node;

    return;
  }

  insertAtMiddle(value: T, position: number) {
    if (this.isFull()) {
      return;
    }

    if (this.isEmpty() || position === 0) {
      return this.insertAtBeginning(value);
    }

    if (position === this.length) {
      return this.insertAtEnd(value);
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
      return;
    }

    if (this.isEmpty()) {
      return this.insertAtBeginning(value);
    }

    this.length++;

    const node = { value } as ILinkedListNode<T, true>;
    const lastNode = this.tail;
    this.tail = node;
    node.prev = lastNode;
    lastNode.next = node;
    node.next = undefined;
  }

  deleteAtBeginning(): T | undefined {
    if (this.isEmpty()) {
      return;
    }

    if (this.length === 1) {
      this.length--;

      const value = this.head.value;
      this.head = this.tail = undefined;

      return value;
    }

    this.length--;

    const outNode = this.head;
    this.head = outNode.next;
    outNode.next.prev = undefined;
    outNode.prev = undefined;
    outNode.next = undefined;

    return outNode.value;
  }
  deleteAtEnd(): T | undefined {
    if (this.isEmpty()) {
      return;
    }

    if (this.length === 1) {
      this.length--;

      const value = this.tail.value;
      this.head = this.tail = undefined;

      return value;
    }

    this.length--;
    const outNode = this.tail;
    this.tail = outNode.prev;
    outNode.prev.next = undefined;

    outNode.next = undefined;
    outNode.prev = undefined;

    return outNode.value;
  }
  deleteAtMiddle(position: number): T | undefined {
    if (this.isEmpty()) {
      return;
    }

    if (position === 0) {
      return this.deleteAtEnd();
    }

    if (this.isFull() || position === this.length - 1) {
      return this.deleteAtEnd();
    }

    const outNode = this.traverse(position);

    if (outNode) {
      this.length--;
      outNode.prev.next = outNode.next;
      outNode.next.prev = outNode.prev;

      outNode.next = outNode.prev = undefined;

      return outNode.value;
    }
  }

  isFull(): boolean {
    return this.size === this.length;
  }
  isEmpty(): boolean {
    return this.head === undefined;
  }
}

// const list = new DoublyLinkedList(5);
// list.insertAtBeginning(1);
//
// console.log(list.isEmpty());
// console.log(list.traverse(0));
