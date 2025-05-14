## Stack
A stack is a fundamental data structure that follows the Last-In-First-Out (LIFO) principle.

### Time Complexity

- Push (insertion): `O(1)`—Adding an element to the top of the stack takes constant time
- Pop (removal): `O(1)`—Removing the top element takes constant time
- Peek/Top: `O(1)`—Accessing the top element without removing it takes constant time
- Search: `O(n)`—Finding a specific element requires traversing the stack in the worst case
- Size/isEmpty: `O(1)`—Checking the stack's size or if it's empty takes constant time

### Space Complexity
- Basic implementation: `O(n)`—Space required is directly proportional to the number of elements stored

### Details
These constant-time operations (push, pop, peek) are what make stacks extremely efficient for many applications like function call management, expression evaluation, and backtracking algorithms.