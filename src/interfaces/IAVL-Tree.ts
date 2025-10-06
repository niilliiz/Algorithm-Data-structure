export interface IAVLTree<T> {
  insert(value: T): void;
  isEmpty(): boolean;
}
