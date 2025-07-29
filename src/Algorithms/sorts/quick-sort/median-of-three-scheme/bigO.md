## QuickSort-Median-Of-Three Partition Scheme

### Time Complexity
Time Complexity
All Cases: O(n²)
- Best Case: `O(n²)` - Even if the array is already sorted, the algorithm still needs to compare every element with every other element to find the minimum
- Average Case: `O(n²)` - Random distribution of elements
- Worst Case: `O(n²)` - Reverse sorted array



### Space Complexity
- `O(1)` - Constant Space

### Details
Median-Of-Three Partition Scheme
- A strategy used to choose a better pivot to avoid worst-case `O(n²)`.
- Picks the median of first, middle, and last elements as the pivot.
- Can be used with either Lomuto or Hoare.

Benefits:
- Avoids poor performance on sorted/reverse-sorted arrays
- More stable performance across diverse inputs