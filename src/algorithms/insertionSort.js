/** @param {number[]} input */
export function insertionSort(input) {
  const values = [...input];
  const steps = [];
  let comparisons = 0;
  let shifts = 0;

  const snapshot = (highlight, explanation, sortedCount) => {
    steps.push({
      state: [...values],
      highlight,
      sorted: Array.from({ length: sortedCount }, (_, index) => index),
      explanation,
    });
  };

  snapshot([], 'Initial array. Insertion sort grows a sorted prefix from left to right.', 0);

  for (let i = 1; i < values.length; i++) {
    const current = values[i];
    let j = i - 1;

    while (j >= 0) {
      comparisons++;
      snapshot(
        [j, j + 1],
        `Compare ${values[j]} with ${current}. (Comparisons: ${comparisons})`,
        i,
      );
      if (values[j] <= current) break;

      values[j + 1] = values[j];
      values[j] = current;
      shifts++;
      
      snapshot(
        [j, j + 1],
        `Shift ${values[j]} one position to the right. (Shifts: ${shifts})`,
        i,
      );
      j--;
    }

    values[j + 1] = current;
    snapshot([j + 1], `Insert ${current} into its correct position.`, i + 1);
  }

  snapshot(
    [],
    `Sorting completed. Total comparisons: ${comparisons}, total shifts: ${shifts}.`,
    values.length,
  );
  return steps;
}
