## QuickSort-Hoare Partition Scheme

### Time Complexity
Time Complexity
- Best Case: `O(log n)` - Happens when the pivot splits the array evenly (or close to it)
- Average Case: `O(log n)` - Random distribution of elements
- Worst Case: `O(n²)` - Happens when the pivot always gives the most unbalanced split, like: Choosing the first element as pivot in a sorted or reverse-sorted array, One side has n - 1 elements and the other has 0



### Space Complexity
✅ 1. In-place Space (In-place Algorithm)
When we say Hoare’s quicksort is in-place, we mean:
It doesn’t use extra memory (like copying the array into another array).
It just rearranges elements inside the same input array by swapping.
So the extra space for data manipulation is constant: `O(1)`.

🔸 Swapping arr[i] and arr[j] happens within the same array, no new arrays or copies are made.

✅ 2. Recursive Stack Space
Even though the sorting happens in-place, quicksort is a recursive algorithm.
Every recursive function call adds a stack frame to the call stack.
The depth of recursion depends on how the array is partitioned.

Best / Average case:
Each call splits the array nearly in half → recursion depth = `O(log n)`

So recursive stack space = `O(log n)`

Worst case:
One side gets almost all elements (like when the array is already sorted) → recursion depth = `O(n)`

So recursive stack space = `O(n)`

### Details
Hoare Partition Scheme
- Invented by Tony Hoare (the inventor of Quick Sort).
- Picks the first element as pivot (though you can choose others).
- Uses two pointers: one from the left (`i`) and one from the right (`j`).
- Moves them toward each other, and swaps out-of-place values.

Benefits:
- Faster in practice (fewer swaps)
- Works better on partially sorted arrays
- Often used in real-world implementations like in C's `qsort`