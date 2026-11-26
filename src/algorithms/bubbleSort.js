/**
 * @typedef {Object} Step
 * @property {number[]} state        当前数组快照
 * @property {number[]} highlight    正在比较/交换的下标
 * @property {number[]} sorted       已确定位置的下标
 * @property {string}   explanation  这一步为什么这么做
 */

/** @param {number[]} input @returns {Step[]} */
export function bubbleSort(input, earlyStop = false) {
  const a = [...input];
  const n = a.length;
  const sorted = [];
  const steps = [];
  let compareCount = 0;
  let swapCount = 0;

  const snap = (highlight, explanation) =>
    steps.push({ state: [...a], highlight, sorted: [...sorted], explanation });

  snap([], 'Initial array. Bubble sort will bubble the largest element in each round to the right.');

  for (let i = 0; i < n - 1; i++) {
    let sortedFlag = true;
    for (let j = 0; j < n - 1 - i; j++) {
      compareCount++;
      snap([j, j + 1], `Comparing ${a[j]} and ${a[j + 1]}. (Swap: ${swapCount}, Compare: ${compareCount})`);
      if (a[j] > a[j + 1]) {
        sortedFlag = false;
        const left = a[j], right = a[j + 1];
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapCount++;
        snap([j, j + 1], `${left} > ${right}, incorrect order, swapping them. (Swap: ${swapCount}, Compare: ${compareCount})`);
      } else {
        snap([j, j + 1], `${a[j]} ≤ ${a[j + 1]}, correct order, no swap needed. (Swap: ${swapCount}, Compare: ${compareCount})`);
      }
    }
    if (earlyStop && sortedFlag) {
      for (let index = n - 1 - i; index >= 0; index--) sorted.push(index);
      snap([], `No. ${i + 1} round finished: ${a[n - 1 - i]} has reached its final position.`);
      break;
    }
    sorted.push(n - 1 - i);
    snap([], `No. ${i + 1} round finished: ${a[n - 1 - i]} has reached its final position.`);
  }

  if (!sorted.includes(0)) sorted.push(0);
  snap([], `Sorting completed. Array length: ${n}, Total comparisons: ${compareCount}, total swaps: ${swapCount}`);
  return steps;
}