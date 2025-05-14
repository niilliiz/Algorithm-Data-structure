## Circular Queue
A circular queue is an efficient queue implementation that uses a fixed-size array and wraps around to the beginning when it reaches the end, optimizing space usage. Here's a breakdown of its time and space complexity:

### Time Complexity
- Enqueue (insertion): `O(1)`—Adding an element takes constant time
- Dequeue (removal): `O(1)`—Removing an element takes constant time
- Peek/Front: `O(1)`—Accessing the front element without removing it takes constant time
- Size/isEmpty/isFull: `O(1)`—Checking the queue's status takes constant time
- Search: `O(n)`—Finding a specific element requires traversing the queue in the worst case

### Space Complexity

- implementation: `O(n)`—Space required is fixed based on the predefined capacity

Key Advantages
- Memory Efficiency: Reuses the same array space by wrapping around
- No Shifting: Unlike simple array-based queues, no element shifting is required
- Fixed Memory Footprint: Pre-allocates a fixed amount of memory
- This circular design avoids the inefficiency of a simple array-based queue implementation where dequeuing might require `O(n)` operations to shift elements forward.