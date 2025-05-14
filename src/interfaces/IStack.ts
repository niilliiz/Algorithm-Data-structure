// STACK
export interface IStackNode<T> {
  value: T;
  prev?: IStackNode<T> | undefined;
}

export interface IStack<T> {
  push(value: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}
