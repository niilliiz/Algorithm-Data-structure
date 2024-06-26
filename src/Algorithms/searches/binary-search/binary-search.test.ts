import { BinarySearch } from './index';

test('Binary Search: Not Found', () => {
  expect(BinarySearch([1,2,3],4)).toBe(-1);
});

test('Binary Search: Found', () => {
  expect(BinarySearch([1,2,3], 3)).toBe(2);
});