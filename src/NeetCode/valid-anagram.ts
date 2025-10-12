// my answer
// Time: O(n + m)
// space: O(n + m)
function MyAnswer_isValidAnagram(word1: string, word2: string): boolean {
  const first = new Set(word1);
  const second = new Set(word2);

  return (
    first.size === second.size && first.symmetricDifference(second).size === 0
  );
}

//gpt:
// Time: O(n)
// space: O(n)
function GPT_isValidAnagram(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;

  const count: Record<string, number> = {};

  for (const char of word1) {
    count[char] = (count[char] ?? 0) + 1;
  }

  for (const char of word2) {
    if (!count[char]) return false;
    count[char]--;
  }

  return true;
}

// Solution with O(1) Space Complexity
function isValidAnagram_constantSpace(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;

  const counts = new Array(26).fill(0); // constant size → O(1)

  for (let i = 0; i < word1.length; i++) {
    counts[word1.charCodeAt(i) - 97]++;
    counts[word2.charCodeAt(i) - 97]--;
  }

  for (const count of counts) {
    if (count !== 0) return false;
  }

  return true;
}
