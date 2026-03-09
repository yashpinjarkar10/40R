import { useTradeData } from './hooks/useTradeData';
import { GlassChart } from './components/GlassChart';
import { TradeControls } from './components/TradeControls';
import { ProgressBar } from './components/ProgressBar';
import { TradeHistory } from './components/TradeHistory';
import { Celebration } from './components/Celebration';
import { Background } from './components/Background';
import { RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const { entries, addTrade, resetData, currentR, isGoalReached } = useTradeData();

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-blue-500/30 relative overflow-x-hidden">
      <Background />
      <Celebration isGoalReached={isGoalReached} />
      
      <main className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
            <span className="text-xs font-semibold tracking-widest text-white/60 uppercase">The 40R Challenge</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm">
            Road to PS5
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light">
            Track your trading progress. Hit 40R and unlock your PS5.
          </p>
        </motion.header>

        <div className="space-y-10">
          {/* Main Chart Section */}
          <section className="space-y-8">
            <ProgressBar current={currentR} target={40} />
            <GlassChart data={entries} isGoalReached={isGoalReached} />
          </section>

          {/* Controls Section */}
          <section className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-1 w-full">
              <TradeControls onAddTrade={addTrade} />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-auto flex items-center justify-between lg:flex-col lg:items-end gap-6 p-6 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="text-left lg:text-right">
                <div className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2">Current Balance</div>
                <div className={`text-4xl md:text-5xl font-bold tracking-tighter ${currentR >= 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]' : 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-200 drop-shadow-[0_0_15px_rgba(248,113,113,0.3)]'}`}>
                  {currentR.toFixed(1)}R
                </div>
              </div>
              
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all progress?')) {
                    resetData();
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-red-400/80 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 rounded-xl transition-all shadow-inner"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Progress
              </button>
            </motion.div>
          </section>

          {/* Trade Log Section */}
          <section className="pt-8">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6 px-2"
            >
              Trade History
            </motion.h3>
            <TradeHistory data={entries} />
          </section>
        </div>
      </main>
    </div>
  );
}
