export interface ISinglyLinkedListNode<T> {
  value: T;
  next?: ISinglyLinkedListNode<T> | null;
}

export interface ISinglyLinkedList<T> {
  traverse(position?: number | undefined): ISinglyLinkedListNode<T>;
  insertAtBeginning(value: T): void;
  insertAtMiddle(value: T, position: number): void;
  insertAtEnd(value: T): void;
  deleteAtBeginning(position: number): T | undefined;
  deleteAtMiddle(position: number): T | undefined;
  deleteAtEnd(position: number): T | undefined;
  isEmpty(): boolean;
  isFull(): boolean;
}
