import { useMemo, useState } from 'react';
import { algorithmCategories } from './algorithms/registry';
import { usePlayer } from './hooks/usePlayer';
import AlgorithmSidebar from './components/AlgorithmSidebar';
import ArrayBars from './components/ArrayBars';
import ControlBar from './components/ControlBar';
import './App.css';

const MAX_LEN = 20;

function parseInput(text) {
  const parts = text.split(/[\s,，]+/).filter(Boolean);
  if (parts.length < 2) return { error: 'Please enter at least 2 numbers' };
  if (parts.length > MAX_LEN) return { error: `Maximum ${MAX_LEN} numbers supported` };
  const nums = parts.map(Number);
  if (nums.some((n) => !Number.isFinite(n))) return { error: 'Only numbers allowed, separated by commas or spaces' };
  return { nums };
}

export default function App() {
  const [text, setText] = useState('5, 3, 8, 1, 9, 2');
  const [input, setInput] = useState([5, 3, 8, 1, 9, 2]);
  const [error, setError] = useState('');
  const [algorithmId, setAlgorithmId] = useState('bubble-sort');
  const selectedAlgorithm = algorithmCategories
    .flatMap((category) => category.algorithms)
    .find((algorithm) => algorithm.id === algorithmId) ?? algorithmCategories[0].algorithms[0];

  const steps = useMemo(() => selectedAlgorithm.run(input), [input, selectedAlgorithm]);
  const player = usePlayer(steps);

  const apply = () => {
    const r = parseInput(text);
    if (r.error) return setError(r.error);
    setError('');
    setInput(r.nums);
  };

  return (
    <div className="app">
      <AlgorithmSidebar
        categories={algorithmCategories}
        activeAlgorithmId={selectedAlgorithm.id}
        onSelect={setAlgorithmId}
      />

      <main className="workspace">
        <header className="workspace-header">
          <span className="algorithm-description">{selectedAlgorithm.description}</span>
          <span className="complexity-badge">Time {selectedAlgorithm.complexity}</span>
        </header>

        <section className="visualizer-card" aria-label={`${selectedAlgorithm.label} visualization`}>
          <div className="section-heading">
            <div>
              <h2>Input array</h2>
              <p>Enter numbers separated by commas or spaces.</p>
            </div>
          </div>

          <div className="input-row">
            <input
              aria-label="Input numbers"
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') apply();
              }}
            />
            <button type="button" onClick={apply}>Apply</button>
          </div>
          {error && <p className="error" role="alert">{error}</p>}

          <ArrayBars
            values={player.step.state}
            highlight={player.step.highlight}
            sorted={player.step.sorted}
          />
          <ControlBar player={player} />

          <div className="explain" aria-live="polite">
            <strong>Explain</strong> <span>{player.step.explanation}</span>
          </div>
        </section>
        <section className="SearchBar" aria-label="Search bar">
          <div className="input-row">
            <button type="button" onClick={apply}>Search</button>
            <input
              aria-label="Ask AI"
              placeholder="Ask AI"
              onKeyDown={(event) => {
                if (event.key === 'Enter') apply();
              }}
            />
          </div>
        </section>
        <details className="Textbook">
          <summary>
            <span className="textbook-title">Textbook</span>
            <span className="textbook-chevron" aria-hidden="true" />
          </summary>
          <div className="textbook-content">
            {(() => {
              const DefinitionComponent = selectedAlgorithm.definition;
              return DefinitionComponent ? (
                <DefinitionComponent />
              ) : (
                <p>{selectedAlgorithm.description}</p>
              );
            })()}
          </div>
        </details>
      </main>
    </div>
  );
}