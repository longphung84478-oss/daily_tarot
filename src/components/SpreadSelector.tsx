import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { TAROT_SPREADS } from "../data/tarotData";
import { TarotSpread } from "../types";
import { playChime } from "../utils/audio";

interface SpreadSelectorProps {
  onSelect: (payload: { question: string; spread: TarotSpread }) => void;
}

const CONSTANT_SUGGESTIONS = [
  "Sự nghiệp hằng ngày",
  "Tình duyên tháng mới",
  "Năng lượng chữa lành",
  "Nút thắt quyết định"
];

export default function SpreadSelector({ onSelect }: SpreadSelectorProps) {
  const [question, setQuestion] = useState("");
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedSpread) return;
    
    playChime();
    onSelect({
      question: question.trim() || "Nhận lời khuyên định hướng chung hằng ngày cho cuộc sống.",
      spread: selectedSpread
    });
  };

  const handleSuggestionClick = (text: string) => {
    setQuestion(`Dự đoán vận trình: ${text}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Mystical Header Title */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Tiên Tri Cổ Đại
        </motion.div>
        
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-amber-100 tracking-tight leading-tight mb-3">
          Cổng Vũ Trụ Tarot
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-sans leading-relaxed">
          Tĩnh tâm hướng suy nghĩ về khúc mắc hiện tại của bản thân. Hãy nhập câu hỏi dưới đây và bốc một tụ bài để bắt đầu thông linh.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Query Input Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-amber-500/15 p-6 rounded-2xl relative shadow-2xl">
          {/* Glowing accent border */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-500/35 to-transparent" />

          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2 text-xs font-mono tracking-wider text-amber-400 uppercase">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              Nghi vấn hiện thời của bạn (Tùy chọn)
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ví dụ: Tôi có nên thực hiện kế hoạch chuyển đổi công việc sắp tới không?..."
              className="w-full bg-black/40 border border-slate-700 hover:border-slate-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-500/30 text-slate-100 px-4 py-3.5 rounded-xl font-sans text-sm outline-none transition-all placeholder:text-gray-600 shadow-inner"
            />

            {/* Quick Suggestions Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-[11px] text-gray-500 font-sans mr-1">Gợi ý nhanh:</span>
              {CONSTANT_SUGGESTIONS.map((sug, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => handleSuggestionClick(sug)}
                  className="text-xs px-2.5 py-1 rounded-full border border-slate-800 bg-slate-800/20 text-gray-400 hover:text-amber-300 hover:bg-slate-850 hover:border-amber-500/30 transition-all font-sans"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Spread Selector List */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono tracking-widest text-amber-500 uppercase text-center px-4">
            — Lựa Chọn Loại Trải Bài Tarot —
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TAROT_SPREADS.map((spread) => {
              const isSelected = selectedSpread?.id === spread.id;
              return (
                <div
                  key={spread.id}
                  onClick={() => setSelectedSpread(spread)}
                  className={`cursor-pointer group relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "bg-indigo-900/10 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.1)] translate-y-[-2px]"
                      : "bg-slate-900/30 border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/50"
                  }`}
                >
                  {/* Select ring indicator */}
                  {isSelected && (
                    <div className="absolute right-3.5 top-3.5 flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-sans font-bold text-[10px]">
                      ✓
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono tracking-wide ${
                        isSelected ? "bg-amber-400/20 text-amber-300" : "bg-slate-800 text-gray-500"
                      }`}>
                        {spread.cardCount} Lá Bài
                      </span>
                    </div>

                    <h3 className={`font-serif text-lg font-medium group-hover:text-amber-200 transition-colors ${
                      isSelected ? "text-amber-300" : "text-slate-200"
                    }`}>
                      {spread.name}
                    </h3>
                    
                    <p className="text-gray-400 text-xs font-sans leading-relaxed">
                      {spread.description}
                    </p>
                  </div>

                  {/* Spread positions previews */}
                  <div className="mt-4 pt-3 border-t border-slate-800/50">
                    <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase block mb-1.5">Cách xếp lá:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {spread.positions.map((pos, pIdx) => (
                        <span key={pIdx} className="text-[10px] px-2 py-1 bg-black/30 border border-slate-800 text-slate-300 rounded-md font-sans">
                          {pIdx + 1}. {pos.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-2">
          <motion.button
            whileDisabled={{ opacity: 0.4 }}
            disabled={!selectedSpread}
            type="submit"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-amber-400 bg-amber-500 text-slate-950 hover:bg-amber-400 disabled:border-slate-800 disabled:bg-slate-900 disabled:text-gray-600 transition-all cursor-pointer font-sans font-semibold tracking-wide shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]"
          >
            Mở Cổng Vận Mệnh
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
