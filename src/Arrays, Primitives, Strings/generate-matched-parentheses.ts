function backtrack(
  current: string,
  n: number,
  openCount: number,
  closeCount: number,
  result: string[],
) {
  if (current.length === 2 * n) {
    result.push(current);
    return;
  }

  if (openCount < n) {
    backtrack(current + "(", n, openCount + 1, closeCount, result);
  }

  if (closeCount < openCount) {
    backtrack(current + ")", n, openCount, closeCount + 1, result);
  }
}

function generateMatchedParentheses(n: number) {
  if (n === 0) {
    return [];
  }

  const result = [];
  backtrack("", n, 0, 0, result);
  return result;
}
