export interface ILinkedList<T> {
  getNode(index: number): ILinkedListNode<T> | undefined;

  get length(): number;

  traverse(): string;
  search(data: T): number | -1;
  sort(): void;

  insertAtBeginning(data: T): void;
  insertAtEnd(data: T): void;
  insertAt(data: T, index: number): void;

  deleteFromBeginning(data: T): void;
  deleteFromEnd(data: T): void;
  deleteFrom(data: T, index: number): void;
}

export interface ILinkedListNode<T> {
  data: T;
  next: ILinkedListNode<T> | null;
}
