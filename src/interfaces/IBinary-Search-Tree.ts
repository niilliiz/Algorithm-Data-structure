import { IBinaryTreeNode } from "./IBinary-Tree-Node";

export interface IBinarySearchTree<T> {
  insert(node: IBinaryTreeNode<T>, value: T): void;
  delete(value: T): T | undefined;
  search(value: T): T | undefined;
  isEmpty(): boolean;
}
