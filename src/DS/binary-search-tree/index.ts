import { IBinarySearchTree } from "../../interfaces/IBinary-Search-Tree";
import { IBinaryTreeNode } from "../../interfaces/IBinary-Tree-Node";

export class BinarySearchTree<T> {
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

    this.root = this.deleteNode(this.root, value);
  }

  private findInorderSuccessor(node: IBinaryTreeNode<T> | null): T | null {
    if (node === null) {
      return null;
    }

    if (node.left) {
      return this.findInorderSuccessor(node.left);
    } else {
      return node.value;
    }
  }

  private deleteNode(
    node: IBinaryTreeNode<T> | null,
    value: T,
  ): IBinaryTreeNode<T> {
    if (node === null) {
      return node;
    }

    if (node.value === value) {
      // found the node
      if (node.left === null && node.right === null) {
        // no child
        return null;
      } else if (
        (node.left !== null && node.right === null) ||
        (node.left === null && node.right !== null)
      ) {
        // one child
        return node.left ?? node.right;
      } else if (node.left !== null && node.right !== null) {
        // two children
        const inorderSuccessor = this.findInorderSuccessor(node.right);
        node.value = inorderSuccessor;
        node.right = this.deleteNode(node.right, inorderSuccessor);
        return node;
      }
    } else {
      if (value < node.value) {
        node.left = this.deleteNode(node.left, value);
      } else {
        node.right = this.deleteNode(node.right, value);
      }
      return node;
    }
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
