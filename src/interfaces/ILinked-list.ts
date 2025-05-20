// Singly Linked list
export interface ISinglyLinkedListNode<T> {
  value: T;
  next?: ISinglyLinkedListNode<T> | null;
}

export interface ISinglyLinkedList<T> {
  traverse(position?: number | undefined): ISinglyLinkedListNode<T>;
  insertAtBeginning(value: T): void;
  insertAtMiddle(value: T, position: number): void;
  insertAtEnd(value: T): void;
  deleteAtBeginning(position: number): void;
  deleteAtMiddle(position: number): void;
  deleteAtEnd(position: number): void;
  search(value: T): boolean;
  sort(): string;
  print(): string;
  isEmpty(): boolean;
  isFull(): boolean;
}
