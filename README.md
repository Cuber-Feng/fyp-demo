# Algorithm Lab

An interactive algorithm visualizer. Choose an algorithm from the categorized sidebar, enter an array, and step through its execution.

## Algorithms

- **Sorting**
  - Bubble Sort
  - Selection Sort
  - Insertion Sort

Add algorithms to `src/algorithms/registry.js` to make them available in the sidebar. Each algorithm returns steps with the same `state`, `highlight`, `sorted`, and `explanation` shape, so the existing player and visualization can be reused.

