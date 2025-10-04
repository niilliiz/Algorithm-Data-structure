import { IAVLTree } from "../../interfaces/IAVL-Tree";

export class AVLTree<T> implements IAVLTree<T> {
  private tree: [];

  constructor() {
    this.tree = [];
  }

  insert(value: T) {
    // 1- first insert node to tree like a binary search tree
    // 2- update all heights
    // 3- start from bottom to up and see if u can find unbalanced
    // 4- if yes, find the rotation kind
    // 5- do the rotation
  }
}
