## Heap

### Time Complexity
- Insertion (insert): `O(log n)` in the worst case (when the element bubbles all the way up to the root). O(1) in the best case (if the element already fits in place).
- Extract Root (extract): `O(log n)` in the worst case (when the element bubbles all the way down to a leaf). O(1) in the best case (if the root was the only element).
- Peek: `O(1)`
- Build Heap: `O(n)`. Most elements are near the leaves, and heapify down on them costs almost nothing. Only a few nodes (the ones near the root) take O(log n) swaps. Summing across all nodes gives a linear total.

### Space Complexity

- Insertion (insert): `O(1)` - only  new element; no extra arrays or recursion stack (iterative heapify up). `O(log n)` - recursive heapify(recursion call stack).
- Extract Root (extract): `O(1)` - swaps happen in place. `O(log n)` -  recursive heapify down.
- Peek (peek): `O(1)` — no extra memory needed.
- Build Heap (buildHeap): `O(1)` - if done in-place on the array. `O(log n)` -  recursive heapify(recursion call stack).
