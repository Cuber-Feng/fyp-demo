import { bubbleSort } from './bubbleSort';
import { insertionSort } from './insertionSort';
import { selectionSort } from './selectionSort';
import { BubbleSortDefinition } from './definition/bubbleSortDefinition';

export const algorithmCategories = [
  {
    id: 'sorting',
    label: 'Sorting',
    algorithms: [
      {
        id: 'bubble-sort',
        label: 'Bubble Sort',
        description: 'Compare adjacent values and move the largest values to the end.',
        complexity: 'O(n²)',
        run: bubbleSort,
        definition: BubbleSortDefinition,
      },
      {
        id: 'selection-sort',
        label: 'Selection Sort',
        description: 'Select the smallest remaining value and place it in order.',
        complexity: 'O(n²)',
        run: selectionSort,
      },
      {
        id: 'insertion-sort',
        label: 'Insertion Sort',
        description: 'Build a sorted prefix by inserting each value into its position.',
        complexity: 'O(n²)',
        run: insertionSort,
      },
    ],
  },
];
