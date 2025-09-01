import { IBinarySearchTree } from "../../interfaces/IBinary-Search-Tree";
import { IBinaryTreeNode } from "../../interfaces/IBinary-Tree-Node";

export class BinarySearchTree<T> implements IBinarySearchTree<T> {
  private root: IBinaryTreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(
    node: IBinaryTreeNode<T> | null,
    value: T,
  ): IBinaryTreeNode<T> {
    if (node === null) {
      return { value, left: null, right: null };
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  delete(value: T): T | undefined {
    if (this.isEmpty()) return undefined;
    // TODO: Implement deletion logic
  }

  search(value: T): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.searchNode(this.root, value);
  }

  private searchNode(node: IBinaryTreeNode<T> | null, value: T): T | undefined {
    if (node === null) {
      return undefined;
    }

    if (value === node.value) {
      return node.value;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else {
      return this.searchNode(node.right, value);
    }
  }

  isEmpty(): boolean {
    return this.root === null;
  }
}
