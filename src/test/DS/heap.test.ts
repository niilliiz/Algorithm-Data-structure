// tests/heap.comparator.spec.ts
import { describe, it, expect } from "vitest";
import { Heap } from "../../DS/heap";

function sortedAsc(arr: number[]) {
  return [...arr].sort((a, b) => a - b);
}
function sortedDesc(arr: number[]) {
  return [...arr].sort((a, b) => b - a);
}

describe("Heap comparator behavior (min & max)", () => {
  it("default Heap<number>() behaves as a numeric min-heap (insert + extract)", () => {
    const values = [5, 3, 8, 1, 2, 7, 6];
    const h = new Heap<number>(); // default min-heap for numbers

    values.forEach((v) => h.insert(v));

    const out: number[] = [];
    while (!h.isEmpty()) {
      const e = h.extract();
      if (e !== undefined) out.push(e);
    }

    expect(out).toEqual(sortedAsc(values));
  });

  it("Heap<number>((b,a)=>b-a) behaves as a numeric max-heap (insert + extract)", () => {
    const values = [5, 3, 8, 1, 2, 7, 6];
    const h = new Heap<number>((a, b) => b - a); // max-heap

    values.forEach((v) => h.insert(v));

    const out: number[] = [];
    while (!h.isEmpty()) {
      const e = h.extract();
      if (e !== undefined) out.push(e);
    }

    expect(out).toEqual(sortedDesc(values));
  });

  it("buildHeap uses comparator correctly (min-heap): build from array then extract yields ascending order", () => {
    const arr = [9, 4, 1, 7, 3, 8, 2, 6, 5, 0];
    const h = new Heap<number>();
    h.buildHeap(arr);

    const out: number[] = [];
    while (!h.isEmpty()) {
      const e = h.extract();
      if (e !== undefined) out.push(e);
    }

    expect(out).toEqual(sortedAsc(arr));
  });

  it("buildHeap uses comparator correctly (max-heap): build from array then extract yields descending order", () => {
    const arr = [9, 4, 1, 7, 3, 8, 2, 6, 5, 0];
    const h = new Heap<number>((a, b) => b - a);
    h.buildHeap(arr);

    const out: number[] = [];
    while (!h.isEmpty()) {
      const e = h.extract();
      if (e !== undefined) out.push(e);
    }

    expect(out).toEqual(sortedDesc(arr));
  });

  it("handles duplicates and negative numbers with comparator correctness", () => {
    const arr = [2, -1, 2, 0, -1, 5, 2];
    const hMin = new Heap<number>();
    const hMax = new Heap<number>((a, b) => b - a);

    // build and drain min-heap
    hMin.buildHeap(arr);
    const outMin: number[] = [];
    while (!hMin.isEmpty()) {
      const e = hMin.extract();
      if (e !== undefined) outMin.push(e);
    }
    expect(outMin).toEqual(sortedAsc(arr));

    // build and drain max-heap
    hMax.buildHeap(arr);
    const outMax: number[] = [];
    while (!hMax.isEmpty()) {
      const e = hMax.extract();
      if (e !== undefined) outMax.push(e);
    }
    expect(outMax).toEqual(sortedDesc(arr));
  });

  it("single element and empty heap edge cases", () => {
    const h = new Heap<number>();
    expect(h.extract()).toBeUndefined(); // empty

    h.insert(42);
    expect(h.peek()).toBe(42);
    expect(h.extract()).toBe(42);
    expect(h.extract()).toBeUndefined();
    expect(h.isEmpty()).toBe(true);
  });

  it("works with object comparator (priority field)", () => {
    type Task = { id: string; prio: number };
    const tasks: Task[] = [
      { id: "a", prio: 3 },
      { id: "b", prio: 1 },
      { id: "c", prio: 5 },
      { id: "d", prio: 2 },
    ];

    // min-heap by priority
    const minPQ = new Heap<Task>((x, y) => x.prio - y.prio);
    minPQ.buildHeap(tasks);

    const outMin: number[] = [];
    while (!minPQ.isEmpty()) {
      const t = minPQ.extract();
      if (t !== undefined) outMin.push(t.prio);
    }
    expect(outMin).toEqual(sortedAsc(tasks.map((t) => t.prio)));

    // max-heap by priority
    const maxPQ = new Heap<Task>((x, y) => y.prio - x.prio);
    maxPQ.buildHeap(tasks);

    const outMax: number[] = [];
    while (!maxPQ.isEmpty()) {
      const t = maxPQ.extract();
      if (t !== undefined) outMax.push(t.prio);
    }
    expect(outMax).toEqual(sortedDesc(tasks.map((t) => t.prio)));
  });
});
