export interface ILinkedList<T> {
  get length(): number;

  traverse(): string;
  search(data: T): boolean;
  sort(): void;

  insertAtBeginning(data: T): void;
  insertAtEnd(data: T): void;
  insertAt(data: T, index: number): void;

  deleteFromBeginning(): void;
  deleteFromEnd(): void;
  deleteFrom(index: number): void;
}

export interface ILinkedListNode<T> {
  data: T;
  next: ILinkedListNode<T> | null;
}
