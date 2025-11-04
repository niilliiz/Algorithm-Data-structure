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
        if (this.tree[curr].left === -1) {
          this.tree[curr].left = newIdx;
          this.tree[newIdx].parent = curr;
          return;
        } else {
          curr = this.tree[curr].left;
        }
      } else {
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

  private getHeightOf(idx: number): number {
    return idx === -1 ? -1 : this.tree[idx].height;
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
      const leftHeight = this.getHeightOf(this.tree[v].left);
      const rightHeight = this.getHeightOf(this.tree[v].right);
      const newHeight = 1 + Math.max(leftHeight, rightHeight);

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

  private calculateBalanceFactor(idx: number): number {
    const leftIdx = this.tree[idx].left;
    const rightIdx = this.tree[idx].right;

    const leftHeight = this.getHeightOf(leftIdx);
    const rightHeight = this.getHeightOf(rightIdx);

    return leftHeight - rightHeight;
  }

  private rotateLeft(zIdx: number): number {
    let yIdx = this.tree[zIdx].right;
    if (yIdx === -1) return zIdx;

    let t2 = this.tree[yIdx].left;
    let p = this.tree[zIdx].parent;

    this.tree[zIdx].right = t2;
    if (t2 !== -1) {
      this.tree[t2].parent = zIdx;
    }

    this.tree[yIdx].left = zIdx;
    this.tree[zIdx].parent = yIdx;

    this.tree[yIdx].parent = p;
    if (p === -1) {
      this.rootIdx = yIdx;
    } else if (this.tree[p].left === zIdx) {
      this.tree[p].left = yIdx;
    } else {
      this.tree[p].right = yIdx;
    }

    this.tree[zIdx].height =
      1 +
      Math.max(
        this.getHeightOf(this.tree[zIdx].left),
        this.getHeightOf(this.tree[zIdx].right),
      );

    this.tree[yIdx].height =
      1 +
      Math.max(
        this.getHeightOf(this.tree[yIdx].left),
        this.getHeightOf(this.tree[yIdx].right),
      );

    return yIdx;
  }
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

    this.tree[zIdx].height =
      1 +
      Math.max(
        this.getHeightOf(this.tree[zIdx].left),
        this.getHeightOf(this.tree[zIdx].right),
      );

    this.tree[yIdx].height =
      1 +
      Math.max(
        this.getHeightOf(this.tree[yIdx].left),
        this.getHeightOf(this.tree[yIdx].right),
      );

    return yIdx;
  }

  private balance({ zIdx, bf }: { zIdx: number; bf: number }) {
    if (bf > 1) {
      // left heavy
      const yIdx = this.tree[zIdx].left;
      if (yIdx === -1) return zIdx;

      const yBf = this.calculateBalanceFactor(yIdx);

      if (yBf >= 0) {
        // left-left
        return this.rotateRight(zIdx);
      } else {
        // left-right
        const _ = this.rotateLeft(yIdx);
        return this.rotateRight(zIdx);
      }
    } else if (bf < -1) {
      //right heavy
      const yIdx = this.tree[zIdx].right;
      if (yIdx === -1) return zIdx;

      const yBf = this.calculateBalanceFactor(yIdx);

      if (yBf <= 0) {
        // right-right
        return this.rotateLeft(zIdx);
      } else {
        // right-left
        const _ = this.rotateRight(yIdx);
        return this.rotateLeft(zIdx);
      }
    }

    return zIdx;
  }

  private rebalanceUpwardFrom(startIdx: number) {
    if (startIdx === -1) return;

    let v = startIdx;

    while (v !== -1) {
      const leftH = this.getHeightOf(this.tree[v].left);
      const rightH = this.getHeightOf(this.tree[v].right);

      const newHeight = 1 + Math.max(leftH, rightH);
      if (this.tree[v].height === newHeight) break;
      this.tree[v].height = newHeight;

      const bf = leftH - rightH;

      if (Math.abs(bf) > 1) {
        const newRootIdx = this.balance({ zIdx: v, bf });

        v = this.tree[newRootIdx].parent;
      } else {
        v = this.tree[v].parent;
      }
    }
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

    this.rebalanceUpwardFrom(parentOfNewIdx);
  }

  private findSuccessor(nodeIdx: number): number {
    if (this.tree[nodeIdx].right === -1) return -1;
    let successor = this.tree[nodeIdx].right;
    while (this.tree[successor].left !== -1) {
      successor = this.tree[successor].left;
    }
    return successor;
  }

  private isNodeInTree(idx: number): boolean {
    if (this.isEmpty()) return false;
    if (idx < 0 || idx >= this.tree.length) return false;
    const n = this.tree[idx];
    return (
      idx === this.rootIdx || n.parent !== -1 || n.left !== -1 || n.right !== -1
    );
  }

  delete(outNodeIdx: number) {
    if (!this.isNodeInTree(outNodeIdx)) return null;

    const originalOutNodeValue = this.tree[outNodeIdx].value;
    if (
      this.tree[outNodeIdx].left !== -1 &&
      this.tree[outNodeIdx].right !== -1
    ) {
      let successorIdx = this.findSuccessor(outNodeIdx);

      this.tree[outNodeIdx].value = this.tree[successorIdx].value;

      outNodeIdx = successorIdx;
    }

    const outNode = this.tree[outNodeIdx];
    const parentIdx = outNode.parent;
    const leftIdx = outNode.left;
    const rightIdx = outNode.right;

    if (leftIdx === -1 && rightIdx === -1) {
      if (parentIdx === -1) {
        this.rootIdx = -1;
      } else {
        if (this.tree[parentIdx].left === outNodeIdx) {
          this.tree[parentIdx].left = -1;
        } else if (this.tree[parentIdx].right === outNodeIdx) {
          this.tree[parentIdx].right = -1;
        }
      }

      outNode.parent = outNode.left = outNode.right = -1;

      this.rebalanceUpwardFrom(parentIdx);

      return originalOutNodeValue;
    }

    const childIdx = leftIdx !== -1 ? leftIdx : rightIdx;
    if (parentIdx === -1) {
      this.rootIdx = childIdx;
      this.tree[childIdx].parent = -1;
    } else {
      if (this.tree[parentIdx].left === outNodeIdx) {
        this.tree[parentIdx].left = childIdx;
      } else if (this.tree[parentIdx].right === outNodeIdx) {
        this.tree[parentIdx].right = childIdx;
      }
      this.tree[childIdx].parent = parentIdx;
    }

    outNode.parent = outNode.left = outNode.right = -1;

    this.rebalanceUpwardFrom(parentIdx);

    return originalOutNodeValue;
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
