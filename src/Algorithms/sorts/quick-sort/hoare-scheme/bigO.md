## QuickSort-Hoare Partition Scheme

### Time Complexity
Time Complexity
All Cases: O(n²)
- Best Case: `O(n²)` - Even if the array is already sorted, the algorithm still needs to compare every element with every other element to find the minimum
- Average Case: `O(n²)` - Random distribution of elements
- Worst Case: `O(n²)` - Reverse sorted array



### Space Complexity
- `O(1)` - Constant Space

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