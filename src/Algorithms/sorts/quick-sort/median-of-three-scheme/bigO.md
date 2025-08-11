## QuickSort-Median-Of-Three Partition Scheme

### Time Complexity
Time Complexity
All Cases: O(n²)
- Best Case: `O(nlogn)` - This happens when the pivot splits the array into two nearly equal halves each time. The median-of-three pivot selection helps increase the likelihood of balanced partitions.
- Average Case: `O(nlogn)` - Random input + median-of-three → better balance than picking the first or last element as pivot
- Worst Case: `O(n²)` - Still possible if the array is already sorted in such a way that the median-of-three picks poor pivots (e.g., all equal elements). 



### Space Complexity
- `O(logn)`: Quicksort is in-place, so no extra arrays are created (partitioning swaps elements in place).
The only extra space comes from the recursion call stack, which in the best/average case is `O(logn)` deep.
In the worst case (degenerate splits), recursion depth can go to `O(n)`.

### Details
Median-Of-Three Partition Scheme
- A strategy used to choose a better pivot to avoid worst-case `O(n²)`.
- Picks the median of first, middle, and last elements as the pivot.
- Can be used with either Lomuto or Hoare.

Benefits:
- Avoids poor performance on sorted/reverse-sorted arrays
- More stable performance across diverse inputs