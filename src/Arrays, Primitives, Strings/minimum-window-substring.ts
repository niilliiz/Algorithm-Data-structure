function isContainedAll(window: string, target: string): boolean {
  const targetFreq = new Map<string, number>();

  for (const ch of target) {
    targetFreq.set(ch, (targetFreq.get(ch) ?? 0) + 1);
  }

  for (const ch of window) {
    if (targetFreq.has(ch)) {
      const remainingNumber = targetFreq.get(ch) - 1;
      if (remainingNumber === 0) {
        targetFreq.delete(ch);
      } else {
        targetFreq.set(ch, remainingNumber);
      }
    }
  }

  return targetFreq.size === 0;
}

function bruteforce_minimumWindowSubstring(s: string, t: string): string {
  if (s.length === 0 || t.length === 0) return "";

  let minWindow = Infinity;
  let minSubstring = "";

  for (let start = 0; start < s.length; start++) {
    for (let end = start + t.length; end <= s.length; end++) {
      const window = s.substring(start, end);

      if (isContainedAll(window, t)) {
        if (minSubstring === "" || minSubstring.length > window.length) {
          minSubstring = window;
        }
      }
    }
  }

  return minSubstring;
}
