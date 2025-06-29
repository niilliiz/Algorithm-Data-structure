import { describe, it, expect, beforeEach } from "vitest";
import Stack from "../../DS/stack";
describe("Stack", () => {
    let stack;
    beforeEach(() => {
        stack = new Stack();
    });
    it("should start empty", () => {
        expect(stack.isEmpty()).toBe(true);
        expect(stack.size()).toBe(0);
        expect(stack.peek()).toBeUndefined();
        expect(stack.pop()).toBeUndefined();
    });
    it("should push elements to the stack", () => {
        stack.push(1);
        expect(stack.isEmpty()).toBe(false);
        expect(stack.size()).toBe(1);
        expect(stack.peek()).toBe(1);
        stack.push(2);
        expect(stack.size()).toBe(2);
        expect(stack.peek()).toBe(2);
    });
    it("should pop elements in LIFO order", () => {
        stack.push(10);
        stack.push(20);
        stack.push(30);
        expect(stack.pop()).toBe(30);
        expect(stack.size()).toBe(2);
        expect(stack.pop()).toBe(20);
        expect(stack.isEmpty()).toBe(false);
        expect(stack.pop()).toBe(10);
        expect(stack.pop()).toBeUndefined();
        expect(stack.isEmpty()).toBe(true);
    });
    it("should peek at the top element without removing it", () => {
        stack.push(100);
        expect(stack.peek()).toBe(100);
        expect(stack.size()).toBe(1);
        stack.push(200);
        expect(stack.peek()).toBe(200);
        expect(stack.size()).toBe(2);
    });
});
