export default function calculateCharCount(s: string): Map<string, number> {
  const map = new Map<string, number>();
  for (const char of s) {
    map.set(char, (map.get(char) ?? 0) + 1);
  }
  return map;
}
