import { useState, useEffect } from 'react';
import { TradeEntry } from '../types';

export function useTradeData() {
  const [entries, setEntries] = useState<TradeEntry[]>(() => {
    const saved = localStorage.getItem('tradeData');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) return parsed;
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tradeData', JSON.stringify(entries));
  }, [entries]);

  const addTrade = (rChange: number) => {
    setEntries((prev) => {
      const lastTotal = prev.length > 0 ? prev[prev.length - 1].totalR : 0;
      const newTotal = lastTotal + rChange;
      const newEntry: TradeEntry = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        rChange,
        totalR: newTotal,
      };
      return [...prev, newEntry];
    });
  };

  const resetData = () => {
    setEntries([]);
    localStorage.removeItem('tradeData');
  };

  const currentR = entries.length > 0 ? entries[entries.length - 1].totalR : 0;
  const isGoalReached = currentR >= 40;

  const calculateStreak = () => {
    const uniqueDates = Array.from(new Set(
      entries.filter(e => e.rChange !== 0).map(e => new Date(e.date).toDateString())
    ));
    return uniqueDates.length;
  };

  return { entries, addTrade, resetData, currentR, isGoalReached, streak: calculateStreak() };
}
