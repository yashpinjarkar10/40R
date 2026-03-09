import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format } from 'date-fns';
import { TradeEntry } from '../types';
import { motion } from 'motion/react';

interface ChartProps {
  data: TradeEntry[];
  isGoalReached: boolean;
}

export function GlassChart({ data, isGoalReached }: ChartProps) {
  const chartData = data.map(entry => ({
    ...entry,
    displayDate: format(new Date(entry.date), 'MMM dd'),
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full h-[450px] relative rounded-3xl p-6"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* PS5 Image in top right */}
      <div className={`absolute top-6 right-6 z-10 transition-all duration-1000 ${isGoalReached ? 'scale-110 drop-shadow-[0_0_25px_rgba(16,185,129,0.8)]' : 'opacity-40 grayscale blur-[1px]'}`}>
        <div className="relative">
          {isGoalReached && (
            <div className="absolute inset-0 rounded-xl animate-ping bg-emerald-500/40" />
          )}
          <img 
            src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=200&auto=format&fit=crop" 
            alt="PS5" 
            className="w-20 h-20 rounded-xl object-cover border border-white/10 shadow-2xl relative z-10" 
            referrerPolicy="no-referrer" 
          />
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorR" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="displayDate" 
            stroke="rgba(255,255,255,0.4)" 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            minTickGap={30}
            dy={10}
          />
          <YAxis 
            domain={[0, 40]} 
            stroke="rgba(255,255,255,0.4)" 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickCount={6}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.8)', 
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '12px', 
              color: '#f8fafc',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
            itemStyle={{ color: '#10b981', fontWeight: 600 }}
            labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '4px', fontSize: '12px' }}
            formatter={(value: number) => [`${value.toFixed(1)}R`, 'Total R']}
          />
          <ReferenceLine 
            y={40} 
            stroke="#10b981" 
            strokeDasharray="4 4" 
            opacity={0.5}
            label={{ position: 'insideTopLeft', value: 'Goal: 40R', fill: '#10b981', fontSize: 12, fontWeight: 600 }} 
          />
          <Line 
            type="monotone" 
            dataKey="totalR" 
            stroke="url(#colorR)" 
            strokeWidth={4}
            dot={{ r: 4, fill: '#0f172a', stroke: '#8b5cf6', strokeWidth: 2 }}
            activeDot={{ r: 8, fill: '#10b981', stroke: '#fff', strokeWidth: 2, style: { filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.8))' } }}
            animationDuration={1500}
            isAnimationActive={true}
            style={{ filter: 'url(#glow)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
