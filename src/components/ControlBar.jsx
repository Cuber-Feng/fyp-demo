export default function ControlBar({ player }) {
  const { index, total, isPlaying, speed, setSpeed, next, prev, reset, toggle } = player;
  return (
    <div className="controls">
      <button onClick={reset}>⏮ Reset</button>
      <button onClick={prev} disabled={index === 0}>◀ Previous</button>
      <button onClick={toggle}>{isPlaying ? '⏸ Pause' : '▶ Play'}</button>
      <button onClick={next} disabled={index === total - 1}>Next ▶</button>
      <label>
        Speed {speed.toFixed(1)}x
        <input type="range" min="0.5" max="5" step="0.5"
               value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
      </label>
      <span>Step {index + 1} / {total}</span>
    </div>
  );
}