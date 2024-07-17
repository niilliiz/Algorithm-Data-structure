// tsx src/DS/linked-list/linked-list.ts command

import {
  ILinkedList,
  ILinkedListNode,
} from "../../interfaces/interface-linked-list";

class LinkedList<T> implements ILinkedList<T> {
  head: ILinkedListNode<T> = null;

  get(index: number): T {}

  get length(): number {}

  traverse(): string {
    let temp = this.head;
    let traverse = "";

    while (temp.next !== null) {
      traverse = traverse + `->${temp.data}`;
      temp = temp.next;
    }

    return traverse;
  }

  search(data: T): number | -1 {}
  sort(): void {}

  insertAtBeginning(data: T): void {
    this.head = {
      data,
      next: this.head,
    };
  }
  insertAt(data: T, index: number): void {}
  insertAtEnd(data: T): void {
    const newNode: ILinkedListNode<T> = {
      data,

      next: null,
    };
    if (this.head === null) {
      this.head = newNode;
    } else {
      let temp = this.head;

      while (temp.next !== null) {
        temp = temp.next;
      }

      temp.next = newNode;
    }
  }

  deleteFromBeginning(data: T): void {}
  deleteFrom(data: T, index: number): void {}
  deleteFromEnd(data: T): void {}
}

const ll = new LinkedList();

ll.traverse();
ll.insertAtBeginning("1");
