import { motion } from 'motion/react';

interface ProgressBarProps {
  current: number;
  target: number;
}

export function ProgressBar({ current, target }: ProgressBarProps) {
  const percentage = Math.min(Math.max((current / target) * 100, 0), 100);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full"
    >
      <div className="flex justify-between text-sm font-medium mb-3 px-1">
        <span className="text-white/60 uppercase tracking-widest text-xs">Progress</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-bold tracking-wide">
          {current.toFixed(1)}R <span className="text-white/40 font-normal">/ {target}R</span>
        </span>
      </div>
      <div className="h-4 w-full bg-black/40 rounded-full overflow-hidden border border-white/10 shadow-inner relative backdrop-blur-sm">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" style={{ backgroundSize: '200% 100%' }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
