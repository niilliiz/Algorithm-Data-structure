## QuickSort-Lomuto Partition Scheme

### Time Complexity
Time Complexity
All Cases: O(n²)
- Best Case: ` O(n log n)` - Occurs when the pivot always divides the array into two equal halves. Same analysis as an average case. Height of a recursion tree is `log n`
- Average Case: `O(n log n)` - The partition function runs in `O(n)` time for each call. In the average case, the pivot divides the array roughly in half. This creates a recursion tree of height `log n`
- Worst Case: `O(n²)` - Occurs when the pivot is always the smallest or largest element. This happens with already sorted arrays (ascending or descending) since Lomuto always picks the last element as a pivot. Creates a degenerate recursion tree of height `n`. Each level does O(n) work, so total is `O(n²)`


### Space Complexity
-  Average/Best: `O(log n)`
- Worst Case: `O(n)` - When the recursion tree is completely unbalanced. Stack depth becomes n in the worst case. Each recursive call adds a frame to the call stack

## The Partition

- Time Complexity: `O(n)` - single pass through the subarray
- Space Complexity: `O(1)` - only uses a constant amount of extra space (variables i, j, pivot)

### Details
Lomuto Partition Scheme 
- Picks the last element as a pivot.
- Uses a single pointer i to track the “less than pivot” boundary.
- Simple and easy to implement, but not the most efficient.
- More swaps, poor on sorted arrays