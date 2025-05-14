## Deque
A deque (double-ended queue) is a versatile data structure that allows insertion and removal operations at both ends.

### Time Complexity
- Insert at front (push_front): `O(1)`—Adding an element to the front takes constant time
- Insert at rear (push_back): `O(1)`—Adding an element to the rear takes constant time
- Remove from front (pop_front): `O(1)`—Removing an element from the front takes constant time
- Remove from rear (pop_back): `O(1)`—Removing an element from the rear takes constant time
- Access front element: `O(1)`—Accessing the front element takes constant time
- Access rear element: `O(1)`—Accessing the rear element takes constant time
- Search: `O(n)`—Finding a specific element requires traversing the deque in worst case
- Size/isEmpty: `O(1)`—Checking the deque's size or if it's empty takes constant time

### Space Complexity
- Basic implementation: `O(n)`—Space required is directly proportional to the number of elements stored


### Details
The constant-time operations at both ends make deques particularly powerful and flexible. They combine the capabilities of both stacks and queues, making them suitable for applications like:
- Implementing both FIFO and LIFO behaviors
- Sliding window problems
- Work stealing algorithms
- Palindrome checking
- Maintaining history with the ability to undo from either direction

Deques are commonly implemented using doubly linked lists or dynamic circular arrays to achieve `O(1)` time complexity for operations at both ends.