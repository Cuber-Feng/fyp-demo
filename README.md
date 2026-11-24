# FYP Demo

> This is a demo of my FYP

## Structure

```
src/
├─ algorithms/        # 纯逻辑：bubbleSort.ts, dijkstra.ts, types.ts
├─ hooks/usePlayer.ts
├─ components/
│  ├─ viz/            # ArrayBars, GraphView, DistTable
│  ├─ ControlBar.tsx  # Prev/Next/Play/Speed
│  ├─ ExplainPanel.tsx
│  ├─ CodePanel.tsx
│  └─ AIChat.tsx
├─ pages/App.tsx      # 选择算法 + 输入 + 组合各面板
server/index.ts       # AI 代理（可选）
```

## Other

