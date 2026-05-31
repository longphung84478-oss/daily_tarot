import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

export default function MysticBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate static stars once at initialization
    const generatedStars: Star[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-black select-none pointer-events-none">
      {/* Mystical rotating grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(99,102,241,0.03)_1px,_transparent_1px)] bg-[size:4rem_4rem] scale-[1.5] -rotate-12 transform origin-center opacity-60" />

      {/* Floating Nebula spots */}
      <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/10 blur-[150px]" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-violet-900/15 blur-[150px]" />
      <div className="absolute top-[35%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-purple-900/10 blur-[180px]" />

      {/* Gilded Sacred Geometry Seal (Background center) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-10">
        <motion.svg
          width="min(500px, 90vw)"
          height="min(500px, 90vw)"
          viewBox="0 0 200 200"
          className="text-amber-500/80 stroke-[0.5]"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        >
          {/* Main outer ring */}
          <circle cx="100" cy="100" r="95" className="stroke-amber-400" />
          <circle cx="100" cy="100" r="90" className="stroke-amber-500/50 stroke-dasharray-[2_4]" />
          
          {/* Hexagram / Star of David structure */}
          <polygon points="100,5 182.27,147.5 17.73,147.5" className="stroke-amber-500/60" />
          <polygon points="100,195 182.27,52.5 17.73,52.5" className="stroke-amber-500/60" />

          {/* Inner circle of alignments */}
          <circle cx="100" cy="100" r="52.5" className="stroke-amber-400" />
          <circle cx="100" cy="100" r="30" className="stroke-amber-400" />
          
          {/* Zodiac or runic dash dividers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 100 + 52.5 * Math.cos(angle);
            const y1 = 100 + 52.5 * Math.sin(angle);
            const x2 = 100 + 95 * Math.cos(angle);
            const y2 = 100 + 95 * Math.sin(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-amber-500/30" />
            );
          })}

          {/* Inner Pentagram */}
          <polygon points="100,70 117.63,124.3 71.35,90.7 128.65,90.7 82.37,124.3" className="stroke-amber-400/40" />
        </motion.svg>
      </div>

      {/* Twinkling Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white shadow-glow"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.duration}s infinite ease-in-out`,
              animationDelay: `${star.delay}s`,
              opacity: 0.15,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.95; transform: scale(1.3); }
        }
        .shadow-glow {
          box-shadow: 0 0 4px rgba(251, 191, 36, 0.5);
        }
      `}</style>
    </div>
  );
}
