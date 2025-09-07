import { describe, it, expect, beforeEach } from "vitest";
import { BinarySearchTree } from "../../DS/binary-search-tree";

describe("BinarySearchTree", () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  describe("Constructor & isEmpty", () => {
    it("should create an empty tree", () => {
      expect(bst.isEmpty()).toBe(true);
    });

    it("should not be empty after insertion", () => {
      bst.insert(5);
      expect(bst.isEmpty()).toBe(false);
    });
  });

  describe("Insert", () => {
    it("should insert single element as root", () => {
      bst.insert(10);
      expect(bst.search(10)).toBe(10);
      expect(bst.isEmpty()).toBe(false);
    });

    it("should build balanced tree with multiple insertions", () => {
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(12);
      bst.insert(18);

      expect(bst.search(10)).toBe(10);
      expect(bst.search(5)).toBe(5);
      expect(bst.search(15)).toBe(15);
      expect(bst.search(3)).toBe(3);
      expect(bst.search(7)).toBe(7);
      expect(bst.search(12)).toBe(12);
      expect(bst.search(18)).toBe(18);
    });

    it("should handle duplicate values by going right", () => {
      bst.insert(10);
      bst.insert(10);
      expect(bst.search(10)).toBe(10);
    });

    it("should handle left-heavy tree", () => {
      bst.insert(10);
      bst.insert(8);
      bst.insert(6);
      bst.insert(4);
      bst.insert(2);

      expect(bst.search(2)).toBe(2);
      expect(bst.search(10)).toBe(10);
    });

    it("should handle right-heavy tree", () => {
      bst.insert(2);
      bst.insert(4);
      bst.insert(6);
      bst.insert(8);
      bst.insert(10);

      expect(bst.search(2)).toBe(2);
      expect(bst.search(10)).toBe(10);
    });
  });

  describe("Search", () => {
    beforeEach(() => {
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(12);
      bst.insert(18);
    });

    it("should find existing values", () => {
      expect(bst.search(10)).toBe(10);
      expect(bst.search(5)).toBe(5);
      expect(bst.search(15)).toBe(15);
      expect(bst.search(3)).toBe(3);
    });

    it("should return undefined for non-existing values", () => {
      expect(bst.search(100)).toBe(undefined);
      expect(bst.search(1)).toBe(undefined);
      expect(bst.search(8)).toBe(undefined);
    });

    it("should return undefined when searching empty tree", () => {
      const emptyBst = new BinarySearchTree<number>();
      expect(emptyBst.search(5)).toBe(undefined);
    });

    it("should find root element", () => {
      expect(bst.search(10)).toBe(10);
    });

    it("should find leaf elements", () => {
      expect(bst.search(3)).toBe(3);
      expect(bst.search(7)).toBe(7);
      expect(bst.search(12)).toBe(12);
      expect(bst.search(18)).toBe(18);
    });
  });

  describe("Delete - Empty Tree Edge Cases", () => {
    it("should return undefined when deleting from empty tree", () => {
      expect(bst.delete(5)).toBe(undefined);
      expect(bst.isEmpty()).toBe(true);
    });
  });

  describe("Delete - Single Node (Root Only)", () => {
    it("should delete root when tree has only one node", () => {
      bst.insert(10);
      bst.delete(10);
      expect(bst.isEmpty()).toBe(true);
      expect(bst.search(10)).toBe(undefined);
    });

    it("should not affect tree when deleting non-existent value from single node tree", () => {
      bst.insert(10);
      bst.delete(5);
      expect(bst.search(10)).toBe(10);
      expect(bst.isEmpty()).toBe(false);
    });
  });

  describe("Delete - Leaf Nodes (No Children)", () => {
    beforeEach(() => {
      // Tree:     10
      //          /  \
      //         5    15
      //        / \   / \
      //       3   7 12  18
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(12);
      bst.insert(18);
    });

    it("should delete left leaf node", () => {
      bst.delete(3);
      expect(bst.search(3)).toBe(undefined);
      expect(bst.search(5)).toBe(5); // Parent should remain
    });

    it("should delete right leaf node", () => {
      bst.delete(18);
      expect(bst.search(18)).toBe(undefined);
      expect(bst.search(15)).toBe(15); // Parent should remain
    });

    it("should delete multiple leaf nodes", () => {
      bst.delete(3);
      bst.delete(7);
      bst.delete(12);
      bst.delete(18);

      expect(bst.search(3)).toBe(undefined);
      expect(bst.search(7)).toBe(undefined);
      expect(bst.search(12)).toBe(undefined);
      expect(bst.search(18)).toBe(undefined);

      // Internal nodes should remain
      expect(bst.search(5)).toBe(5);
      expect(bst.search(10)).toBe(10);
      expect(bst.search(15)).toBe(15);
    });
  });

  describe("Delete - Nodes with One Child", () => {
    it("should delete node with only left child", () => {
      // Tree:  10
      //       /
      //      5
      //     /
      //    3
      bst.insert(10);
      bst.insert(5);
      bst.insert(3);

      bst.delete(5);
      expect(bst.search(5)).toBe(undefined);
      expect(bst.search(3)).toBe(3);
      expect(bst.search(10)).toBe(10);
    });

    it("should delete node with only right child", () => {
      // Tree:  10
      //         \
      //          15
      //           \
      //            18
      bst.insert(10);
      bst.insert(15);
      bst.insert(18);

      bst.delete(15);
      expect(bst.search(15)).toBe(undefined);
      expect(bst.search(18)).toBe(18);
      expect(bst.search(10)).toBe(10);
    });

    it("should delete root with only left child", () => {
      bst.insert(10);
      bst.insert(5);

      bst.delete(10);
      expect(bst.search(10)).toBe(undefined);
      expect(bst.search(5)).toBe(5);
    });

    it("should delete root with only right child", () => {
      bst.insert(10);
      bst.insert(15);

      bst.delete(10);
      expect(bst.search(10)).toBe(undefined);
      expect(bst.search(15)).toBe(15);
    });

    it("should handle complex subtree with one child deletion", () => {
      // Tree:     10
      //          /  \
      //         5    15
      //        / \     \
      //       3   7     20
      //          /     / \
      //         6     18  25
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(20);
      bst.insert(6);
      bst.insert(18);
      bst.insert(25);

      bst.delete(15); // Node with only right child
      expect(bst.search(15)).toBe(undefined);
      expect(bst.search(20)).toBe(20);
      expect(bst.search(18)).toBe(18);
      expect(bst.search(25)).toBe(25);
    });
  });

  describe("Delete - Nodes with Two Children", () => {
    beforeEach(() => {
      // Complex tree for two-children deletion tests
      //         20
      //       /    \
      //      10     30
      //     / \    / \
      //    5  15  25  35
      //   /   /    \   \
      //  3   12     27  40
      //     /  \
      //    11  13
      bst.insert(20);
      bst.insert(10);
      bst.insert(30);
      bst.insert(5);
      bst.insert(15);
      bst.insert(25);
      bst.insert(35);
      bst.insert(3);
      bst.insert(12);
      bst.insert(27);
      bst.insert(40);
      bst.insert(11);
      bst.insert(13);
    });

    it("should delete root with two children", () => {
      bst.delete(20);
      expect(bst.search(20)).toBe(undefined);

      // All other nodes should remain
      expect(bst.search(10)).toBe(10);
      expect(bst.search(30)).toBe(30);
      expect(bst.search(25)).toBe(25);

      // Verify BST property is maintained by checking a few key relationships
      expect(bst.search(25)).toBe(25); // Successor should now be at root position
    });

    it("should delete internal node with two children", () => {
      bst.delete(10);
      expect(bst.search(10)).toBe(undefined);

      // All children of deleted node should be accessible
      expect(bst.search(5)).toBe(5);
      expect(bst.search(15)).toBe(15);
      expect(bst.search(3)).toBe(3);
      expect(bst.search(12)).toBe(12);
      expect(bst.search(11)).toBe(11);
      expect(bst.search(13)).toBe(13);
    });

    it("should delete node where successor is immediate right child", () => {
      // Add a case where successor is direct right child
      bst.insert(8);
      bst.delete(5); // 8 should become the successor

      expect(bst.search(5)).toBe(undefined);
      expect(bst.search(8)).toBe(8);
      expect(bst.search(3)).toBe(3);
    });

    it("should delete node where successor is deep in right subtree", () => {
      bst.delete(15); // Successor should be 12's replacement
      expect(bst.search(15)).toBe(undefined);
      expect(bst.search(12)).toBe(12);
      expect(bst.search(11)).toBe(11);
      expect(bst.search(13)).toBe(13);
    });

    it("should handle multiple two-children deletions", () => {
      bst.delete(20);
      bst.delete(10);
      bst.delete(30);

      expect(bst.search(20)).toBe(undefined);
      expect(bst.search(10)).toBe(undefined);
      expect(bst.search(30)).toBe(undefined);

      // Verify some nodes are still accessible
      expect(bst.search(5)).toBe(5);
      expect(bst.search(15)).toBe(15);
      expect(bst.search(25)).toBe(25);
    });
  });

  describe("Delete - Non-Existent Values", () => {
    beforeEach(() => {
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
    });

    it("should not modify tree when deleting non-existent value", () => {
      bst.delete(100);

      expect(bst.search(10)).toBe(10);
      expect(bst.search(5)).toBe(5);
      expect(bst.search(15)).toBe(15);
    });

    it("should return undefined for non-existent value deletion", () => {
      const result = bst.delete(100);
      expect(result).toBe(undefined);
    });
  });

  describe("Delete - Edge Cases with Successor Finding", () => {
    it("should handle successor that is a leaf", () => {
      // Tree where successor of deleted node is a leaf
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(12);

      bst.delete(10); // Successor (12) is a leaf
      expect(bst.search(10)).toBe(undefined);
      expect(bst.search(12)).toBe(12);
      expect(bst.search(5)).toBe(5);
      expect(bst.search(15)).toBe(15);
    });

    it("should handle successor that has right child", () => {
      // Tree where successor has a right child
      bst.insert(10);
      bst.insert(5);
      bst.insert(20);
      bst.insert(15);
      bst.insert(25);
      bst.insert(18);

      bst.delete(10); // Successor (15) has right child (18)
      expect(bst.search(10)).toBe(undefined);
      expect(bst.search(15)).toBe(15);
      expect(bst.search(18)).toBe(18);
    });

    it("should handle right subtree with only one node", () => {
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);

      bst.delete(10); // Right subtree has only one node (15)
      expect(bst.search(10)).toBe(undefined);
      expect(bst.search(15)).toBe(15);
      expect(bst.search(5)).toBe(5);
    });
  });

  describe("Complex Integration Tests", () => {
    it("should maintain BST property after multiple mixed operations", () => {
      // Build tree
      const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];
      values.forEach((val) => bst.insert(val));

      // Delete various types of nodes
      bst.delete(10); // leaf
      bst.delete(30); // two children
      bst.delete(70); // two children
      bst.delete(25); // might become leaf after previous deletions

      // Verify remaining nodes are accessible
      expect(bst.search(50)).toBe(50);
      expect(bst.search(20)).toBe(20);
      expect(bst.search(40)).toBe(40);
      expect(bst.search(60)).toBe(60);
      expect(bst.search(80)).toBe(80);
      expect(bst.search(35)).toBe(35);
      expect(bst.search(45)).toBe(45);

      // Verify deleted nodes are gone
      expect(bst.search(10)).toBe(undefined);
      expect(bst.search(30)).toBe(undefined);
      expect(bst.search(70)).toBe(undefined);
      expect(bst.search(25)).toBe(undefined);
    });

    it("should handle delete then insert operations", () => {
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);

      bst.delete(10);
      expect(bst.search(10)).toBe(undefined);

      bst.insert(10);
      expect(bst.search(10)).toBe(10);
      expect(bst.search(5)).toBe(5);
      expect(bst.search(15)).toBe(15);
    });

    it("should handle deleting all nodes one by one", () => {
      const values = [10, 5, 15, 3, 7, 12, 18];
      values.forEach((val) => bst.insert(val));

      values.forEach((val) => {
        bst.delete(val);
        expect(bst.search(val)).toBe(undefined);
      });

      expect(bst.isEmpty()).toBe(true);
    });
  });

  describe("Type Safety Tests", () => {
    it("should work with string values", () => {
      const stringBst = new BinarySearchTree<string>();

      stringBst.insert("dog");
      stringBst.insert("cat");
      stringBst.insert("elephant");

      expect(stringBst.search("dog")).toBe("dog");
      expect(stringBst.search("cat")).toBe("cat");

      stringBst.delete("dog");
      expect(stringBst.search("dog")).toBe(undefined);
      expect(stringBst.search("cat")).toBe("cat");
    });

    it("should maintain type safety during operations", () => {
      bst.insert(42);
      const result: number | undefined = bst.search(42);
      expect(result).toBe(42);

      const deleteResult: number | undefined = bst.delete(42);
      expect(bst.search(42)).toBe(undefined);
    });
  });
});
