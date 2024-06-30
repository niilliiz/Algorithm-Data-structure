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

function getSortedRandomArray(
  length: number = 100,
  min: number = -100,
  max: number = 100,
): number[] {
  return Array.from(
    Array(length),
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  ).sort((a,b)=>a-b);
}

export { getRandomArray,getSortedRandomArray };


interface User{
  name:string;
  id:number
}
