/**
 * @typedef {Object} Step
 * @property {number[]} state        当前数组快照
 * @property {number[]} highlight    正在比较/交换的下标
 * @property {number[]} sorted       已确定位置的下标
 * @property {string}   explanation  这一步为什么这么做
 */

/** @param {number[]} input @returns {Step[]} */
export function bubbleSort(input) {
  const a = [...input];
  const n = a.length;
  const sorted = [];
  const steps = [];

  const snap = (highlight, explanation) =>
    steps.push({ state: [...a], highlight, sorted: [...sorted], explanation });

  snap([], '初始数组。冒泡排序每一轮都会把当前未排序部分的最大值"冒泡"到右端。');

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      snap([j, j + 1], `比较 ${a[j]} 和 ${a[j + 1]}。`);
      if (a[j] > a[j + 1]) {
        const left = a[j], right = a[j + 1];
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        snap([j, j + 1], `${left} > ${right}，顺序错误，所以交换它们。`);
      } else {
        snap([j, j + 1], `${a[j]} ≤ ${a[j + 1]}，顺序正确，不需要交换。`);
      }
    }
    sorted.push(n - 1 - i);
    snap([], `第 ${i + 1} 轮结束：${a[n - 1 - i]} 已经到达最终位置。`);
  }

  sorted.push(0);
  snap([], '排序完成。');
  return steps;
}