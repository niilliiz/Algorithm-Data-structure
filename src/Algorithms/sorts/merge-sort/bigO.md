## Merge Sort

### Time Complexity
Time Complexity
All Cases: O(n²)
- Best Case: `O(n*log n)` - Happens when the array is already sorted
- Average Case: `O(n*log n)` - Random distribution of elements
- Worst Case: `O(n*log n)` - Happens when the array is sorted in reverse order



### Space Complexity
`O(n)`, This is because:
- Merge Sort is not in-place.
- It creates temporary arrays (or copies of subarrays) during the merge step.
- So for n elements, you need up to O(n) extra space.