// tsx src/DS/linked-list/linked-list.ts command

import {
  ILinkedList,
  ILinkedListNode,
} from "../../interfaces/interface-linked-list";

class LinkedList<T> implements ILinkedList<T> {
  private head: ILinkedListNode<T> = null;

  private getNode(index: number): ILinkedListNode<T> | undefined {
    let pointer = this.head;
    let i = 0;
    while (pointer.next !== null) {
      if (i === index) {
        return pointer;
      }
      pointer = pointer.next;
      i++;
    }
  }

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

  insertAt(data: T, index: number): void {
    if (index === 0) {
      this.insertAtBeginning(data);
    } else {
      const prevNode = this.getNode(index - 1);

      if (prevNode) {
        prevNode.next = { data, next: prevNode.next };
      }
    }
  }

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

  deleteFromBeginning(): void {
    if (this.head.next) {
      this.head = this.head.next;
    }
  }

  deleteFrom(index: number): void {
    if (index === 0) {
      this.deleteFromBeginning();
      return;
    }

    const prevNode = this.getNode(index - 1);

    if (prevNode) {
      const currentNode = prevNode.next;

      if (currentNode) {
        const nextNode = currentNode.next;

        if (nextNode) {
          prevNode.next = nextNode;

          currentNode.next = null;
        } else {
          prevNode.next = null;
        }
      }
    }
  }

  deleteFromEnd(): void {
    let pointer = this.head;
    while (pointer.next.next !== null) {
      pointer = pointer.next;
    }

    pointer.next = null;
  }
}

const ll = new LinkedList();

ll.traverse();
ll.insertAtBeginning("1");
