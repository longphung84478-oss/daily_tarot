import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const INSPIRATIONAL_MESSAGES = [
  "Đang mở cổng liên kết linh hồn...",
  "Đang dọn sạch trường năng lượng nhiễu loạn...",
  "Đang cảm nhận các rung động tần số xung quanh...",
  "Các tinh vân đang hội tụ về vòng tròn phong ấn...",
  "Bánh xe số phận bắt đầu dịch chuyển...",
  "Trí tuệ vũ trụ đang dệt nên sợi dây giải nghĩa...",
  "Chuẩn bị đón lấy thông điệp khai sáng từ các bậc hiền triết..."
];

export default function OracleLoader() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % INSPIRATIONAL_MESSAGES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh] select-none">
      
      {/* 3D Crystal Ball Visual */}
      <div className="relative w-44 h-44 mb-10 flex items-center justify-center">
        {/* Outer glowing orbital ring */}
        <motion.div
          className="absolute w-40 h-40 rounded-full border border-amber-500/30 border-t-amber-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-indigo-500/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Outer particle dust circles */}
        <div className="absolute inset-0 rounded-full border border-dashed border-violet-500/10 scale-[1.3] animate-pulse" />

        {/* The Crystal Ball core */}
        <div className="w-28 h-28 rounded-full relative overflow-hidden bg-gradient-to-tr from-indigo-950 via-purple-950 to-indigo-900 border border-violet-500/40 shadow-[0_0_50px_rgba(99,102,241,0.5),_inset_0_0_24px_rgba(168,85,247,0.4)] flex items-center justify-center">
          
          {/* Inner swirling gas cloud 1 */}
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-indigo-500/20 blur-md"
            animate={{
              x: [10, -10, 10],
              y: [-12, 12, -12],
              scale: [1, 1.25, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Swirling gas cloud 2 */}
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-violet-400/20 blur-md"
            animate={{
              x: [-12, 12, -12],
              y: [10, -10, 10],
              scale: [1.2, 0.9, 1.2],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Central cosmic spark */}
          <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.9)] animate-ping" />
        </div>

        {/* Gold support claw base */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-gradient-to-r from-amber-700/50 via-amber-500/70 to-amber-700/50 clip-paths border-t border-amber-300 rounded-b shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
          <div className="w-12 h-1 bg-amber-200/80 mx-auto rounded-full mt-0.5" />
        </div>
      </div>

      {/* Loading title */}
      <h3 className="font-serif text-lg text-amber-200 font-medium tracking-wide mb-3 animate-pulse">
        Hội Tụ Tinh Vân Giải Đoán
      </h3>

      {/* Incantations switcher */}
      <div className="h-10 relative flex items-center justify-center w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.85, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8 }}
            className="text-gray-400 text-xs md:text-sm font-sans tracking-wide italic leading-relaxed"
          >
            {INSPIRATIONAL_MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Decorative cosmic alignment */}
      <div className="flex gap-1 items-center mt-6">
        <span className="w-1 h-1 rounded-full bg-amber-500/30" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 animate-ping" />
        <span className="w-1 h-1 rounded-full bg-amber-500/30" />
      </div>
    </div>
  );
}
