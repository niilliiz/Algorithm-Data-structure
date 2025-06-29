import { describe, it, expect, beforeEach } from "vitest";
import { QueueCircular } from "../../DS/queue-cicular";
describe("QueueCircular", () => {
    let queue;
    const MAX_SIZE = 3;
    beforeEach(() => {
        queue = new QueueCircular(MAX_SIZE);
    });
    describe("isEmpty", () => {
        it("should return true for a new queue", () => {
            expect(queue.isEmpty()).toBe(true);
        });
        it("should return false after an element is enqueued", () => {
            queue.enqueue(1);
            expect(queue.isEmpty()).toBe(false);
        });
        it("should return true after all elements are dequeued", () => {
            queue.enqueue(1);
            queue.dequeue();
            expect(queue.isEmpty()).toBe(true);
        });
    });
    describe("isFull", () => {
        it("should return false for a new queue", () => {
            expect(queue.isFull()).toBe(false);
        });
        it("should return true when queue reaches max size", () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            expect(queue.isFull()).toBe(true);
        });
        it("should return false after a full queue has an element removed", () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            queue.dequeue();
            expect(queue.isFull()).toBe(false);
        });
    });
    describe("enqueue", () => {
        it("should add an element to an empty queue", () => {
            queue.enqueue(1);
            expect(queue.peek()).toBe(1);
            expect(queue.getSize()).toBe(1);
        });
        it("should add multiple elements to the queue", () => {
            queue.enqueue(1);
            queue.enqueue(2);
            expect(queue.getSize()).toBe(2);
        });
        it("should not add elements beyond the max size", () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            queue.enqueue(4); // Should be ignored
            expect(queue.getSize()).toBe(3);
        });
        it("should maintain circular references", () => {
            queue.enqueue(1);
            queue.enqueue(2);
            const initialSize = queue.getSize();
            // Dequeue an item and add another to test circular reference
            queue.dequeue();
            queue.enqueue(3);
            // Size should remain the same after one dequeue and one enqueue
            expect(queue.getSize()).toBe(initialSize);
        });
    });
    describe("dequeue", () => {
        it("should return undefined from an empty queue", () => {
            expect(queue.dequeue()).toBeUndefined();
        });
        it("should remove and return the first element", () => {
            queue.enqueue(1);
            queue.enqueue(2);
            expect(queue.dequeue()).toBe(1);
            expect(queue.getSize()).toBe(1);
        });
        it("should handle dequeuing the last element", () => {
            queue.enqueue(1);
            expect(queue.dequeue()).toBe(1);
            expect(queue.isEmpty()).toBe(true);
            expect(queue.getSize()).toBe(0);
        });
        it("should maintain order when enqueueing after dequeueing", () => {
            queue.enqueue(1);
            queue.enqueue(2);
            expect(queue.dequeue()).toBe(1);
            queue.enqueue(3);
            expect(queue.dequeue()).toBe(2);
            expect(queue.dequeue()).toBe(3);
        });
    });
    describe("peek", () => {
        it("should return undefined for an empty queue", () => {
            expect(queue.peek()).toBeUndefined();
        });
        it("should return the first element without removing it", () => {
            queue.enqueue(1);
            queue.enqueue(2);
            expect(queue.peek()).toBe(1);
            expect(queue.getSize()).toBe(2);
        });
    });
    describe("getSize", () => {
        it("should return 0 for a new queue", () => {
            expect(queue.getSize()).toBe(0);
        });
        it("should return the correct size after enqueuing elements", () => {
            queue.enqueue(1);
            queue.enqueue(2);
            expect(queue.getSize()).toBe(2);
        });
        it("should return the correct size after dequeueing elements", () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            queue.dequeue();
            expect(queue.getSize()).toBe(2);
        });
    });
    describe("circular behavior", () => {
        it("should handle filling, emptying, and refilling the queue", () => {
            // Fill queue
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            expect(queue.isFull()).toBe(true);
            // Empty queue
            expect(queue.dequeue()).toBe(1);
            expect(queue.dequeue()).toBe(2);
            expect(queue.dequeue()).toBe(3);
            expect(queue.isEmpty()).toBe(true);
            // Refill queue
            queue.enqueue(4);
            queue.enqueue(5);
            queue.enqueue(6);
            expect(queue.isFull()).toBe(true);
            expect(queue.peek()).toBe(4);
        });
        it("should maintain circular structure through multiple operations", () => {
            // Fill queue
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            // Remove 2 items
            expect(queue.dequeue()).toBe(1);
            expect(queue.dequeue()).toBe(2);
            // Add 2 more items
            queue.enqueue(4);
            queue.enqueue(5);
            // Check order is maintained
            expect(queue.dequeue()).toBe(3);
            expect(queue.dequeue()).toBe(4);
            expect(queue.dequeue()).toBe(5);
            expect(queue.isEmpty()).toBe(true);
        });
    });
});
