import { describe, it, expect } from "vitest";
import { minimumWindowSubstring } from "../../Arrays, Primitives, Strings/minimum-window-substring";

describe("minimumWindowSubstring", () => {
  // ── Base cases ─────────────────────────────────────────────────────────────

  it("returns empty string when s is empty", () => {
    expect(minimumWindowSubstring("", "ABC")).toBe("");
  });

  it("returns empty string when t is empty", () => {
    expect(minimumWindowSubstring("ABC", "")).toBe("");
  });

  it("returns empty string when both are empty", () => {
    expect(minimumWindowSubstring("", "")).toBe("");
  });

  // ── Impossible cases ───────────────────────────────────────────────────────

  it("returns empty string when match is impossible", () => {
    expect(minimumWindowSubstring("a", "aa")).toBe("");
  });

  it("returns empty string when t is longer than s", () => {
    expect(minimumWindowSubstring("AB", "ABC")).toBe("");
  });

  it("returns empty string when chars in t don't exist in s", () => {
    expect(minimumWindowSubstring("ABC", "XYZ")).toBe("");
  });

  // ── Single character ───────────────────────────────────────────────────────

  it("handles single character match", () => {
    expect(minimumWindowSubstring("a", "a")).toBe("a");
  });

  it("handles single character — no match", () => {
    expect(minimumWindowSubstring("a", "b")).toBe("");
  });

  // ── Classic cases ──────────────────────────────────────────────────────────

  it("classic example — ADOBECODEBANC / ABC → BANC", () => {
    expect(minimumWindowSubstring("ADOBECODEBANC", "ABC")).toBe("BANC");
  });

  it("entire string is the only valid window", () => {
    expect(minimumWindowSubstring("aa", "aa")).toBe("aa");
  });

  it("s and t are identical", () => {
    expect(minimumWindowSubstring("ABC", "ABC")).toBe("ABC");
  });

  // ── Duplicate characters ───────────────────────────────────────────────────

  it("t has duplicate chars — window must satisfy all copies", () => {
    expect(minimumWindowSubstring("AABBC", "AAB")).toBe("AAB");
  });

  it("all characters are the same", () => {
    expect(minimumWindowSubstring("AAAA", "AA")).toBe("AA");
  });

  it("does not count excess copies toward a different char", () => {
    expect(minimumWindowSubstring("AABC", "ABC")).toBe("ABC");
  });

  // ── Position of answer ─────────────────────────────────────────────────────

  it("answer is at the very start of s", () => {
    expect(minimumWindowSubstring("ABCXYZ", "ABC")).toBe("ABC");
  });

  it("answer is at the very end of s", () => {
    expect(minimumWindowSubstring("XYZABC", "ABC")).toBe("ABC");
  });

  it("answer is in the middle of s", () => {
    expect(minimumWindowSubstring("XABCYZ", "ABC")).toBe("ABC");
  });

  // ── Multiple valid windows ─────────────────────────────────────────────────

  it("multiple valid windows — returns the shortest", () => {
    expect(minimumWindowSubstring("cabwefgewcwaefgcf", "cae")).toBe("cwae");
  });

  it("two windows of equal length — returns the first one found", () => {
    expect(minimumWindowSubstring("ABCBC", "BC")).toBe("BC");
  });
});
