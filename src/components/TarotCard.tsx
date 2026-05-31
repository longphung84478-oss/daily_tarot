import React from "react";
import { motion } from "motion/react";
import {
  Compass,
  Sparkles,
  Eye,
  Crown,
  Shield,
  Scroll,
  Heart,
  Zap,
  ShieldAlert,
  Moon,
  RefreshCw,
  Scale,
  Hourglass,
  Skull,
  Droplet,
  Flame,
  Layers,
  Star,
  Bell,
  Globe,
  AlertCircle
} from "lucide-react";
import { TarotCard as CardType } from "../types";
import { playCardFlip } from "../utils/audio";

// Map string icon name from tarotData to the concrete Lucide FC
const iconMap: Record<string, React.ComponentType<any>> = {
  Compass,
  Sparkles,
  Eye,
  Crown,
  Shield,
  Scroll,
  Heart,
  Zap,
  ShieldAlert,
  Moon,
  RefreshCw,
  Scale,
  Hourglass,
  Skull,
  Droplet,
  Flame,
  Layers,
  Star,
  Bell,
  Globe
};

// Map Element to specific styling variables
const elementGlowMap = {
  Air: {
    color: "from-yellow-400 to-amber-500",
    textClass: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    glow: "rgba(251, 191, 36, 0.25)"
  },
  Fire: {
    color: "from-red-500 to-orange-500",
    textClass: "text-orange-400 bg-orange-400/10 border-orange-400/30",
    glow: "rgba(239, 68, 68, 0.25)"
  },
  Water: {
    color: "from-cyan-500 to-indigo-500",
    textClass: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    glow: "rgba(6, 182, 212, 0.25)"
  },
  Earth: {
    color: "from-emerald-500 to-teal-600",
    textClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    glow: "rgba(16, 185, 129, 0.25)"
  },
  Spirit: {
    color: "from-purple-500 to-pink-500",
    textClass: "text-purple-400 bg-purple-400/10 border-purple-400/30",
    glow: "rgba(168, 85, 247, 0.25)"
  }
};

// Help convert card number to Roman numerals
function getRomanNumeral(num: number): string {
  const roman = ["O", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
  return roman[num] || num.toString();
}

interface TarotCardProps {
  card: CardType;
  isReversed: boolean;
  isFlipped: boolean;
  onClick?: () => void;
  index?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
}

export default function TarotCard({
  card,
  isReversed,
  isFlipped,
  onClick,
  index = 0,
  size = "md",
  interactive = true,
}: TarotCardProps) {
  const IconComponent = iconMap[card.iconName] || Compass;
  const elementStyles = elementGlowMap[card.element] || elementGlowMap.Spirit;

  const handleFlipClick = () => {
    if (interactive && onClick) {
      playCardFlip();
      onClick();
    }
  };

  // Sizing definitions
  const sizeClasses = {
    sm: "w-32 h-56",
    md: "w-44 h-76",
    lg: "w-52 h-92"
  };

  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 select-none ${sizeClasses[size]} ${
        interactive ? "hover:scale-[1.03] hover:-translate-y-2 active:scale-95" : ""
      }`}
      style={{ perspective: "1000px" }}
      onClick={handleFlipClick}
    >
      {/* 3D rotation wrapper */}
      <motion.div
        className="w-full h-full duration-500 relative rounded-xl shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      >
        {/* ================= CARD BACK ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl p-3 border-2 border-amber-500/40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-black select-none"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Ornate decorative inner border */}
          <div className="w-full h-full border border-amber-600/20 rounded-lg p-2 relative flex flex-col items-center justify-between">
            {/* Corner filigrees */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-amber-500/50 rounded-tl" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-amber-500/50 rounded-tr" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-amber-500/50 rounded-bl" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-amber-500/50 rounded-br" />

            {/* Top Back emblem */}
            <div className="text-[9px] font-serif tracking-widest text-amber-500/40 uppercase">Mystic Portal</div>

            {/* Central cosmic eye/seal */}
            <div className="flex-1 flex items-center justify-center relative">
              {/* Outer halo */}
              <div className="absolute w-24 h-24 rounded-full border border-amber-500/20 animate-spin" style={{ animationDuration: "35s" }} />
              <div className="absolute w-20 h-20 rounded-full border border-dashed border-amber-400/10 animate-spin" style={{ animationDuration: "25s", animationDirection: "reverse" }} />
              
              {/* Core gold emblem */}
              <div className="w-14 h-14 rounded-full bg-indigo-950/40 border border-amber-500/30 flex items-center justify-center relative shadow-[0_0_12px_rgba(245,158,11,0.15)]">
                {/* Sun & Moon intertwined */}
                <div className="absolute w-7 h-7 rounded-full bg-amber-500/10 border-r border-b border-amber-400/50 transform rotate-12" />
                <div className="w-3 h-3 bg-amber-400/60 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                
                {/* Micro stars */}
                <span className="absolute -top-3 left-2 text-[6px] text-amber-300 font-sans">✦</span>
                <span className="absolute -bottom-2 right-1 text-[5px] text-amber-300 font-sans">✦</span>
                <span className="absolute top-5 -right-3 text-[5px] text-amber-300 font-sans">✦</span>
              </div>
            </div>

            {/* Bottom Back emblem */}
            <div className="text-[7px] font-mono tracking-wider text-amber-500/30">GEN_SYS_V3</div>
          </div>
        </div>

        {/* ================= CARD FRONT ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl p-3 border-2 border-amber-500 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black overflow-hidden select-none"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Gold foiled card border */}
          <div className="w-full h-full border border-amber-500/30 rounded-lg p-1.5 flex flex-col justify-between relative bg-black/40">
            {/* Micro background constellation */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] bg-[size:10px_10px]" />
            
            {/* Card corner decorations */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-amber-400/70" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-amber-400/70" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-amber-400/70" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-amber-400/70" />

            {/* Top metadata row (Roman numeral & Element label) */}
            <div className="flex items-center justify-between text-xs px-2 z-10">
              <span className="font-serif text-sm font-semibold text-amber-400 select-none">
                {getRomanNumeral(card.number)}
              </span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded border leading-none font-mono tracking-widest uppercase ${elementStyles.textClass}`}>
                {card.element}
              </span>
            </div>

            {/* Main Central Illustration area */}
            <div className="flex-1 flex items-center justify-center relative p-2 z-10">
              {/* Elemental halo disk */}
              <div
                className={`absolute w-24 h-24 rounded-full bg-gradient-to-tr ${elementStyles.color} opacity-10 animate-pulse`}
                style={{ filter: `blur(8px)` }}
              />
              <div 
                className="absolute w-20 h-20 rounded-full border border-amber-500/20"
                style={{ boxShadow: `0 0 15px ${elementStyles.glow}` }}
              />

              {/* Icon component flipped 180 degrees if drawing is reversed */}
              <div className={`transition-transform duration-500 ${isReversed ? "rotate-180" : ""}`}>
                <IconComponent className={`w-10 h-10 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]`} />
              </div>
            </div>

            {/* Bottom identifier row */}
            <div className="text-center flex flex-col gap-0.5 px-0.5 z-10 pb-0.5">
              {/* Orientation Tag */}
              <div className="flex justify-center mb-1">
                <span className={`text-[8px] px-1 py-0.1 border rounded uppercase font-mono px-2 select-none tracking-wider ${
                  isReversed 
                    ? "text-red-400 border-red-500/30 bg-red-500/10" 
                    : "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                }`}>
                  {isReversed ? "Ngược ▽" : "Xuôi △"}
                </span>
              </div>

              {/* Cards Name */}
              <h3 className="font-serif font-semibold text-amber-300 text-sm leading-tight tracking-wide truncate">
                {card.nameVi}
              </h3>
              
              {/* Original Name in English */}
              <span className="font-sans text-[10px] text-gray-400/80 italic leading-none truncate md:block hidden">
                {card.name}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export { getRomanNumeral };
