export type NodeObj<T> = {
  value: T;
  height: number;
  left: number; // -1 means none
  right: number; // -1 means none
  parent: number; // -1 means root
};

export interface IAVLTree<T> {
  insert(value: T): void;
  isEmpty(): boolean;
  get(): NodeObj<T>[];
}
