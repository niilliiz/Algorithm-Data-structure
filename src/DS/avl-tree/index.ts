import { IAVLTree } from "../../interfaces/IAVL-Tree";

type NodeObj<T> = {
  value: T;
  height: number;
  left: number; // -1 means none
  right: number; // -1 means none
  parent: number;
};

export class AVLTree<T> implements IAVLTree<T> {
  // [value, height, left, right]
  private tree: NodeObj<T>[] = [];
  private rootIdx: number;

  constructor() {
    this.tree = [];
    this.rootIdx = -1;
  }

  insertNode(newNode: NodeObj<T>) {
    if (this.isEmpty()) {
      this.rootIdx = this.tree.length;
      this.tree.push(newNode);
      return;
    }

    this.tree.push(newNode);
    let newIdx = this.tree.length - 1;

    let curr = this.rootIdx;

    while (true) {
      if (newNode.value < this.tree[curr].value) {
        // go left
        if (this.tree[curr].left === -1) {
          this.tree[curr].left = newIdx;
          this.tree[newIdx].parent = curr;
          return;
        } else {
          curr = this.tree[curr].left;
        }
      } else {
        // go right
        if (this.tree[curr].right === -1) {
          this.tree[curr].right = newIdx;
          this.tree[newIdx].parent = curr;
          return;
        } else {
          curr = this.tree[curr].right;
        }
      }
    }
  }

  insert(value: T) {
    // 1- first insert node to tree like a binary search tree
    // 2- update all heights
    // 3- start from bottom to up and see if u can find unbalanced
    // 4- if yes, find the rotation kind
    // 5- do the rotation

    const newNode = { value, height: 0, left: -1, right: -1, parent: -1 };
    this.insertNode(newNode);
  }

  isEmpty(): boolean {
    return this.rootIdx === -1;
  }
}
