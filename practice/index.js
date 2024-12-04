const sizes = [10, 100, 1000, 10000, 100000];
// Linear Search Algorithm
function exampleAlgorithm(n) {
  // Simulating an algorithm with predictable performance
  let operations = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      operations++;
    }
  }
  return operations;
}

function demonstrateBigOComplexity() {
  console.log("Input Size | Actual Time | Speed Limit (c * n) | Within Limit");

  sizes.forEach((size) => {
    const arr = Array.from({ length: size }, (_, i) => i);
    const start = performance.now();

    exampleAlgorithm(size);

    const actualTime = performance.now() - start;
    const speedLimit = size * 0.139; // c = 2, our scaling factor

    console.log(
      `${size.toString().padEnd(11)} | ` +
        `${actualTime.toFixed(4).padEnd(11)} | ` +
        `${speedLimit.toFixed(4).padEnd(18)} | ` +
        `${actualTime <= speedLimit}`,
    );
  });
}

// demonstrateBigOComplexity();

function demonstrateOmegaNotation() {
  console.log(
    "Input Size | Actual Time | Lower Bound (c * n) | Meets Lower Bound",
  );

  sizes.forEach((size) => {
    const arr = Array.from({ length: size }, (_, i) => i);
    const start = performance.now();

    exampleAlgorithm(size);

    const actualTime = performance.now() - start;
    const lowerBound = size * 0.001; // c = 0.5, our scaling factor

    console.log(
      `${size.toString().padEnd(11)} | ` +
        `${actualTime.toFixed(4).padEnd(11)} | ` +
        `${lowerBound.toFixed(4).padEnd(18)} | ` +
        `${actualTime >= lowerBound}`,
    );
  });
}

// demonstrateOmegaNotation();

function demonstrateThetaNotation() {
  console.log(
    "Input Size | Actual Operations | Lower Bound | Upper Bound | Within Bounds",
  );

  sizes.forEach((size) => {
    // Constants for our performance bounds
    const c1 = 0.001; // Lower bound multiplier
    const c2 = 0.139; // Upper bound multiplier

    // Actual algorithm performance
    const actualOperations = exampleAlgorithm(size);

    // Theta(n²) bounds
    const lowerBound = c1 * size * size;
    const upperBound = c2 * size * size;

    const withinBounds =
      actualOperations >= lowerBound && actualOperations <= upperBound;

    console.log(
      `${size.toString().padEnd(11)} | ` +
        `${actualOperations.toString().padEnd(17)} | ` +
        `${lowerBound.toFixed(2).padEnd(11)} | ` +
        `${upperBound.toFixed(2).padEnd(11)} | ` +
        `${withinBounds}`,
    );
  });
}

demonstrateThetaNotation();
