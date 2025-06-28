## Linked list—Singly

### Time Complexity
- Insert at beginning: `O(1)`
- Insert at the end (with a tail pointer): `O(1)`
- Insert at the end (no tail pointer): `O(n)`
- Insert in the middle (after finding node): `O(1)`
- Insert in the middle (including search): `O(n)`
- Delete node at beginning: `O(1)`
- Delete node at the end (with a tail pointer) (no prev): `O(n)`
- Delete node at the end (no tail pointer): `O(n)`
- Delete node in the middle (after finding node): `O(1)`
- Delete node in the middle (including search): `O(n)`
- Search/Access: `O(n)`—Access by index (traverse)

### Space Complexity
- Basic implementation: `O(n)`