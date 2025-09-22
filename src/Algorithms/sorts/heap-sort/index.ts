export function heapSort<T>(
  array: T[],
  compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any),
  ascending = true,
): T[] {
  const n = array.length;
  if (n <= 1) return array.slice();

  const arr = array.slice();

  const heapComp = ascending ? (a: T, b: T) => -compare(a, b) : compare;

  function heapifyDown(idx: number, len: number) {
    let i = idx;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      let best = -1;
      if (left < len) best = left;
      if (right < len) {
        if (best === -1) best = right;
        else best = heapComp(arr[left], arr[right]) <= 0 ? left : right;
      }

      if (best === -1) break;

      if (heapComp(arr[i], arr[best]) > 0) {
        [arr[i], arr[best]] = [arr[best], arr[i]];
        i = best;
      } else break;
    }
  }

  for (let start = Math.floor(n / 2) - 1; start >= 0; start--) {
    heapifyDown(start, n);
  }

  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    heapifyDown(0, end);
  }

  return arr;
}
