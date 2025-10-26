/**
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
 * Given a string s, return true if it is a palindrome, or false otherwise.
 *
 * Example 1:
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Explanation: "amanaplanacanalpanama" is a palindrome.
 *
 * Example 2:
 * Input: s = "race a car"
 * Output: false
 * Explanation: "raceacar" is not a palindrome.
 *
 * Example 3:
 * Input: s = " "
 * Output: true
 * Explanation: s is an empty string "" after removing non-alphanumeric characters.
 * Since an empty string reads the same forward and backward, it is a palindrome.
 * Constraints:
 *
 * 1 <= s.length <= 2 * 10^5
 * s consists only of printable ASCII characters.
 */

/**
 * ✅ Time complexity: O(n) (optimal)
 * ✅ Space complexity: O(1) (if you lowercase per char) toLowerCase: Iterate through all n chars to create a new lowercase string
 * ✅ Clean, readable, and robust — no redundant work
 */

function validPalindrome(word: string) {
  const isAlnum = /[a-z0-9]/;

  let i = 0;
  let j = word.length - 1;

  while (i < j) {
    while (i < j && !isAlnum.test(word[i].toLowerCase())) {
      i += 1;
    }
    while (i < j && !isAlnum.test(word[j].toLowerCase())) {
      j -= 1;
    }

    if (i >= j) {
      return true;
    }

    if (word[i].toLowerCase() !== word[j].toLowerCase()) {
      return false;
    }

    i += 1;
    j -= 1;
  }

  return true;
}
