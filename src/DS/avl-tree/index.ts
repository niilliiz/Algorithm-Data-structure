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
  private updateHeightsUpwardFrom(
    startIdx: number,
  ): { zIdx: number; bf: number } | null {
    if (startIdx === -1) return null;

    let v = startIdx;

    while (v !== -1) {
      const leftIdx = this.tree[v].left;
      const rightIdx = this.tree[v].right;

      const leftHeight = this.getHeightOf(leftIdx);
      const rightHeight = this.getHeightOf(rightIdx);

      const newHeight = Math.max(leftHeight, rightHeight) + 1;

      // if height didn't change, no need to continue upward
      if (this.tree[v].height === newHeight) return null;

      this.tree[v].height = newHeight;
      const BF = leftHeight - rightHeight;

      if (Math.abs(BF) > 1) {
        return { zIdx: v, bf: BF };
      }

      v = this.tree[v].parent;
    }

    return null;
  }

  private getHeightOf(idx: number): number {
    return idx === -1 ? -1 : this.tree[idx].height;
  }

  private calculateBalanceFactor(idx: number): number {
    const leftIdx = this.tree[idx].left;
    const rightIdx = this.tree[idx].right;

    const leftHeight = this.getHeightOf(leftIdx);
    const rightHeight = this.getHeightOf(rightIdx);

    return leftHeight - rightHeight;
  }

  private rotateLeft(idx: number) {}
  private rotateRight(zIdx: number): number {
    let yIdx = this.tree[zIdx].left;
    if (yIdx === -1) return zIdx;

    let t3 = this.tree[yIdx].right;
    let p = this.tree[zIdx].parent;

    this.tree[zIdx].left = t3;
    if (t3 !== -1) {
      this.tree[t3].parent = zIdx;
    }

    this.tree[yIdx].right = zIdx;
    this.tree[zIdx].parent = yIdx;

    this.tree[yIdx].parent = p;
    if (p === -1) {
      this.rootIdx = yIdx;
    } else if (this.tree[p].left === zIdx) {
      this.tree[p].left = yIdx;
    } else {
      this.tree[p].right = yIdx;
    }

    const zLeft = this.tree[zIdx].left;
    const zRight = this.tree[zIdx].right;
    const zLeftH = this.getHeightOf(zLeft);
    const zRightH = this.getHeightOf(zRight);
    this.tree[zIdx].height = 1 + Math.max(zLeftH, zRightH);

    const yLeft = this.tree[yIdx].left;
    const yRight = this.tree[yIdx].right;
    const yLeftH = this.getHeightOf(yLeft);
    const yRightH = this.getHeightOf(yRight);
    this.tree[yIdx].height = 1 + Math.max(yLeftH, yRightH);

    this.updateHeightsUpwardFrom(this.tree[yIdx].parent);

    return yIdx;
  }

  private balance({ zIdx, bf }: { zIdx: number; bf: number }) {
    if (bf > 1) {
      // left heavy and check if is not -1
      const yIdx = this.tree[zIdx].left;
      const yBf = this.calculateBalanceFactor(yIdx);

      if (yBf >= 0) {
        // left-left
        const newRoot = this.rotateRight(zIdx);
        this.updateHeightsUpwardFrom(this.tree[newRoot].parent);
      } else {
        // left-right
        const xIdx = this.rotateLeft(yIdx);
        const newRoot = this.rotateRight(zIdx);
        this.updateHeightsUpwardFrom(this.tree[newRoot].parent);
        return newRoot;
      }
    } else if (bf < -1) {
      //right heavy
      const yIdx = this.tree[zIdx].right;
      const yBf = this.calculateBalanceFactor(yIdx);

      if (yBf <= 0) {
        // right-right
        const newRoot = this.rotateLeft(zIdx);
        this.updateHeightsUpwardFrom(this.tree[newRoot].parent);
        return newRoot;
      } else {
        // right-left
        const xIdx = this.rotateRight(yIdx);
        const newRoot = this.rotateLeft(zIdx);
        this.updateHeightsUpwardFrom(this.tree[newRoot].parent);
        return newRoot;
      }
    }

    return zIdx;
  }

  insert(value: T) {
    const newNode: NodeObj<T> = {
      value,
      height: 0,
      left: -1,
      right: -1,
      parent: -1,
    };

    this.insertNode(newNode);
    const parentOfNewIdx =
      this.tree.length > 0 ? this.tree[this.tree.length - 1].parent : -1;

    const unbalancedNode = this.updateHeightsUpwardFrom(parentOfNewIdx);

    if (unbalancedNode) {
      this.balance(unbalancedNode);
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
