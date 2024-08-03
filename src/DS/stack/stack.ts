// tsx src/DS/linked-list/linked-list.ts command

import { IStack } from "../../interfaces/interface-stack";

class Stack<T> implements IStack<T> {
  readonly size: number;
  private top: number;
  private array: Array<T>;

  constructor(size: number) {
    this.array = new Array<T>(size);
    this.size = size;
    this.top = -1;
  }

  get count(): number {
    return 0;
  }

  isEmpty(): boolean {
    return true;
  }
  isFull(): boolean {
    return true;
  }

  peek(): T | undefined {
    return undefined;
  }
  pop(): T | undefined {
    return undefined;
  }
  push(data: T): Stack<T> {}
  empty(): void {}
  contains(item: T): boolean {
    return false;
  }
}

const ll = new Stack();
