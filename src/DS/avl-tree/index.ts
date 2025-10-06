import { IAVLTree, NodeObj } from "../../interfaces/IAVL-Tree";

export class AVLTree<T> implements IAVLTree<T> {
  // [value, height, left, right]
  private tree: NodeObj<T>[] = [];
  private rootIdx: number;

  constructor() {
    this.tree = [];
    this.rootIdx = -1;
  }

  private insertNode(newNode: NodeObj<T>) {
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

  private calculateHeight() {
    const newIdx = this.tree.length - 1;
    let v = this.tree[newIdx].parent;

    while (v !== -1) {
      const leftHeight =
        this.tree[v].left === -1 ? -1 : this.tree[this.tree[v].left].height;
      const rightHeight =
        this.tree[v].right === -1 ? -1 : this.tree[this.tree[v].right].height;

      this.tree[v].height = Math.max(leftHeight, rightHeight) + 1;

      v = this.tree[v].parent;
    }
  }

  insert(value: T) {
    // 2- update all heights
    // 3- start from bottom to up and see if u can find unbalanced
    // 4- if yes, find the rotation kind
    // 5- do the rotation

    const newNode = { value, height: 0, left: -1, right: -1, parent: -1 };
    this.insertNode(newNode);
    this.calculateHeight();
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
