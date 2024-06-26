function getRandomArray(
  length: number = 100,
  min: number = -100,
  max: number = 100,
): number[] {
  return Array.from(
    Array(length),
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );
}

export { getRandomArray };
