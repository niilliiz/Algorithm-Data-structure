import { describe, it, expect, beforeEach } from "vitest";
import { Queue } from "../../DS/queue";
describe("Queue", () => {
    let queue;
    beforeEach(() => {
        queue = new Queue(3); // queue with max size 3
    });
    it("should start empty", () => {
        expect(queue.isEmpty()).toBe(true);
        expect(queue.getSize()).toBe(0);
        expect(queue.peek()).toBeUndefined();
    });
    it("should enqueue elements correctly", () => {
        queue.enqueue(1);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.peek()).toBe(1);
        queue.enqueue(2);
        expect(queue.peek()).toBe(1);
        queue.enqueue(3);
        expect(queue.isFull()).toBe(true);
    });
    it("should not enqueue when full", () => {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        // Queue is full now
        queue.enqueue(4); // should not be added
        expect(queue.isFull()).toBe(true);
        expect(queue.peek()).toBe(1);
    });
    it("should dequeue elements in FIFO order", () => {
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        expect(queue.dequeue()).toBe(10);
        expect(queue.dequeue()).toBe(20);
        expect(queue.dequeue()).toBe(30);
        expect(queue.dequeue()).toBeUndefined(); // queue is empty now
    });
    it("should handle dequeue on an empty queue gracefully", () => {
        expect(queue.dequeue()).toBeUndefined();
        expect(queue.isEmpty()).toBe(true);
    });
    it("should peek the front element without removing it", () => {
        queue.enqueue(100);
        queue.enqueue(200);
        expect(queue.peek()).toBe(100); // peek should show 100
        expect(queue.peek()).toBe(100); // still 100 after multiple peeks
        expect(queue.dequeue()).toBe(100); // now remove it
        expect(queue.peek()).toBe(200); // next in line
    });
    it("should properly track length after enqueue and dequeue", () => {
        expect(queue.getSize()).toBe(0);
        queue.enqueue(1);
        expect(queue.getSize()).toBe(1);
        queue.enqueue(2);
        expect(queue.getSize()).toBe(2);
        queue.dequeue();
        expect(queue.getSize()).toBe(1);
        queue.dequeue();
        expect(queue.getSize()).toBe(0);
    });
    it("should reset head and tail when queue becomes empty after dequeuing last element", () => {
        queue.enqueue(42);
        expect(queue.peek()).toBe(42);
        queue.dequeue();
        expect(queue.isEmpty()).toBe(true);
        expect(queue.peek()).toBeUndefined();
    });
});
