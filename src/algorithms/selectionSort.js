/** @param {number[]} input */
export function selectionSort(input) {
  const values = [...input];
  const steps = [];
  const sorted = [];
  let comparisons = 0;
  let swaps = 0;

  const snapshot = (highlight, explanation) => {
    steps.push({
      state: [...values],
      highlight,
      sorted: [...sorted],
      explanation,
    });
  };

  snapshot([], 'Initial array. Selection sort finds the smallest remaining value on each pass.');

  for (let i = 0; i < values.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < values.length; j++) {
      comparisons++;
      snapshot(
        [minIndex, j],
        `Comparing ${values[minIndex]} and ${values[j]}. (Comparisons: ${comparisons})`,
      );
      if (values[j] < values[minIndex]) minIndex = j;
    }

    if (minIndex !== i) {
      [values[i], values[minIndex]] = [values[minIndex], values[i]];
      swaps++;
      snapshot(
        [i, minIndex],
        `Move the smallest remaining value into position ${i + 1}. (Swaps: ${swaps})`,
      );
    }

    sorted.push(i);
    snapshot([], `Pass ${i + 1} finished. Position ${i + 1} is sorted.`);
  }

  if (values.length > 0) sorted.push(values.length - 1);
  snapshot([], `Sorting completed. Total comparisons: ${comparisons}, total swaps: ${swaps}.`);
  return steps;
}
