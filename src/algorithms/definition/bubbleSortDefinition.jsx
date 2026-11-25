export function BubbleSortDefinition() {
  return (
    <article className="algorithm-definition">
      <header>
        <h2>Bubble Sort</h2>
        <p className="classification">
          <strong>Classification:</strong> Comparison-based, in-place, stable sorting algorithm
        </p>
      </header>

      <section aria-labelledby="formal-definition">
        <h3 id="formal-definition">Formal Definition</h3>
        <p>
          Let <code>A = [a_0, a_1, ..., a_{'{n - 1}'}]</code> be a finite sequence of{' '}
          <code>n</code> elements drawn from a totally ordered set equipped with a binary
          comparison relation <code>&le;</code>. <strong>Bubble sort</strong> is an iterative,
          comparison-based sorting algorithm that orders <code>A</code> in non-decreasing sequence
          by repeatedly traversing the unsorted prefix of the array, comparing adjacent pairs{' '}
          <code>(a_j, a_{'{j + 1}'})</code>, and swapping them whenever{' '}
          <code>a_j &gt; a_{'{j + 1}'}</code>.
        </p>
      </section>

      <section aria-labelledby="operational-mechanism">
        <h3 id="operational-mechanism">Operational Mechanism and Loop Invariant</h3>
        <p>
          During pass <code>i</code> (for <code>i = 0, 1, ..., n - 2</code>), adjacent comparisons
          proceed for <code>j = 0, 1, ..., n - 2 - i</code>. Each swap moves the larger element
          one position toward the end of the active subarray, causing the maximum element of the
          remaining unsorted prefix to &ldquo;bubble&rdquo; up to its final sorted position at index{' '}
          <code>n - 1 - i</code>.
        </p>
        <p>
          <strong>Loop Invariant:</strong> At the start of outer iteration <code>i</code>, the
          suffix subarray <code>A[n - i .. n - 1]</code> contains the <code>i</code> largest
          elements of the original sequence in sorted order, and every element in{' '}
          <code>A[0 .. n - 1 - i]</code> is less than or equal to every element in{' '}
          <code>A[n - i .. n - 1]</code>.
        </p>
      </section>

      <section aria-labelledby="properties-and-complexity">
        <h3 id="properties-and-complexity">Algorithmic Properties and Complexity</h3>
        <ul>
          <li>
            <strong>In-Place Execution:</strong> Requires <code>O(1)</code> auxiliary memory beyond
            the input array and loop control variables.
          </li>
          <li>
            <strong>Stability:</strong> Preserves the relative order of equal elements because a swap
            is performed only under strict inequality (<code>a_j &gt; a_{'{j + 1}'}</code>).
          </li>
          <li>
            <strong>Time Complexity:</strong> Worst-case and average-case time complexity are{' '}
            <code>&Theta;(n^2)</code> comparisons and swaps; with an early-termination flag when a
            pass completes with zero swaps, best-case time complexity on an already sorted input is{' '}
            <code>&Theta;(n)</code>.
          </li>
          <li>
            <strong>Space Complexity:</strong> <code>O(1)</code> auxiliary space.
          </li>
        </ul>
      </section>
    </article>
  );
}