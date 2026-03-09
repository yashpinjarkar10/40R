import { format } from 'date-fns';
import { TradeEntry } from '../types';
import { motion } from 'motion/react';

interface TradeHistoryProps {
  data: TradeEntry[];
}

export function TradeHistory({ data }: TradeHistoryProps) {
  const trades = [...data].reverse();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full overflow-hidden rounded-3xl"
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
      }}
    >
      {trades.length === 0 ? (
        <div className="text-center py-12 text-white/40 text-sm">
          No trades logged yet. Start your journey!
        </div>
      ) : (
        <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="text-xs text-white/40 uppercase tracking-wider sticky top-0 bg-[#0f172a]/80 backdrop-blur-md z-10">
              <tr>
                <th className="px-6 py-4 font-medium border-b border-white/5">Date</th>
                <th className="px-6 py-4 font-medium text-right border-b border-white/5">R Change</th>
                <th className="px-6 py-4 font-medium text-right border-b border-white/5">Total R</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {trades.map((trade, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={trade.id} 
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 text-white/70">
                    {format(new Date(trade.date), 'MMM dd, yyyy HH:mm')}
                  </td>
                  <td className={`px-6 py-4 text-right font-medium ${trade.rChange >= 0 ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]' : 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]'}`}>
                    {trade.rChange >= 0 ? '+' : ''}{trade.rChange}R
                  </td>
                  <td className="px-6 py-4 text-right text-white font-medium">
                    {trade.totalR.toFixed(1)}R
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
