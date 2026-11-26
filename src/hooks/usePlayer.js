/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';

export function usePlayer(steps) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const last = steps.length - 1;
  const currentIndex = Math.min(index, Math.max(last, 0));

  // 输入变化、步骤重新生成时回到起点
  useEffect(() => {
    setIndex(0);
    setIsPlaying(false);
  }, [steps]);

  // 自动播放：每次 index 变化后排下一次定时
  useEffect(() => {
    if (!isPlaying) return;
    if (index >= last) {
      setIsPlaying(false);
      return;
    }
    const id = setTimeout(() => setIndex((i) => Math.min(i + 1, last)), 800 / speed);
    return () => clearTimeout(id);
  }, [isPlaying, index, last, speed]);

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, last)), [last]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);
  const reset = useCallback(() => { setIndex(0); setIsPlaying(false); }, []);
  const toggle = useCallback(() => setIsPlaying((p) => !p), []);

  return {
    step: steps[currentIndex],
    index: currentIndex,
    total: steps.length,
    isPlaying,
    speed,
    setSpeed,
    next,
    prev,
    reset,
    toggle,
  };
}