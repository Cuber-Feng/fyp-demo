import { describe, it, expect } from 'vitest';
import { bubbleSort } from './bubbleSort';

describe('bubbleSort', () => {
  it('最后一步是排好序的数组', () => {
    const steps = bubbleSort([5, 3, 8, 1]);
    expect(steps.at(-1).state).toEqual([1, 3, 5, 8]);
  });
  it('已排序数组不发生交换', () => {
    const steps = bubbleSort([1, 2, 3]);
    expect(steps.some((s) => s.explanation.includes('交换'))).toBe(false);
  });
  it('重复元素和负数', () => {
    expect(bubbleSort([3, -1, 3, 0]).at(-1).state).toEqual([-1, 0, 3, 3]);
  });
});