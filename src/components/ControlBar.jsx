export default function ControlBar({ player }) {
  const { index, total, isPlaying, speed, setSpeed, next, prev, reset, toggle } = player;
  return (
    <div className="controls">
      <button onClick={reset}>⏮ 重置</button>
      <button onClick={prev} disabled={index === 0}>◀ 上一步</button>
      <button onClick={toggle}>{isPlaying ? '⏸ 暂停' : '▶ 播放'}</button>
      <button onClick={next} disabled={index === total - 1}>下一步 ▶</button>
      <label>
        速度 {speed}x
        <input type="range" min="0.5" max="4" step="0.5"
               value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
      </label>
      <span>步骤 {index + 1} / {total}</span>
    </div>
  );
}