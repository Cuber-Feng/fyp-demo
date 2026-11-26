import { useMemo, useState } from 'react';
import { algorithmCategories } from './algorithms/registry';
import { usePlayer } from './hooks/usePlayer';
import AlgorithmSidebar from './components/AlgorithmSidebar';
import ArrayBars from './components/ArrayBars';
import ArrayGenerator from './components/ArrayGenerator';
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
  const [earlyStop, setEarlyStop] = useState(false);
  const [algorithmId, setAlgorithmId] = useState('bubble-sort');
  const selectedAlgorithm = algorithmCategories
    .flatMap((category) => category.algorithms)
    .find((algorithm) => algorithm.id === algorithmId) ?? algorithmCategories[0].algorithms[0];

  const steps = useMemo(
    () => selectedAlgorithm.id === 'bubble-sort'
      ? selectedAlgorithm.run(input, earlyStop)
      : selectedAlgorithm.run(input),
    [input, selectedAlgorithm, earlyStop],
  );
  const player = usePlayer(steps);

  const apply = () => {
    const r = parseInput(text);
    if (r.error) return setError(r.error);
    setError('');
    setInput(r.nums);
  };

  const handleGenerateArray = (values) => {
    const generatedText = values.join(', ');
    setText(generatedText);
    setInput(values);
    setError('');
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

          <ArrayGenerator maxLength={MAX_LEN} onGenerate={handleGenerateArray} />

          <div className="input-row">
            <input
              aria-label="Input numbers"
              value={text}
              onChange={(event) => { setText(event.target.value); apply(); }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') apply();
              }}
            />
            {/* <button type="button" onClick={apply}>Apply</button> */}
          </div>
          {/* {error && <p className="error" role="alert">{error}</p>} */}

          <ArrayBars
            values={player.step.state}
            highlight={player.step.highlight}
            sorted={player.step.sorted}
          />
          {selectedAlgorithm.id === 'bubble-sort' && (
            <div className="algorithm-options">
              <label className="early-stop-toggle" title="Stop after a pass with no swaps">
                <span>Early stop</span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={earlyStop}
                  onChange={(event) => setEarlyStop(event.target.checked)}
                />
              </label>
            </div>
          )}

          <ControlBar player={player} />

          <div className="explain" aria-live="polite">
            <strong>Explain</strong> <span>{player.step.explanation}</span>
          </div>
        </section>
        <section className="SearchBar" aria-label="Search bar">
          <div className="input-row">
            <button type="button" onClick={apply}>
              <img
                src="./icons/search.svg"
                width="28"
                style={{ filter: 'invert(1)' }}
                alt="Search"
              />
            </button>
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