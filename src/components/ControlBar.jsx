export default function ControlBar({ player }) {
  const { index, total, isPlaying, speed, setSpeed, next, prev, reset, toggle } = player;
  return (
    <div className="controls">
      <span className="control-buttons">
        <button onClick={reset}>⏹ <span className="control-label">Reset</span></button>
        <button onClick={prev} disabled={index === 0}>
          ⏮ <span className="control-label">Previous</span>
        </button>
        <button onClick={toggle}>
          {isPlaying ?
            (<>⏸ <span className="control-label">Pause</span></>)
            : (<>▶ <span className="control-label">Play</span></>)}
        </button>
        <button onClick={next} disabled={index === total - 1}>
          <span className="control-label">Next</span> ⏭
        </button>
      </span>
      <label>
        Speed {speed.toFixed(1)}x
        <input type="range" min="0.5" max="5" step="0.5"
          value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
      </label>
      <span>Step {index + 1} / {total}</span>
    </div>
  );
}