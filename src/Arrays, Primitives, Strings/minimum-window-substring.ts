import calculateCharCount from "../utils/calculate-char-count";

function isContainedAll(window: string, target: string): boolean {
  const targetFreq = calculateCharCount(target);

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

export function minimumWindowSubstring(s: string, t: string): string {
  if (s.length === 0 || t.length === 0) return "";

  const need = calculateCharCount(t);
  let have = new Map<string, number>();
  const required = need.size;
  let minSubstring = "";

  let satisfied = 0;
  let left = 0;
  let right = 0;

  while (right < s.length) {
    // ------------INCOMING
    const incomingChar = s[right];
    have.set(incomingChar, (have.get(incomingChar) ?? 0) + 1);

    if (have.get(incomingChar) === need.get(incomingChar)) {
      satisfied++;
    }

    // shrink while valid
    while (satisfied === required) {
      const window = s.substring(left, right + 1);

      if (minSubstring === "" || minSubstring.length > window.length) {
        minSubstring = window;
      }

      const outgoingChar = s[left];
      left++;
      have.set(outgoingChar, have.get(outgoingChar) - 1);

      if (
        need.get(outgoingChar) &&
        have.get(outgoingChar) < need.get(outgoingChar)
      ) {
        satisfied--;
      }
    }

    right++;
  }

  return minSubstring;
}
