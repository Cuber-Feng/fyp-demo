import { useMemo, useState } from 'react';
import { bubbleSort } from './algorithms/bubbleSort';
import { usePlayer } from './hooks/usePlayer';
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

  const steps = useMemo(() => bubbleSort(input), [input]);
  const player = usePlayer(steps);

  const apply = () => {
    const r = parseInput(text);
    if (r.error) return setError(r.error);
    setError('');
    setInput(r.nums);
  };

  return (
    <div className="app">
      <h1>Demo</h1>

      <div className="input-row">
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={apply}>Apply</button>
      </div>
      {error && <p className="error">{error}</p>}

      <ArrayBars values={player.step.state}
                 highlight={player.step.highlight}
                 sorted={player.step.sorted} />
      <ControlBar player={player} />

      <div className="explain">
        <strong>Explanation:</strong> {player.step.explanation}
      </div>
    </div>
  );
}