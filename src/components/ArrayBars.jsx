export default function ArrayBars({ values, highlight, sorted }) {
  const W = 600, H = 300, pad = 20;
  const max = Math.max(...values, 1);
  const barW = (W - pad * 2) / values.length;

  const colorOf = (i) =>
    highlight.includes(i) ? '#f59e0b' : sorted.includes(i) ? '#22c55e' : '#60a5fa';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="bars">
      {values.map((v, i) => {
        const h = (v / max) * (H - pad * 2 - 20);
        const x = pad + i * barW;
        return (
          <g key={i}>
            <rect x={x + 2} y={H - pad - h} width={barW - 4} height={h}
                  rx="3" fill={colorOf(i)} style={{ transition: 'all 0.3s' }} />
            <text x={x + barW / 2} y={H - pad - h - 6}
                  textAnchor="middle" fontSize="12" fill="currentColor">{v}</text>
          </g>
        );
      })}
    </svg>
  );
}