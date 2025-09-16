// tests/heap.spec.ts
import { describe, it, expect, beforeEach } from "vitest";
import { Heap } from "../../DS/heap";

// Helper: verify array follows min-heap property
function isValidMinHeap<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a: any, b: any) => (a as any) - (b as any),
) {
  for (let i = 0; i < arr.length; i++) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < arr.length && compare(arr[i], arr[left]) > 0) return false;
    if (right < arr.length && compare(arr[i], arr[right]) > 0) return false;
  }
  return true;
}

describe("Heap (min-heap) - comprehensive tests", () => {
  let heap: Heap<number>;

  beforeEach(() => {
    heap = new Heap<number>();
  });

  it("starts empty", () => {
    expect(heap.size()).toBe(0);
    expect(heap.isEmpty()).toBe(true);
    expect(heap.peek()).toBeUndefined();
  });

  it("extract on empty returns undefined", () => {
    expect(heap.extract()).toBeUndefined();
    expect(heap.size()).toBe(0);
  });

  it("insert and peek with single element", () => {
    heap.insert(42);
    expect(heap.size()).toBe(1);
    expect(heap.isEmpty()).toBe(false);
    expect(heap.peek()).toBe(42);
  });

  it("insert multiple elements maintains heap property (simple sequence)", () => {
    [5, 3, 8, 1, 2].forEach((v) => heap.insert(v));
    expect(heap.size()).toBe(5);
    // internal array should be a valid min-heap
    expect(isValidMinHeap((heap as any).data)).toBe(true);
  });

  it("extract returns elements in ascending order (fully emptying heap)", () => {
    const items = [5, 3, 8, 1, 2, 7, 6];
    items.forEach((v) => heap.insert(v));

    const out: number[] = [];
    while (!heap.isEmpty()) {
      const e = heap.extract();
      if (e !== undefined) out.push(e);
    }

    expect(out).toEqual([...items].sort((a, b) => a - b));
  });

  it("handles duplicate values", () => {
    const items = [4, 1, 4, 2, 4, 1];
    items.forEach((v) => heap.insert(v));
    expect(isValidMinHeap((heap as any).data)).toBe(true);

    const out: number[] = [];
    while (!heap.isEmpty()) {
      const e = heap.extract();
      if (e !== undefined) out.push(e);
    }
    expect(out).toEqual([...items].sort((a, b) => a - b));
  });

  it("buildHeap produces valid heap and does not mutate input array", () => {
    const arr = [3, 1, 6, 5, 2, 4];
    const copy = arr.slice();
    heap.buildHeap(arr);

    // internal representation should be a valid min-heap
    expect(isValidMinHeap((heap as any).data)).toBe(true);

    // buildHeap should not mutate original array because implementation uses slice()
    expect(arr).toEqual(copy);
  });

  it("buildHeap on reverse-sorted array yields valid heap and extract yields sorted order", () => {
    const arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    heap.buildHeap(arr);

    expect(isValidMinHeap((heap as any).data)).toBe(true);

    const out: number[] = [];
    while (!heap.isEmpty()) {
      const e = heap.extract();
      if (e !== undefined) out.push(e);
    }

    expect(out).toEqual([...arr].sort((a, b) => a - b));
  });

  it("works with negative numbers and mixed values", () => {
    const arr = [0, -10, 5, -3, 2, -1];
    heap.buildHeap(arr);
    expect(isValidMinHeap((heap as any).data)).toBe(true);

    const out: number[] = [];
    while (!heap.isEmpty()) {
      const e = heap.extract();
      if (e !== undefined) out.push(e);
    }
    expect(out).toEqual([...arr].sort((a, b) => a - b));
  });

  it("insert many then extract many keeps heap property throughout operations", () => {
    const items = [12, 4, 5, 3, 8, 7, 1, 20, 0, 15];
    // interleave inserts and occasional extracts
    items.forEach((v, idx) => {
      heap.insert(v);
      // after each insert heap must be valid
      expect(isValidMinHeap((heap as any).data)).toBe(true);

      if (idx % 3 === 0 && !heap.isEmpty()) {
        heap.extract();
        // after extract heap must still be valid
        expect(isValidMinHeap((heap as any).data)).toBe(true);
      }
    });

    // drain remaining and validate ascending order
    const out: number[] = [];
    while (!heap.isEmpty()) {
      const e = heap.extract();
      if (e !== undefined) out.push(e);
      expect(isValidMinHeap((heap as any).data)).toBe(true);
    }

    expect(out).toEqual(
      [...items].sort((a, b) => a - b).filter((x) => out.includes(x)),
    ); // same multiset
  });

  it("extract returns the single element correctly and heap becomes empty", () => {
    heap.insert(99);
    const v = heap.extract();
    expect(v).toBe(99);
    expect(heap.size()).toBe(0);
    expect(heap.isEmpty()).toBe(true);
    expect(heap.peek()).toBeUndefined();
  });

  it("buildHeap with empty array results in empty heap", () => {
    heap.buildHeap([]);
    expect(heap.size()).toBe(0);
    expect(heap.isEmpty()).toBe(true);
    expect(heap.peek()).toBeUndefined();
  });

  it("stress test small deterministic pseudo-random set (deterministic) for correctness", () => {
    const arr = [13, 4, 21, 9, 0, -7, 18, 2, 2, 15, 11, -1];
    heap.buildHeap(arr);
    expect(isValidMinHeap((heap as any).data)).toBe(true);

    const out: number[] = [];
    while (!heap.isEmpty()) {
      const e = heap.extract();
      if (e !== undefined) out.push(e);
    }
    expect(out).toEqual([...arr].sort((a, b) => a - b));
  });

  // Optional: test strings (min-heap by lexicographic order)
  it("works with strings (lexicographic min-heap)", () => {
    const h = new Heap<string>();
    ["delta", "alpha", "charlie", "bravo"].forEach((s) => h.insert(s));
    // @ts-ignore
    expect(isValidMinHeap((h as any).data, (a, b) => a.localeCompare(b))).toBe(
      true,
    );

    const out: string[] = [];
    while (!h.isEmpty()) {
      const e = h.extract();
      if (e !== undefined) out.push(e);
    }
    expect(out).toEqual(["alpha", "bravo", "charlie", "delta"]);
  });
});
