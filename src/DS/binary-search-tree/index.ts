import { IBinarySearchTree } from "../../interfaces/IBinary-Search-Tree";
import { IBinaryTreeNode } from "../../interfaces/IBinary-Tree-Node";

export class BinarySearchTree<T> implements IBinarySearchTree<T> {
  private root: IBinaryTreeNode<T> | null;
  constructor() {
    this.root = null;
  }

  insert(node: IBinaryTreeNode<T>, value: T): T {
    if (this.isEmpty()) {
      this.root = { value, left: null, right: null };
      return;
    }

    if (node === null) {
      return value;
    }

    if (node.value < value) {
      this.insert(node.left, value);
    } else {
      this.insert(node.right, value);
    }
  }
  delete(value: T): T | undefined {
    if (this.isEmpty()) return undefined;
  }
  search(value: T): T | undefined {
    if (this.isEmpty()) return undefined;
  }
  isEmpty(): boolean {
    return this.root === null;
  }
}
