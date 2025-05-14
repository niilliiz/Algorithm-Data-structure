// STACK
export interface ISinglyLinkedList<T> {
  value: T;
  next?: ISinglyLinkedList<T> | undefined;
}

export interface ISinglyLinkedList<T> {
  push(value: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}
