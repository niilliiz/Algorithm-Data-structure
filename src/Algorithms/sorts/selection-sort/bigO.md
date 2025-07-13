## SelectionSort

### Time Complexity
Time Complexity
All Cases: O(n²)
- Best Case: `O(n²)` - Even if the array is already sorted, the algorithm still needs to compare every element with every other element to find the minimum
- Average Case: `O(n²)` - Random distribution of elements
- Worst Case: `O(n²)` - Reverse sorted array



### Space Complexity
- `O(1)` - Constant Space

### Details
Why O(n²)?
- Outer loop runs n times
- Inner loop runs (n-1) + (n-2) + ... + 1 times
- Total comparisons: n(n-1)/2 = O(n²)

Selection sort is an in-place sorting algorithm that only uses:
- A few variables (minIndex, temp for swapping, loop counters)
- No additional data structures that grow with input size
- The space usage remains constant regardless of array size