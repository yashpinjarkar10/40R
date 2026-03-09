import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

interface CelebrationProps {
  isGoalReached: boolean;
}

export function Celebration({ isGoalReached }: CelebrationProps) {
  useEffect(() => {
    if (isGoalReached) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isGoalReached]);

  return (
    <AnimatePresence>
      {isGoalReached && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -50 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="fixed top-10 left-1/2 -translate-x-1/2 z-50"
        >
          <div 
            className="px-10 py-6 rounded-3xl text-center relative overflow-hidden"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(16,185,129,0.2)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 animate-pulse" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 mb-2 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)] relative z-10">
              🎉 Goal Achieved!
            </h2>
            <p className="text-white/80 font-medium text-lg relative z-10">
              You reached 40R. Time to buy your PS5.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
