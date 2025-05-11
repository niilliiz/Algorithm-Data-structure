import { describe, it, test, expect, beforeEach } from "vitest";
import { DeQueue } from "../../DS/deque";

describe("DeQueue", () => {
  let deque: DeQueue<number>;
  const SIZE = 5;

  beforeEach(() => {
    deque = new DeQueue<number>(SIZE);
  });

  describe("Construction and Basic Properties", () => {
    test("should create an empty deque with specified size", () => {
      expect(deque).toBeDefined();
      expect(deque.isEmpty()).toBe(true);
      expect(deque.isFull()).toBe(false);
      expect(deque.getSize()).toBe(SIZE);
      expect(deque.peekHead()).toBeUndefined();
      expect(deque.peekTail()).toBeUndefined();
    });

    test("should handle zero size deque", () => {
      const zeroDeque = new DeQueue<number>(0);
      expect(zeroDeque.isEmpty()).toBe(true);
      expect(zeroDeque.isFull()).toBe(true); // A deque of size 0 is always full
      expect(zeroDeque.getSize()).toBe(0);
    });
  });

  describe("Adding Elements", () => {
    test("should add elements to head correctly", () => {
      deque.addHead(1);
      expect(deque.isEmpty()).toBe(false);
      expect(deque.peekHead()).toBe(1);
      expect(deque.peekTail()).toBe(1);

      deque.addHead(2);
      expect(deque.peekHead()).toBe(2);
      expect(deque.peekTail()).toBe(1);

      deque.addHead(3);
      expect(deque.peekHead()).toBe(3);
      expect(deque.peekTail()).toBe(1);
    });

    test("should add elements to tail correctly", () => {
      deque.addTail(1);
      expect(deque.isEmpty()).toBe(false);
      expect(deque.peekHead()).toBe(1);
      expect(deque.peekTail()).toBe(1);

      deque.addTail(2);
      expect(deque.peekHead()).toBe(1);
      expect(deque.peekTail()).toBe(2);

      deque.addTail(3);
      expect(deque.peekHead()).toBe(1);
      expect(deque.peekTail()).toBe(3);
    });

    test("should not exceed capacity when adding elements", () => {
      for (let i = 0; i < SIZE; i++) {
        deque.addHead(i);
      }
      expect(deque.isFull()).toBe(true);

      // Attempt to add one more element
      deque.addHead(100);
      expect(deque.peekHead()).toBe(SIZE - 1); // Should still be the last element we added within capacity
    });

    test("should handle multiple add operations in mixed order", () => {
      deque.addHead(1); // [1]
      deque.addTail(2); // [1, 2]
      deque.addHead(3); // [3, 1, 2]
      deque.addTail(4); // [3, 1, 2, 4]

      expect(deque.peekHead()).toBe(3);
      expect(deque.peekTail()).toBe(4);
    });
  });

  describe("Removing Elements", () => {
    test("should remove elements from head correctly", () => {
      deque.addHead(1);
      deque.addHead(2);
      deque.addHead(3);

      expect(deque.removeHead()).toBe(3);
      expect(deque.peekHead()).toBe(2);
      expect(deque.removeHead()).toBe(2);
      expect(deque.peekHead()).toBe(1);
      expect(deque.removeHead()).toBe(1);
      expect(deque.isEmpty()).toBe(true);
      expect(deque.removeHead()).toBeUndefined();
    });

    test("should remove elements from tail correctly", () => {
      deque.addTail(1);
      deque.addTail(2);
      deque.addTail(3);

      expect(deque.removeTail()).toBe(3);
      expect(deque.peekTail()).toBe(2);
      expect(deque.removeTail()).toBe(2);
      expect(deque.peekTail()).toBe(1);
      expect(deque.removeTail()).toBe(1);
      expect(deque.isEmpty()).toBe(true);
      expect(deque.removeTail()).toBeUndefined();
    });

    test("should handle removing the only element correctly", () => {
      deque.addHead(42);
      expect(deque.removeHead()).toBe(42);
      expect(deque.isEmpty()).toBe(true);
      expect(deque.peekHead()).toBeUndefined();
      expect(deque.peekTail()).toBeUndefined();

      deque.addTail(24);
      expect(deque.removeTail()).toBe(24);
      expect(deque.isEmpty()).toBe(true);
    });

    test("should handle multiple remove operations in mixed order", () => {
      // Add elements
      deque.addHead(1); // [1]
      deque.addHead(2); // [2, 1]
      deque.addHead(3); // [3, 2, 1]
      deque.addTail(4); // [3, 2, 1, 4]

      // Remove in mixed order
      expect(deque.removeHead()).toBe(3); // [2, 1, 4]
      expect(deque.removeTail()).toBe(4); // [2, 1]
      expect(deque.removeHead()).toBe(2); // [1]
      expect(deque.removeTail()).toBe(1); // []
      expect(deque.isEmpty()).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    test("should handle adding after reaching full capacity", () => {
      // Fill the deque
      for (let i = 0; i < SIZE; i++) {
        deque.addHead(i);
      }

      // Try adding more elements
      deque.addHead(100);
      deque.addTail(101);

      // Size should still be maximum capacity
      expect(deque.isFull()).toBe(true);

      // Remove one element to make space
      deque.removeHead();
      expect(deque.isFull()).toBe(false);

      // Now we can add again
      deque.addHead(102);
      expect(deque.peekHead()).toBe(102);
      expect(deque.isFull()).toBe(true);
    });

    test("should handle removing from empty deque", () => {
      expect(deque.removeHead()).toBeUndefined();
      expect(deque.removeTail()).toBeUndefined();

      // Add and remove to verify deque still works
      deque.addHead(1);
      expect(deque.removeHead()).toBe(1);
      expect(deque.isEmpty()).toBe(true);

      // Try removing again from empty
      expect(deque.removeHead()).toBeUndefined();
    });

    test("should handle single element edge cases", () => {
      // Empty -> Add -> Remove -> Empty
      deque.addHead(42);
      expect(deque.peekHead()).toBe(42);
      expect(deque.peekTail()).toBe(42);
      expect(deque.removeHead()).toBe(42);
      expect(deque.isEmpty()).toBe(true);

      // Same with tail operations
      deque.addTail(24);
      expect(deque.peekHead()).toBe(24);
      expect(deque.peekTail()).toBe(24);
      expect(deque.removeTail()).toBe(24);
      expect(deque.isEmpty()).toBe(true);

      // Add head, remove tail
      deque.addHead(33);
      expect(deque.removeTail()).toBe(33);
      expect(deque.isEmpty()).toBe(true);

      // Add tail, remove head
      deque.addTail(44);
      expect(deque.removeHead()).toBe(44);
      expect(deque.isEmpty()).toBe(true);
    });
  });

  describe("Complex Operations", () => {
    test("should handle a sequence of additions and removals", () => {
      // Add elements: 1, 2, 3, 4, 5
      for (let i = 1; i <= 5; i++) {
        deque.addTail(i);
      }

      // Remove head twice: 3, 4, 5
      deque.removeHead();
      deque.removeHead();

      // Add to head: 0, 3, 4, 5
      deque.addHead(0);

      // Remove tail: 0, 3, 4
      deque.removeTail();

      // Add more to tail: 0, 3, 4, 6, 7
      deque.addTail(6);
      deque.addTail(7);

      // Verify final state
      expect(deque.peekHead()).toBe(0);
      expect(deque.peekTail()).toBe(7);

      // Drain the deque and verify order
      expect(deque.removeHead()).toBe(0);
      expect(deque.removeHead()).toBe(3);
      expect(deque.removeHead()).toBe(4);
      expect(deque.removeHead()).toBe(6);
      expect(deque.removeHead()).toBe(7);
      expect(deque.isEmpty()).toBe(true);
    });

    test("should work as a queue (FIFO)", () => {
      // Add elements to tail
      for (let i = 1; i <= 5; i++) {
        deque.addTail(i);
      }

      // Remove elements from head
      for (let i = 1; i <= 5; i++) {
        expect(deque.removeHead()).toBe(i);
      }

      expect(deque.isEmpty()).toBe(true);
    });

    test("should work as a stack (LIFO)", () => {
      // Add elements to head
      for (let i = 1; i <= 5; i++) {
        deque.addHead(i);
      }

      // Remove elements from head
      for (let i = 5; i >= 1; i--) {
        expect(deque.removeHead()).toBe(i);
      }

      expect(deque.isEmpty()).toBe(true);
    });
  });

  describe("Boundary Conditions", () => {
    test("should handle deque with capacity 1", () => {
      const singleDeque = new DeQueue<number>(1);

      expect(singleDeque.isEmpty()).toBe(true);

      singleDeque.addHead(42);
      expect(singleDeque.isFull()).toBe(true);
      expect(singleDeque.peekHead()).toBe(42);
      expect(singleDeque.peekTail()).toBe(42);

      // Try adding to full deque with capacity 1
      singleDeque.addHead(100);
      expect(singleDeque.peekHead()).toBe(42); // Original value should remain

      singleDeque.removeHead();
      expect(singleDeque.isEmpty()).toBe(true);
    });

    test("should respect capacity limits under heavy usage", () => {
      // Fill and empty multiple times
      for (let cycle = 0; cycle < 3; cycle++) {
        for (let i = 0; i < SIZE; i++) {
          deque.addHead(i);
        }
        expect(deque.isFull()).toBe(true);

        // Try to add one more
        deque.addHead(999);
        expect(deque.peekHead()).toBe(SIZE - 1); // Last valid addition

        // Empty deque
        for (let i = 0; i < SIZE; i++) {
          deque.removeHead();
        }
        expect(deque.isEmpty()).toBe(true);
      }
    });
  });

  describe("Error Handling and Recovery", () => {
    test("should recover after overflow attempts", () => {
      // Fill deque
      for (let i = 0; i < SIZE; i++) {
        deque.addHead(i);
      }

      // Try to exceed capacity
      deque.addHead(100);
      deque.addTail(200);

      // Remove one item to make space
      deque.removeHead();

      // Should be able to add again
      deque.addHead(300);
      expect(deque.peekHead()).toBe(300);
    });

    test("should recover after underflow attempts", () => {
      // Try to remove from empty deque
      expect(deque.removeHead()).toBeUndefined();
      expect(deque.removeTail()).toBeUndefined();

      // Should still be able to add elements
      deque.addHead(42);
      expect(deque.peekHead()).toBe(42);
    });
  });
});
