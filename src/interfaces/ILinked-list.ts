// Singly Linked list
export interface ISinglyLinkedList<T> {
  value: T;
  next?: ISinglyLinkedList<T> | null;
}

export interface ISinglyLinkedList<T> {
  traverse(position: number): string;
  insertAtBeginning(value: T): void;
  insertAtMiddle(value: T): void;
  insertAtEnd(value: T): void;
  deleteAtBeginning(position: number): void;
  deleteAtMiddle(position: number): void;
  deleteAtEnd(position: number): void;
  search(value: T): boolean;
  sort(): string;
  isEmpty(): boolean;
  isFull(): boolean;
}
