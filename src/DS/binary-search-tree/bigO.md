## Binary Search Tree
A queue is a fundamental data structure that follows the First-In-First-Out (FIFO) principle.

### Time Complexity
- insert: `O(logn)`: best/average, `O(n)`: worst -> skewed tree 
- search: `O(logn)`: best/average, `O(n)`: worst -> skewed tree 
- delete: `O(logn)`: best/average, `O(n)`: worst

### Space Complexity
1. Insert Operation
- Space Complexity: O(log n) average, O(n) worst case
- Why: Uses recursive calls, creating a call stack. Stack depth equals tree height.

2. Search Operation
- Space Complexity: O(log n) average, O(n) worst case
- Why: Recursive implementation creates call stack proportional to tree height.

3. Delete Operation
- Space Complexity: O(log n) average, O(n) worst case
- Why:
    - Recursive calls for finding and deleting the node
    - Additional recursive calls for finding inorder successor
    - Total space is still bounded by tree height
