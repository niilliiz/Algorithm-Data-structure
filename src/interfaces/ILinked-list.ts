export interface ILinkedListNode<T, HasPrev extends boolean = false> {
  value: T;
  next?: ILinkedListNode<T, HasPrev> | null;
  prev?: HasPrev extends true ? ILinkedListNode<T, HasPrev> | null : never;
}

export interface ILinkedList<T, HasPrev extends boolean = false> {
  traverse(position?: number): ILinkedListNode<T, HasPrev> | null;
  insertAtBeginning(value: T): void;
  insertAtMiddle(value: T, position: number): void;
  insertAtEnd(value: T): void;
  deleteAtBeginning(position: number): T | undefined;
  deleteAtMiddle(position: number): T | undefined;
  deleteAtEnd(position: number): T | undefined;
  isEmpty(): boolean;
  isFull(): boolean;
}
