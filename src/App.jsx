import { useMemo, useState } from 'react';
import { bubbleSort } from './algorithms/bubbleSort';
import { usePlayer } from './hooks/usePlayer';
import ArrayBars from './components/ArrayBars';
import ControlBar from './components/ControlBar';
import './App.css';

const MAX_LEN = 20;

function parseInput(text) {
  const parts = text.split(/[\s,，]+/).filter(Boolean);
  if (parts.length < 2) return { error: '请至少输入 2 个数字' };
  if (parts.length > MAX_LEN) return { error: `最多支持 ${MAX_LEN} 个数字` };
  const nums = parts.map(Number);
  if (nums.some((n) => !Number.isFinite(n))) return { error: '只能输入数字，用逗号或空格分隔' };
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
      <h1>Algorithm Visualizer · Demo</h1>

      <div className="input-row">
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={apply}>应用</button>
      </div>
      {error && <p className="error">{error}</p>}

      <ArrayBars values={player.step.state}
                 highlight={player.step.highlight}
                 sorted={player.step.sorted} />
      <ControlBar player={player} />

      <div className="explain">
        <strong>当前步骤解释：</strong> {player.step.explanation}
      </div>
    </div>
  );
}