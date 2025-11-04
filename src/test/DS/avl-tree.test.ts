import { describe, it, expect, beforeEach } from "vitest";
import { AVLTree } from "../../DS/avl-tree";

describe("AVLTree", () => {
  let tree: AVLTree<number>;

  beforeEach(() => {
    tree = new AVLTree<number>();
  });

  it("should start empty", () => {
    expect(tree.isEmpty()).toBe(true);
    expect(tree.get().length).toBe(0);
  });

  it("should insert a single value", () => {
    tree.insert(10);

    const nodes = tree.get();
    expect(nodes.length).toBe(1);
    expect(nodes[0].value).toBe(10);
    expect(tree.isEmpty()).toBe(false);
  });

  it("should maintain BST property when inserting multiple values", () => {
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);

    const nodes = tree.get();
    const root = nodes.find((n) => n.parent === -1)!;

    expect(root.value).toBe(10);
    expect(nodes[root.left].value).toBe(5);
    expect(nodes[root.right].value).toBe(15);
  });

  it("should rebalance (Right rotation) when inserting 30, 20, 10", () => {
    tree.insert(30);
    tree.insert(20);
    tree.insert(10);

    const nodes = tree.get();
    const root = nodes.find((n) => n.parent === -1)!;

    expect(root.value).toBe(20);
    expect(nodes[root.left].value).toBe(10);
    expect(nodes[root.right].value).toBe(30);
  });

  it("should rebalance (Left rotation) when inserting 10, 20, 30", () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);

    const nodes = tree.get();
    const root = nodes.find((n) => n.parent === -1)!;

    expect(root.value).toBe(20);
    expect(nodes[root.left].value).toBe(10);
    expect(nodes[root.right].value).toBe(30);
  });

  it("should perform Left-Right (LR) rotation when inserting 30, 10, 20", () => {
    // Sequence that triggers LR rotation
    tree.insert(30);
    tree.insert(10);
    tree.insert(20);

    const nodes = tree.get();
    const root = nodes.find((n) => n.parent === -1)!;

    // After LR rotation root should be 20
    expect(root.value).toBe(20);
    expect(nodes[root.left].value).toBe(10);
    expect(nodes[root.right].value).toBe(30);
  });

  it("should perform Right-Left (RL) rotation when inserting 10, 30, 20", () => {
    // Sequence that triggers RL rotation
    tree.insert(10);
    tree.insert(30);
    tree.insert(20);

    const nodes = tree.get();
    const root = nodes.find((n) => n.parent === -1)!;

    // After RL rotation root should be 20
    expect(root.value).toBe(20);
    expect(nodes[root.left].value).toBe(10);
    expect(nodes[root.right].value).toBe(30);
  });

  it("should delete a leaf node", () => {
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);

    const nodesBefore = tree.get();
    const leafIdx = nodesBefore.findIndex((n) => n.value === 5);

    const deletedValue = tree.delete(leafIdx);
    expect(deletedValue).toBe(5);

    const nodesAfter = tree.get();
    expect(nodesAfter[leafIdx].parent).toBe(-1);
  });

  it("should delete root node correctly", () => {
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);

    const rootIdx = tree.get().findIndex((n) => n.parent === -1);
    const deletedValue = tree.delete(rootIdx);
    expect(deletedValue).toBe(10);

    const newRoot = tree.get().find((n) => n.parent === -1);
    expect(newRoot).toBeDefined();
  });

  it("should remain balanced after multiple insertions", () => {
    const values = [50, 25, 75, 10, 30, 60, 80, 5, 15];
    values.forEach((v) => tree.insert(v));

    const nodes = tree.get();
    const root = nodes.find((n) => n.parent === -1)!;

    const leftHeight = nodes[root.left]?.height ?? 0;
    const rightHeight = nodes[root.right]?.height ?? 0;
    const balanceFactor = leftHeight - rightHeight;

    expect(Math.abs(balanceFactor)).toBeLessThanOrEqual(1);
  });
});
