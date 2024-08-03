export interface IStack<T> {
  readonly size: number;

  get count(): number;

  isEmpty(): boolean;
  isFull(): boolean;

  peek(): T | undefined;
  push(data: T): IStack<T>;
  pop(): T | undefined;

  empty(): void;

  contains(item: T): boolean;
}
