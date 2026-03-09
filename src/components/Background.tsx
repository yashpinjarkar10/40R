import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Background() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="fixed inset-0 z-[-1] bg-[#020617]" />;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#020617]">
      {/* Gradient Mesh */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/30 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/30 blur-[120px]" />
      <div className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-emerald-900/20 blur-[120px]" />
      
      {/* Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{ width: size, height: size }}
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
            }}
            animate={{
              y: [`${Math.random() * 100}vh`, `-10vh`],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        );
      })}
    </div>
  );
}
