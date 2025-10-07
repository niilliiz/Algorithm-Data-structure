import { IAVLTree, NodeObj } from "../../interfaces/IAVL-Tree";

export class AVLTree<T> implements IAVLTree<T> {
  private tree: NodeObj<T>[] = [];
  private rootIdx: number;

  constructor() {
    this.tree = [];
    this.rootIdx = -1;
  }

  private insertNode(newNode: NodeObj<T>) {
    this.tree.push(newNode);
    const newIdx = this.tree.length - 1;

    if (this.isEmpty()) {
      this.rootIdx = newIdx;
      return;
    }

    let curr = this.rootIdx;

    while (true) {
      if (newNode.value < this.tree[curr].value) {
        // < go left
        if (this.tree[curr].left === -1) {
          this.tree[curr].left = newIdx;
          this.tree[newIdx].parent = curr;
          return;
        } else {
          curr = this.tree[curr].left;
        }
      } else {
        // >= go right
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

  /**
   * Recompute heights upward starting at startIdx.
   * Returns `{ zIdx }` for the lowest unbalanced node found, or `null` if none.
   */
  private updateHeightsUpwardFrom(startIdx: number): { zIdx: number } {
    if (startIdx === -1) return null;

    let v = startIdx;

    while (v !== -1) {
      const leftIdx = this.tree[v].left;
      const rightIdx = this.tree[v].right;

      const leftHeight = leftIdx === -1 ? -1 : this.tree[leftIdx].height;
      const rightHeight = rightIdx === -1 ? -1 : this.tree[rightIdx].height;

      const newHeight = Math.max(leftHeight, rightHeight) + 1;

      // if height didn't change, no need to continue upward
      if (this.tree[v].height === newHeight) return null;

      this.tree[v].height = newHeight;
      const BF = leftHeight - rightHeight;

      if (Math.abs(BF) > 1) {
        return { zIdx: v };
      }

      v = this.tree[v].parent;
    }

    return null;
  }

  insert(value: T) {
    // 3- start from bottom to up and see if u can find unbalanced
    // 4- if yes, find the rotation kind
    // 5- do the rotation

    const newNode: NodeObj<T> = {
      value,
      height: 0,
      left: -1,
      right: -1,
      parent: -1,
    };

    this.insertNode(newNode);
    const parentOfNew =
      this.tree.length > 0 ? this.tree[this.tree.length - 1].parent : -1;

    const unbalancedNode = this.updateHeightsUpwardFrom(parentOfNew);

    if (unbalancedNode) {
      // do the balancing
    }
  }

  isEmpty(): boolean {
    return this.rootIdx === -1;
  }

  get(): NodeObj<T>[] {
    return this.tree;
  }
}

const avlTree = new AVLTree<number>();
avlTree.insert(10);
avlTree.insert(3);
avlTree.insert(5);
avlTree.insert(15);
avlTree.insert(20);
avlTree.insert(17);
avlTree.insert(7);
avlTree.insert(30);
avlTree.insert(25);
avlTree.insert(19);
avlTree.insert(28);
avlTree.insert(29);

console.log(avlTree.get());
