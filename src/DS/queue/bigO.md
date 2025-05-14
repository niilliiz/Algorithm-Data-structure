## Queue
A queue is a fundamental data structure that follows the First-In-First-Out (FIFO) principle.

### Time Complexity
- Enqueue (insertion): `O(1)`—Adding an element to the rear of the queue takes constant time
- Dequeue (removal): `O(1)`—Removing an element from the front takes constant time
- Peek/Front: `O(1)`—Accessing the front element without removing it takes constant time
- Search: `O(n)`—Finding a specific element requires traversing the queue in the worst case
- Size/isEmpty: `O(1)`—Checking the queue's size or if it's empty takes constant time

### Space Complexity
- Basic implementation: `O(n)`—Space required is directly proportional to the number of elements stored

### Details
The constant-time operations for core functions (enqueue, dequeue) make queues highly efficient for scenarios requiring FIFO order processing, such as task scheduling, breadth-first searches, and buffering.
Note that some implementations (like a simple array-based queue without circular behavior) might have O(n) time complexity for certain operations due to shifting elements, but proper implementations maintain O(1) for the primary operations.