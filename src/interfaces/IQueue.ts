// QUEUE
export interface IQueueNode<T> {
  value: T;
  next?: IQueueNode<T> | undefined;
}

export interface IQueue<T> {
  enqueue(value: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  isFull(): boolean;
  getSize(): number;
}

// DEQUEUE
export interface IDeQueueNode<T> {
  value: T;
  next?: IDeQueueNode<T> | undefined;
  prev?: IDeQueueNode<T> | undefined;
}

export interface IDeQueue<T> {
  addHead(value: T): void;
  addTail(value: T): void;
  removeHead(): T | undefined;
  removeTail(): T | undefined;
  peekHead(): T | undefined;
  peekTail(): T | undefined;
  isEmpty(): boolean;
  isFull(): boolean;
  getSize(): number;
}
