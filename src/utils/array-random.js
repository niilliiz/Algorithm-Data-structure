function getRandomArray(length = 100, min = -100, max = 100) {
    return Array.from(Array(length), () => Math.floor(Math.random() * (max - min + 1)) + min);
}
function getSortedRandomArray(length = 100, min = -100, max = 100) {
    return Array.from(Array(length), () => Math.floor(Math.random() * (max - min + 1)) + min).sort((a, b) => a - b);
}
export { getRandomArray, getSortedRandomArray };
