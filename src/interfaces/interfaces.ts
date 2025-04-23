// STACK
export interface IStackNode<T> {
  value: T;
  prev?: IStackNode<T>;
}

export interface IStack<T> {
  push(value: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}

// QUEUE
export interface IQueueNode<T> {
  value: T;
  prev?: IQueueNode<T>;
}

export interface IQueue<T> {
  enqueue(value: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  isFull(): boolean;
}
