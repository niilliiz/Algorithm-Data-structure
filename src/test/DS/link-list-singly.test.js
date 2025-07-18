import { describe, it, expect, beforeEach } from "vitest";
import SinglyLinkedList from "../../DS/linked-list-singly";
describe("SinglyLinkedList", () => {
    let list;
    const maxSize = 5;
    beforeEach(() => {
        list = new SinglyLinkedList(maxSize);
    });
    describe("Constructor and Initial State", () => {
        it("should create an empty list with specified size", () => {
            expect(list.isEmpty()).toBe(true);
            expect(list.isFull()).toBe(false);
        });
        it("should handle size of 0", () => {
            const emptyList = new SinglyLinkedList(0);
            expect(emptyList.isEmpty()).toBe(true);
            expect(emptyList.isFull()).toBe(true);
        });
        it("should handle size of 1", () => {
            const singleList = new SinglyLinkedList(1);
            expect(singleList.isEmpty()).toBe(true);
            expect(singleList.isFull()).toBe(false);
        });
    });
    describe("isEmpty() and isFull()", () => {
        it("should return true for isEmpty when list is empty", () => {
            expect(list.isEmpty()).toBe(true);
        });
        it("should return false for isEmpty when list has elements", () => {
            list.insertAtBeginning(1);
            expect(list.isEmpty()).toBe(false);
        });
        it("should return true for isFull when list reaches max size", () => {
            for (let i = 0; i < maxSize; i++) {
                list.insertAtBeginning(i);
            }
            expect(list.isFull()).toBe(true);
        });
        it("should return false for isFull when list is not at max size", () => {
            list.insertAtBeginning(1);
            expect(list.isFull()).toBe(false);
        });
    });
    describe("traverse()", () => {
        beforeEach(() => {
            // Create list: 3 -> 2 -> 1
            list.insertAtBeginning(1);
            list.insertAtBeginning(2);
            list.insertAtBeginning(3);
        });
        it("should return null when list is empty", () => {
            const emptyList = new SinglyLinkedList(5);
            expect(emptyList.traverse()).toBe(null);
            expect(emptyList.traverse(0)).toBe(null);
        });
        it("should return last node when no position specified", () => {
            const lastNode = list.traverse();
            expect(lastNode?.value).toBe(1);
            expect(lastNode?.next).toBeUndefined();
        });
        it("should return correct node at valid positions", () => {
            expect(list.traverse(0)?.value).toBe(3);
            expect(list.traverse(1)?.value).toBe(2);
            expect(list.traverse(2)?.value).toBe(1);
        });
        it("should return null for negative positions", () => {
            expect(list.traverse(-1)).toBe(null);
            expect(list.traverse(-5)).toBe(null);
        });
        it("should return null for positions >= length", () => {
            expect(list.traverse(3)).toBe(null);
            expect(list.traverse(10)).toBe(null);
        });
        it("should handle single element list", () => {
            const singleList = new SinglyLinkedList(5);
            singleList.insertAtBeginning(42);
            expect(singleList.traverse()?.value).toBe(42);
            expect(singleList.traverse(0)?.value).toBe(42);
            expect(singleList.traverse(1)).toBe(null);
        });
    });
    describe("insertAtBeginning()", () => {
        it("should insert into empty list", () => {
            list.insertAtBeginning(5);
            expect(list.isEmpty()).toBe(false);
            expect(list.traverse(0)?.value).toBe(5);
        });
        it("should insert at beginning of non-empty list", () => {
            list.insertAtBeginning(1);
            list.insertAtBeginning(2);
            list.insertAtBeginning(3);
            expect(list.traverse(0)?.value).toBe(3);
            expect(list.traverse(1)?.value).toBe(2);
            expect(list.traverse(2)?.value).toBe(1);
        });
        it("should not insert when list is full", () => {
            // Fill the list
            for (let i = 0; i < maxSize; i++) {
                list.insertAtBeginning(i);
            }
            expect(list.isFull()).toBe(true);
            // Try to insert one more
            list.insertAtBeginning(999);
            // Should still be full and not contain the new element
            expect(list.isFull()).toBe(true);
            expect(list.traverse(0)?.value).not.toBe(999);
        });
        it("should handle different data types", () => {
            const stringList = new SinglyLinkedList(3);
            stringList.insertAtBeginning("hello");
            stringList.insertAtBeginning("world");
            expect(stringList.traverse(0)?.value).toBe("world");
            expect(stringList.traverse(1)?.value).toBe("hello");
        });
    });
    describe("insertAtEnd()", () => {
        it("should handle insertion into empty list", () => {
            list.insertAtEnd(5);
            expect(list.isEmpty()).toBe(false);
            expect(list.traverse(0)?.value).toBe(5);
            expect(list.traverse()?.value).toBe(5); // Should be the last (and only) element
        });
        it("should insert at end of non-empty list", () => {
            list.insertAtBeginning(1);
            list.insertAtBeginning(2);
            list.insertAtEnd(3);
            expect(list.traverse(0)?.value).toBe(2);
            expect(list.traverse(1)?.value).toBe(1);
            expect(list.traverse(2)?.value).toBe(3);
        });
        it("should not insert when list is full", () => {
            // Fill the list
            for (let i = 0; i < maxSize; i++) {
                list.insertAtBeginning(i);
            }
            expect(list.isFull()).toBe(true);
            list.insertAtEnd(999);
            expect(list.isFull()).toBe(true);
        });
    });
    describe("insertAtMiddle()", () => {
        beforeEach(() => {
            // Create list: 3 -> 2 -> 1
            list.insertAtBeginning(1);
            list.insertAtBeginning(2);
            list.insertAtBeginning(3);
        });
        it("should insert at valid middle position", () => {
            list.insertAtMiddle(99, 1);
            expect(list.traverse(0)?.value).toBe(3);
            expect(list.traverse(1)?.value).toBe(99);
            expect(list.traverse(2)?.value).toBe(2);
            expect(list.traverse(3)?.value).toBe(1);
        });
        it("should handle insertion at position 0 (same as insertAtBeginning)", () => {
            list.insertAtMiddle(99, 0);
            expect(list.traverse(0)?.value).toBe(99);
            expect(list.traverse(1)?.value).toBe(3);
            expect(list.traverse(2)?.value).toBe(2);
            expect(list.traverse(3)?.value).toBe(1);
        });
        it("should not insert when list is full", () => {
            // Fill remaining slots
            list.insertAtBeginning(4);
            list.insertAtBeginning(5);
            expect(list.isFull()).toBe(true);
            list.insertAtMiddle(999, 2);
            expect(list.isFull()).toBe(true);
        });
        it("should handle edge cases with invalid positions gracefully", () => {
            // Your implementation should handle these gracefully now
            list.insertAtMiddle(99, -1); // Should not insert
            list.insertAtMiddle(99, 10); // Should not insert
            // List should remain unchanged
            expect(list.traverse(0)?.value).toBe(3);
            expect(list.traverse(1)?.value).toBe(2);
            expect(list.traverse(2)?.value).toBe(1);
            expect(list.traverse(3)).toBe(null);
        });
        it("should handle insertion into empty list at position 0", () => {
            const emptyList = new SinglyLinkedList(5);
            emptyList.insertAtMiddle(42, 0);
            expect(emptyList.traverse(0)?.value).toBe(42);
        });
    });
    describe("deleteAtBeginning()", () => {
        it("should return undefined when list is empty", () => {
            expect(list.deleteAtBeginning()).toBeUndefined();
        });
        it("should delete and return first element", () => {
            list.insertAtBeginning(1);
            list.insertAtBeginning(2);
            list.insertAtBeginning(3);
            const deleted = list.deleteAtBeginning();
            expect(deleted).toBe(3);
            expect(list.traverse(0)?.value).toBe(2);
        });
        it("should handle deletion from single element list", () => {
            list.insertAtBeginning(42);
            const deleted = list.deleteAtBeginning();
            expect(deleted).toBe(42);
            expect(list.isEmpty()).toBe(true);
        });
        it("should properly update length", () => {
            list.insertAtBeginning(1);
            list.insertAtBeginning(2);
            expect(list.isEmpty()).toBe(false);
            list.deleteAtBeginning();
            list.deleteAtBeginning();
            expect(list.isEmpty()).toBe(true);
        });
    });
    describe("deleteAtEnd()", () => {
        it("should return undefined when list is empty", () => {
            expect(list.deleteAtEnd()).toBeUndefined();
        });
        it("should handle single element list", () => {
            list.insertAtBeginning(42);
            // This should now work since you fixed the bug
            const deleted = list.deleteAtEnd();
            expect(deleted).toBe(42);
            expect(list.isEmpty()).toBe(true);
        });
        it("should delete and return last element from multi-element list", () => {
            list.insertAtBeginning(1);
            list.insertAtBeginning(2);
            list.insertAtBeginning(3);
            const deleted = list.deleteAtEnd();
            expect(deleted).toBe(1);
            expect(list.traverse()?.value).toBe(2);
        });
        it("should properly update length", () => {
            list.insertAtBeginning(1);
            list.insertAtBeginning(2);
            list.deleteAtEnd();
            expect(list.isEmpty()).toBe(false);
            list.deleteAtEnd();
            expect(list.isEmpty()).toBe(true);
        });
        it("should handle two element list correctly", () => {
            list.insertAtBeginning(1);
            list.insertAtBeginning(2);
            const deleted = list.deleteAtEnd();
            expect(deleted).toBe(1);
            expect(list.traverse(0)?.value).toBe(2);
            expect(list.traverse(1)).toBe(null);
        });
    });
    describe("deleteAtMiddle()", () => {
        beforeEach(() => {
            // Create list: 3 -> 2 -> 1
            list.insertAtBeginning(1);
            list.insertAtBeginning(2);
            list.insertAtBeginning(3);
        });
        it("should return undefined when list is empty", () => {
            const emptyList = new SinglyLinkedList(5);
            expect(emptyList.deleteAtMiddle(0)).toBeUndefined();
        });
        it("should delete and return element at valid position", () => {
            const deleted = list.deleteAtMiddle(1);
            expect(deleted).toBe(2);
            expect(list.traverse(0)?.value).toBe(3);
            expect(list.traverse(1)?.value).toBe(1);
        });
        it("should handle deletion at position 0 (same as deleteAtBeginning)", () => {
            const deleted = list.deleteAtMiddle(0);
            expect(deleted).toBe(3);
            expect(list.traverse(0)?.value).toBe(2);
            expect(list.traverse(1)?.value).toBe(1);
        });
        it("should handle deletion at last position (same as deleteAtEnd)", () => {
            const deleted = list.deleteAtMiddle(2); // Last element
            expect(deleted).toBe(1);
            expect(list.traverse(0)?.value).toBe(3);
            expect(list.traverse(1)?.value).toBe(2);
            expect(list.traverse(2)).toBe(null);
        });
        it("should handle edge cases with invalid positions gracefully", () => {
            // These should return undefined and not throw
            expect(list.deleteAtMiddle(-1)).toBeUndefined();
            expect(list.deleteAtMiddle(10)).toBeUndefined();
            // List should remain unchanged
            expect(list.traverse(0)?.value).toBe(3);
            expect(list.traverse(1)?.value).toBe(2);
            expect(list.traverse(2)?.value).toBe(1);
        });
        it("should properly update length", () => {
            list.deleteAtMiddle(1);
            expect(list.traverse(2)).toBe(null); // Should only have 2 elements now
        });
    });
    describe("Complex Scenarios", () => {
        it("should handle mixed operations correctly", () => {
            // Insert at beginning
            list.insertAtBeginning(1);
            list.insertAtBeginning(2);
            // Insert at end (should work now)
            list.insertAtEnd(3);
            expect(list.traverse(2)?.value).toBe(3);
            // Delete from beginning
            const deleted = list.deleteAtBeginning();
            expect(deleted).toBe(2);
            // Verify final state
            expect(list.traverse(0)?.value).toBe(1);
            expect(list.traverse(1)?.value).toBe(3);
        });
        it("should respect size limits throughout operations", () => {
            const smallList = new SinglyLinkedList(2);
            smallList.insertAtBeginning(1);
            smallList.insertAtBeginning(2);
            expect(smallList.isFull()).toBe(true);
            // Should not insert when full
            smallList.insertAtBeginning(3);
            expect(smallList.traverse(0)?.value).toBe(2);
            // After deletion, should be able to insert again
            smallList.deleteAtBeginning();
            expect(smallList.isFull()).toBe(false);
            smallList.insertAtBeginning(3);
            expect(smallList.traverse(0)?.value).toBe(3);
        });
        it("should handle alternating insertions and deletions", () => {
            list.insertAtBeginning(1);
            expect(list.deleteAtBeginning()).toBe(1);
            expect(list.isEmpty()).toBe(true);
            list.insertAtBeginning(2);
            list.insertAtBeginning(3);
            expect(list.deleteAtBeginning()).toBe(3);
            expect(list.traverse(0)?.value).toBe(2);
        });
        it("should handle insert and delete at end operations", () => {
            list.insertAtEnd(1);
            list.insertAtEnd(2);
            list.insertAtEnd(3);
            expect(list.traverse(0)?.value).toBe(1);
            expect(list.traverse(1)?.value).toBe(2);
            expect(list.traverse(2)?.value).toBe(3);
            expect(list.deleteAtEnd()).toBe(3);
            expect(list.deleteAtEnd()).toBe(2);
            expect(list.deleteAtEnd()).toBe(1);
            expect(list.isEmpty()).toBe(true);
        });
    });
    describe("Data Type Flexibility", () => {
        it("should work with strings", () => {
            const stringList = new SinglyLinkedList(3);
            stringList.insertAtBeginning("world");
            stringList.insertAtBeginning("hello");
            expect(stringList.traverse(0)?.value).toBe("hello");
            expect(stringList.traverse(1)?.value).toBe("world");
        });
        it("should work with objects", () => {
            const objectList = new SinglyLinkedList(3);
            const obj1 = { id: 1, name: "first" };
            const obj2 = { id: 2, name: "second" };
            objectList.insertAtBeginning(obj1);
            objectList.insertAtBeginning(obj2);
            expect(objectList.traverse(0)?.value).toEqual(obj2);
            expect(objectList.traverse(1)?.value).toEqual(obj1);
        });
        it("should work with null and undefined values", () => {
            const nullableList = new SinglyLinkedList(3);
            nullableList.insertAtBeginning(null);
            nullableList.insertAtBeginning(1);
            expect(nullableList.traverse(0)?.value).toBe(1);
            expect(nullableList.traverse(1)?.value).toBe(null);
        });
    });
    describe("Edge Cases and Boundary Conditions", () => {
        it("should handle insertAtEnd on empty list", () => {
            list.insertAtEnd(42);
            expect(list.traverse(0)?.value).toBe(42);
            expect(list.traverse()?.value).toBe(42);
        });
        it("should handle all operations on size-1 list", () => {
            const tinyList = new SinglyLinkedList(1);
            tinyList.insertAtBeginning(5);
            expect(tinyList.isFull()).toBe(true);
            expect(tinyList.deleteAtEnd()).toBe(5);
            expect(tinyList.isEmpty()).toBe(true);
            tinyList.insertAtEnd(10);
            expect(tinyList.deleteAtBeginning()).toBe(10);
            expect(tinyList.isEmpty()).toBe(true);
        });
        it("should handle position-based operations with single element", () => {
            list.insertAtBeginning(100);
            expect(list.deleteAtMiddle(0)).toBe(100);
            expect(list.isEmpty()).toBe(true);
            list.insertAtMiddle(200, 0);
            expect(list.traverse(0)?.value).toBe(200);
        });
    });
});
