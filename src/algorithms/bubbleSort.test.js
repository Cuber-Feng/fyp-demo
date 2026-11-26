import { describe, it, expect } from 'vitest';
import { bubbleSort } from './bubbleSort';

describe('bubbleSort', () => {
  it('Last step is the sorted array', () => {
    const steps = bubbleSort([5, 3, 8, 1]);
    expect(steps.at(-1).state).toEqual([1, 3, 5, 8]);
  });
  it('Sorted array does not have swaps', () => {
    const steps = bubbleSort([1, 2, 3]);
    expect(steps.some((s) => s.explanation.includes('swap'))).toBe(false);
  });
  it('Early stop exits after a no-swap pass and marks the array sorted', () => {
    const steps = bubbleSort([1, 2, 3], true);
    expect(steps.length).toBeLessThan(bubbleSort([1, 2, 3]).length);
    expect(steps.at(-1).state).toEqual([1, 2, 3]);
    expect(new Set(steps.at(-1).sorted)).toEqual(new Set([0, 1, 2]));
  });
  it('Repeated elements and negative numbers', () => {
    expect(bubbleSort([3, -1, 3, 0]).at(-1).state).toEqual([-1, 0, 3, 3]);
  });
});