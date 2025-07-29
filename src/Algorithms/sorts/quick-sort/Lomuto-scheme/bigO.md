## QuickSort-Lomuto Partition Scheme

### Time Complexity
Time Complexity
All Cases: O(n²)
- Best Case: `O(n²)` - Even if the array is already sorted, the algorithm still needs to compare every element with every other element to find the minimum
- Average Case: `O(n²)` - Random distribution of elements
- Worst Case: `O(n²)` - Reverse sorted array



### Space Complexity
- `O(1)` - Constant Space

### Details
Lomuto Partition Scheme 
- Picks the last element as pivot.
- Uses a single pointer i to track the “less than pivot” boundary.
- Simple and easy to implement, but not the most efficient.
- More swaps, poor on sorted arrays