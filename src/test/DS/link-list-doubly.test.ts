import { describe, it, expect, beforeEach } from "vitest";
import DoublyLinkedList from "../../DS/linked-list-doubly";

describe("DoublyLinkedList", () => {
  let list: DoublyLinkedList<number>;

  beforeEach(() => {
    list = new DoublyLinkedList<number>(5);
  });

  describe("Constructor", () => {
    it("should initialize with correct size and empty state", () => {
      expect(list.isEmpty()).toBe(true);
      expect(list.isFull()).toBe(false);
    });

    it("should handle different sizes", () => {
      const smallList = new DoublyLinkedList<string>(1);
      const largeList = new DoublyLinkedList<number>(100);

      expect(smallList.isEmpty()).toBe(true);
      expect(largeList.isEmpty()).toBe(true);
    });
  });

  describe("isEmpty and isFull", () => {
    it("should return true when list is empty", () => {
      expect(list.isEmpty()).toBe(true);
    });

    it("should return false when list has elements", () => {
      list.insertAtBeginning(1);
      expect(list.isEmpty()).toBe(false);
    });

    it("should return true when list is full", () => {
      for (let i = 0; i < 5; i++) {
        list.insertAtEnd(i);
      }
      expect(list.isFull()).toBe(true);
    });

    it("should return false when list is not full", () => {
      list.insertAtBeginning(1);
      expect(list.isFull()).toBe(false);
    });
  });

  describe("traverse", () => {
    beforeEach(() => {
      for (let i = 0; i < 5; i++) {
        list.insertAtEnd(i);
      }
    });

    it("should return null for empty list", () => {
      const emptyList = new DoublyLinkedList<number>(5);
      expect(emptyList.traverse(0)).toBe(null);
      expect(emptyList.traverse()).toBe(null);
    });

    it("should return tail when no position specified", () => {
      const node = list.traverse();
      expect(node?.value).toBe(4);
    });

    it("should traverse to correct positions", () => {
      expect(list.traverse(0)?.value).toBe(0);
      expect(list.traverse(1)?.value).toBe(1);
      expect(list.traverse(2)?.value).toBe(2);
      expect(list.traverse(3)?.value).toBe(3);
      expect(list.traverse(4)?.value).toBe(4);
    });

    it("should return null for invalid positions", () => {
      expect(list.traverse(-1)).toBe(null);
      expect(list.traverse(5)).toBe(null);
      expect(list.traverse(100)).toBe(null);
    });

    it("should handle edge positions correctly", () => {
      expect(list.traverse(0)?.value).toBe(0);
      expect(list.traverse(4)?.value).toBe(4);
    });
  });

  describe("insertAtBeginning", () => {
    it("should insert into empty list", () => {
      list.insertAtBeginning(42);
      expect(list.isEmpty()).toBe(false);
      expect(list.traverse(0)?.value).toBe(42);
    });

    it("should insert at beginning and shift other elements", () => {
      list.insertAtBeginning(1);
      list.insertAtBeginning(2);
      list.insertAtBeginning(3);

      expect(list.traverse(0)?.value).toBe(3);
      expect(list.traverse(1)?.value).toBe(2);
      expect(list.traverse(2)?.value).toBe(1);
    });

    it("should not insert when list is full", () => {
      for (let i = 0; i < 5; i++) {
        list.insertAtBeginning(i);
      }

      expect(list.isFull()).toBe(true);

      list.insertAtBeginning(999);
      expect(list.traverse(0)?.value).not.toBe(999);
      expect(list.isFull()).toBe(true);
    });

    it("should properly link nodes with prev/next pointers", () => {
      list.insertAtBeginning(1);
      list.insertAtBeginning(2);

      const head = list.traverse(0);
      const second = list.traverse(1);

      expect(head?.next).toBe(second);
      expect(second?.prev).toBe(head);
      expect(head?.prev).toBeUndefined();
    });
  });

  describe("insertAtEnd", () => {
    it("should insert into empty list", () => {
      list.insertAtEnd(42);
      expect(list.isEmpty()).toBe(false);
      expect(list.traverse(0)?.value).toBe(42);
    });

    it("should insert at end and preserve order", () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);

      expect(list.traverse(0)?.value).toBe(1);
      expect(list.traverse(1)?.value).toBe(2);
      expect(list.traverse(2)?.value).toBe(3);
    });

    it("should not insert when list is full", () => {
      for (let i = 0; i < 5; i++) {
        list.insertAtEnd(i);
      }

      expect(list.isFull()).toBe(true);

      list.insertAtEnd(999);
      expect(list.traverse()?.value).not.toBe(999);
      expect(list.isFull()).toBe(true);
    });

    it("should properly link nodes with prev/next pointers", () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);

      const first = list.traverse(0);
      const second = list.traverse(1);

      expect(first?.next).toBe(second);
      expect(second?.prev).toBe(first);
      expect(second?.next).toBeUndefined();
    });
  });

  describe("insertAtMiddle", () => {
    beforeEach(() => {
      for (let i = 0; i < 3; i++) {
        list.insertAtEnd(i);
      }
    });

    it("should insert at position 0 (beginning)", () => {
      list.insertAtMiddle(999, 0);
      expect(list.traverse(0)?.value).toBe(999);
      expect(list.traverse(1)?.value).toBe(0);
      expect(list.traverse(2)?.value).toBe(1);
      expect(list.traverse(3)?.value).toBe(2);
    });

    it("should insert at end position", () => {
      list.insertAtMiddle(999, 3);
      expect(list.traverse(0)?.value).toBe(0);
      expect(list.traverse(1)?.value).toBe(1);
      expect(list.traverse(2)?.value).toBe(2);
      expect(list.traverse(3)?.value).toBe(999);
    });

    it("should insert in middle position and shift elements", () => {
      list.insertAtMiddle(999, 1);
      expect(list.traverse(0)?.value).toBe(0);
      expect(list.traverse(1)?.value).toBe(999);
      expect(list.traverse(2)?.value).toBe(1);
      expect(list.traverse(3)?.value).toBe(2);
    });

    it("should not insert when list is full", () => {
      list.insertAtEnd(3);
      list.insertAtEnd(4);

      expect(list.isFull()).toBe(true);

      list.insertAtMiddle(999, 2);
      expect(list.traverse(2)?.value).toBe(2); // Should remain unchanged
    });

    it("should properly link nodes with prev/next pointers", () => {
      list.insertAtMiddle(999, 1);

      const first = list.traverse(0);
      const inserted = list.traverse(1);
      const third = list.traverse(2);

      expect(first?.next).toBe(inserted);
      expect(inserted?.prev).toBe(first);
      expect(inserted?.next).toBe(third);
      expect(third?.prev).toBe(inserted);
    });
  });

  describe("deleteAtBeginning", () => {
    it("should return undefined for empty list", () => {
      expect(list.deleteAtBeginning()).toBeUndefined();
    });

    it("should delete and return value from single element list", () => {
      list.insertAtBeginning(42);
      const deleted = list.deleteAtBeginning();

      expect(deleted).toBe(42);
      expect(list.isEmpty()).toBe(true);
    });

    it("should delete first element and shift others", () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);

      const deleted = list.deleteAtBeginning();

      expect(deleted).toBe(1);
      expect(list.traverse(0)?.value).toBe(2);
      expect(list.traverse(1)?.value).toBe(3);
      expect(list.traverse(2)).toBe(null);
    });

    it("should properly update prev pointer of new head", () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);

      list.deleteAtBeginning();

      const newHead = list.traverse(0);
      expect(newHead?.prev).toBeUndefined();
    });
  });

  describe("deleteAtEnd", () => {
    it("should return undefined for empty list", () => {
      expect(list.deleteAtEnd()).toBeUndefined();
    });

    it("should delete and return value from single element list", () => {
      list.insertAtEnd(42);
      const deleted = list.deleteAtEnd();

      expect(deleted).toBe(42);
      expect(list.isEmpty()).toBe(true);
    });

    it("should delete last element", () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);

      const deleted = list.deleteAtEnd();

      expect(deleted).toBe(3);
      expect(list.traverse(0)?.value).toBe(1);
      expect(list.traverse(1)?.value).toBe(2);
      expect(list.traverse(2)).toBe(null);
    });

    it("should properly update next pointer of new tail", () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);

      list.deleteAtEnd();

      const newTail = list.traverse(0);
      expect(newTail?.next).toBeUndefined();
    });
  });

  describe("deleteAtMiddle", () => {
    beforeEach(() => {
      for (let i = 0; i < 5; i++) {
        list.insertAtEnd(i);
      }
    });

    it("should return undefined for empty list", () => {
      const emptyList = new DoublyLinkedList<number>(5);
      expect(emptyList.deleteAtMiddle(0)).toBeUndefined();
    });

    it("should delete at position 0 (beginning)", () => {
      const deleted = list.deleteAtMiddle(0);
      expect(deleted).toBe(0);
      expect(list.traverse(0)?.value).toBe(1);
      expect(list.traverse(1)?.value).toBe(2);
      expect(list.traverse(2)?.value).toBe(3);
      expect(list.traverse(3)?.value).toBe(4);
    });

    it("should delete at last position", () => {
      const deleted = list.deleteAtMiddle(4);
      expect(deleted).toBe(4);
      expect(list.traverse(0)?.value).toBe(0);
      expect(list.traverse(1)?.value).toBe(1);
      expect(list.traverse(2)?.value).toBe(2);
      expect(list.traverse(3)?.value).toBe(3);
      expect(list.traverse(4)).toBe(null);
    });

    it("should delete at middle position and shift elements", () => {
      const deleted = list.deleteAtMiddle(2);
      console.log("deleted", deleted);
      expect(deleted).toBe(2);
      expect(list.traverse(0)?.value).toBe(0);
      expect(list.traverse(1)?.value).toBe(1);
      expect(list.traverse(2)?.value).toBe(3);
      expect(list.traverse(3)?.value).toBe(4);
      expect(list.traverse(4)).toBe(null);
    });

    it("should properly link adjacent nodes after deletion", () => {
      list.deleteAtMiddle(2);

      const before = list.traverse(1);
      const after = list.traverse(2);

      expect(before?.next).toBe(after);
      expect(after?.prev).toBe(before);
    });

    it("should delete correct element even when list is full", () => {
      const deleted = list.deleteAtMiddle(2);
      expect(deleted).toBe(2); // Should delete element at position 2, not the last element
    });
  });

  describe("Complex operations and edge cases", () => {
    it("should handle mixed insert and delete operations", () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);

      expect(list.deleteAtBeginning()).toBe(1);
      list.insertAtBeginning(0);
      expect(list.deleteAtEnd()).toBe(3);
      list.insertAtEnd(4);

      expect(list.traverse(0)?.value).toBe(0);
      expect(list.traverse(1)?.value).toBe(2);
      expect(list.traverse(2)?.value).toBe(4);
    });

    it("should maintain correct size after operations", () => {
      expect(list.isEmpty()).toBe(true);

      list.insertAtEnd(1);
      expect(list.isEmpty()).toBe(false);
      expect(list.isFull()).toBe(false);

      for (let i = 2; i <= 5; i++) {
        list.insertAtEnd(i);
      }
      expect(list.isFull()).toBe(true);

      list.deleteAtBeginning();
      expect(list.isFull()).toBe(false);
      expect(list.isEmpty()).toBe(false);
    });

    it("should handle size 1 list operations", () => {
      const singleList = new DoublyLinkedList<number>(1);

      singleList.insertAtBeginning(42);
      expect(singleList.isFull()).toBe(true);

      singleList.insertAtEnd(99);
      expect(singleList.traverse(0)?.value).toBe(42);

      expect(singleList.deleteAtEnd()).toBe(42);
      expect(singleList.isEmpty()).toBe(true);
    });

    it("should handle invalid positions gracefully", () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);

      expect(list.traverse(-1)).toBe(null);
      expect(list.traverse(10)).toBe(null);
      expect(list.deleteAtMiddle(-1)).toBeUndefined();
      expect(list.deleteAtMiddle(10)).toBeUndefined();
    });

    it("should maintain doubly linked structure integrity", () => {
      list.insertAtEnd(1);
      list.insertAtEnd(2);
      list.insertAtEnd(3);

      const first = list.traverse(0);
      const second = list.traverse(1);
      const third = list.traverse(2);

      expect(first?.next).toBe(second);
      expect(second?.next).toBe(third);
      expect(third?.next).toBeUndefined();

      expect(third?.prev).toBe(second);
      expect(second?.prev).toBe(first);
      expect(first?.prev).toBeUndefined();
    });
  });

  describe("Generic type support", () => {
    it("should work with string types", () => {
      const stringList = new DoublyLinkedList<string>(3);
      stringList.insertAtEnd("hello");
      stringList.insertAtEnd("world");

      expect(stringList.traverse(0)?.value).toBe("hello");
      expect(stringList.traverse(1)?.value).toBe("world");
      expect(stringList.deleteAtBeginning()).toBe("hello");
    });

    it("should work with object types", () => {
      interface Person {
        name: string;
        age: number;
      }

      const personList = new DoublyLinkedList<Person>(2);
      const person1 = { name: "Alice", age: 30 };
      const person2 = { name: "Bob", age: 25 };

      personList.insertAtEnd(person1);
      personList.insertAtEnd(person2);

      expect(personList.traverse(0)?.value).toEqual(person1);
      expect(personList.traverse(1)?.value).toEqual(person2);
    });
  });
});
