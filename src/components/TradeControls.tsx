import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ControlsProps {
  onAddTrade: (r: number) => void;
}

export function TradeControls({ onAddTrade }: ControlsProps) {
  const [customR, setCustomR] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(customR);
    if (!isNaN(val)) {
      onAddTrade(val);
      setCustomR('');
    }
  };

  const buttons = [
    { label: '+5R', value: 5, color: 'from-emerald-500/20 to-emerald-400/10 text-emerald-400 border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]' },
    { label: '+2R', value: 2, color: 'from-emerald-500/20 to-emerald-400/10 text-emerald-400 border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]' },
    { label: '+1R', value: 1, color: 'from-emerald-500/20 to-emerald-400/10 text-emerald-400 border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]' },
    { label: '-1R', value: -1, color: 'from-red-500/20 to-red-400/10 text-red-400 border-red-500/30 hover:border-red-400/60 hover:shadow-[0_0_15px_rgba(248,113,113,0.3)]' },
    { label: '-2R', value: -2, color: 'from-red-500/20 to-red-400/10 text-red-400 border-red-500/30 hover:border-red-400/60 hover:shadow-[0_0_15px_rgba(248,113,113,0.3)]' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-wrap items-center gap-3 p-4 rounded-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}
    >
      {buttons.map((btn) => (
        <button
          key={btn.label}
          onClick={() => onAddTrade(btn.value)}
          className={`px-5 py-2.5 rounded-xl font-medium border bg-gradient-to-b transition-all duration-300 ${btn.color}`}
        >
          {btn.label}
        </button>
      ))}
      
      <form onSubmit={handleCustomSubmit} className="flex items-center gap-2 ml-auto">
        <input
          type="number"
          step="0.1"
          value={customR}
          onChange={(e) => setCustomR(e.target.value)}
          placeholder="Custom R"
          className="w-28 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-200 placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all shadow-inner"
        />
        <button
          type="submit"
          disabled={!customR}
          className="px-5 py-2.5 bg-white/10 text-white border border-white/10 rounded-xl font-medium hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          Add
        </button>
      </form>
    </motion.div>
  );
}
