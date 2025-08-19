import { describe, it, expect } from "vitest";
import { InOrderTraversal } from "../../../Algorithms/tree-traversal/in-order";
import { PreOrderTraversal } from "../../../Algorithms/tree-traversal/pre-order";
import { PostOrderTraversal } from "../../../Algorithms/tree-traversal/post-order";

type AnyNode<T> = {
  value: T;
  left?: AnyNode<T> | null;
  right?: AnyNode<T> | null;
};
const N = <T>(
  value: T,
  left?: AnyNode<T> | null,
  right?: AnyNode<T> | null,
): AnyNode<T> => ({
  value,
  left: left ?? null,
  right: right ?? null,
});

describe("Binary tree traversals", () => {
  it("returns empty for null/empty tree", () => {
    expect(InOrderTraversal<number>(null)).toEqual([]);
    expect(PreOrderTraversal<number>(null)).toEqual([]);
    expect(PostOrderTraversal<number>(null)).toEqual([]);
  });

  it("single node", () => {
    const t = N(42);
    expect(InOrderTraversal(t)).toEqual([42]);
    expect(PreOrderTraversal(t)).toEqual([42]);
    expect(PostOrderTraversal(t)).toEqual([42]);
  });

  it("handles nodes with undefined children (not just null)", () => {
    const t: AnyNode<string> = { value: "A" }; // left/right are undefined
    expect(InOrderTraversal(t)).toEqual(["A"]);
    expect(PreOrderTraversal(t)).toEqual(["A"]);
    expect(PostOrderTraversal(t)).toEqual(["A"]);
  });

  it("left-skewed tree", () => {
    //    3
    //   /
    //  2
    // /
    //1
    const t = N(3, N(2, N(1)));
    expect(PreOrderTraversal(t)).toEqual([3, 2, 1]); // Root-Left-Right
    expect(InOrderTraversal(t)).toEqual([1, 2, 3]); // Left-Root-Right
    expect(PostOrderTraversal(t)).toEqual([1, 2, 3]); // Left-Right-Root
  });

  it("right-skewed tree", () => {
    // 1
    //  \
    //   2
    //    \
    //     3
    const t = N(1, null, N(2, null, N(3)));
    expect(PreOrderTraversal(t)).toEqual([1, 2, 3]);
    expect(InOrderTraversal(t)).toEqual([1, 2, 3]);
    expect(PostOrderTraversal(t)).toEqual([3, 2, 1]);
  });

  it("unbalanced mixed tree", () => {
    //          F
    //        /   \
    //       B     G
    //     /  \      \
    //    A    D      I
    //        / \    /
    //       C   E  H
    const t = N(
      "F",
      N("B", N("A"), N("D", N("C"), N("E"))),
      N("G", null, N("I", N("H"), null)),
    );
    expect(InOrderTraversal(t)).toEqual([
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
    ]);
    expect(PreOrderTraversal(t)).toEqual([
      "F",
      "B",
      "A",
      "D",
      "C",
      "E",
      "G",
      "I",
      "H",
    ]);
    expect(PostOrderTraversal(t)).toEqual([
      "A",
      "C",
      "E",
      "D",
      "B",
      "H",
      "I",
      "G",
      "F",
    ]);
  });

  it("preserves duplicates (no de-dup)", () => {
    //     2
    //    / \
    //   2   2
    const t = N(2, N(2), N(2));
    expect(InOrderTraversal(t)).toEqual([2, 2, 2]);
    expect(PreOrderTraversal(t)).toEqual([2, 2, 2]);
    expect(PostOrderTraversal(t)).toEqual([2, 2, 2]);
  });

  it("handles falsy values correctly (0, '', false)", () => {
    //         0
    //       /   \
    //     ''    false
    const t = N(0, N(""), N(false));
    // Pre: root, left, right
    expect(PreOrderTraversal(t)).toEqual([0, "", false]);
    // In: left, root, right
    expect(InOrderTraversal(t)).toEqual(["", 0, false]);
    // Post: left, right, root
    expect(PostOrderTraversal(t)).toEqual(["", false, 0]);
  });

  it("BST property sanity check: inorder should be sorted", () => {
    // Inserted as BST: 5,3,7,2,4,6,8
    const t = N(5, N(3, N(2), N(4)), N(7, N(6), N(8)));
    expect(InOrderTraversal(t)).toEqual([2, 3, 4, 5, 6, 7, 8]); // sorted
    expect(PreOrderTraversal(t)).toEqual([5, 3, 2, 4, 7, 6, 8]);
    expect(PostOrderTraversal(t)).toEqual([2, 4, 3, 6, 8, 7, 5]);
  });

  it("does not mutate the input tree (immutability)", () => {
    const t = N("A", N("B", N("D"), N("E")), N("C"));
    // Deep clone snapshot
    const snapshot = JSON.parse(JSON.stringify(t));

    // Call all traversals
    InOrderTraversal(t);
    PreOrderTraversal(t);
    PostOrderTraversal(t);

    expect(t).toEqual(snapshot);
  });

  it("works with larger depth and mixed null/undefined holes", () => {
    //        10
    //      /    \
    //    5       15
    //   / \        \
    //  3  (null)    20
    //    \
    //     4
    const t: AnyNode<number> = {
      value: 10,
      left: {
        value: 5,
        left: { value: 3, right: { value: 4 } }, // left undefined by omission
        right: null,
      },
      right: { value: 15, right: { value: 20 } }, // left undefined
    };

    expect(InOrderTraversal(t)).toEqual([3, 4, 5, 10, 15, 20]);
    expect(PreOrderTraversal(t)).toEqual([10, 5, 3, 4, 15, 20]);
    expect(PostOrderTraversal(t)).toEqual([4, 3, 5, 20, 15, 10]);
  });
});
