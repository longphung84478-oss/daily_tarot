import React from "react";
import { motion } from "motion/react";
import { Sparkles, Calendar, BookOpen, HeartHandshake, Eye, Map, Compass } from "lucide-react";
import { TarotReadingResult, CardDraw } from "../types";
import TarotCardView from "./TarotCard";
import { playChime } from "../utils/audio";

interface InterpretationPanelProps {
  result: TarotReadingResult;
  draws: CardDraw[];
  question: string;
  onReset: () => void;
}

// Convert string linebreaks to beautiful JSX paragraphs
function renderParagraphs(text: string) {
  if (!text) return null;
  return text.split("\n\n").map((para, idx) => {
    const trimmed = para.trim();
    if (!trimmed) return null;
    return (
      <p key={idx} className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed mb-3 last:mb-0">
        {trimmed}
      </p>
    );
  });
}

export default function InterpretationPanel({ result, draws, question, onReset }: InterpretationPanelProps) {
  const handleResetClick = () => {
    playChime();
    onReset();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 select-none font-sans space-y-12 pb-20">
      
      {/* Intro Header Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/25 bg-amber-500/5 text-amber-400 text-xs font-mono tracking-widest uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          Khai Mở Huyền Thư Tarot
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-amber-100 font-medium tracking-tight">
          Lời Sấm Truyền Chỉ Dẫn
        </h1>
        <div className="text-xs font-mono text-gray-500 max-w-lg mx-auto bg-black/30 border border-slate-900/50 p-2 rounded-xl">
          Nghi vấn tâm thế: <span className="text-amber-400">"{question}"</span>
        </div>
      </div>

      {/* Preface / Open mystical message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-slate-900/40 backdrop-blur-md border border-amber-500/15 p-6 md:p-8 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none border-t border-l border-amber-500/40 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none border-t border-r border-amber-500/40 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none border-b border-l border-amber-500/40 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none border-b border-r border-amber-500/40 rounded-br-2xl" />

        <div className="flex flex-col items-center text-center space-y-4">
          <Eye className="w-8 h-8 text-amber-500/80 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
          <h2 className="font-serif text-lg md:text-xl text-amber-200 uppercase tracking-wider">
            Lời Khai Mở Thần Bí
          </h2>
          <div className="max-w-2xl border-t border-slate-800/60 pt-4 text-justify">
            {renderParagraphs(result.introduction)}
          </div>
        </div>
      </motion.div>

      {/* Cards & Reading grid */}
      <div className="space-y-6">
        <h2 className="text-xs font-mono tracking-widest text-amber-500 uppercase text-center">
          — Luận Giải Chi Tiết Từng Lá Bài —
        </h2>

        <div className="space-y-6">
          {draws.map((draw, idx) => {
            // Find corresponding interpretation from result
            const cardInterpret = result.cardReadings.find(
              (cr) => cr.cardId === draw.card.id
            ) || {
              title: `Lá ${draw.card.nameVi} (${draw.isReversed ? "Chiều Ngược" : "Chiều Xuôi"})`,
              interpretation: "Vũ trụ đang kết nối nội dung. Lá bài mang đến sự cân bằng tâm hồn.",
            };

            return (
              <motion.div
                key={draw.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-slate-900/20 backdrop-blur-sm border border-slate-800/80 hover:border-amber-500/10 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center md:items-start transition-all"
              >
                {/* Visual Layout Preview Left */}
                <div className="flex-shrink-0 self-center md:self-start md:sticky md:top-4">
                  <div className="relative">
                    {/* Shadow halo disk indicator */}
                    <div className="absolute inset-0 rounded-xl bg-amber-500/5 filter blur-md" />
                    
                    <TarotCardView
                      card={draw.card}
                      isReversed={draw.isReversed}
                      isFlipped={true}
                      size="sm"
                      interactive={false}
                    />
                  </div>
                </div>

                {/* Text Interpretation Details Right */}
                <div className="flex-1 space-y-4 w-full">
                  <div className="border-b border-slate-850 pb-3 flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono bg-amber-500/15 border border-amber-500/30 text-amber-400 uppercase tracking-wider">
                        Vị trí {idx + 1}: {draw.positionTitle}
                      </span>
                      <span className="text-[10px] font-sans text-gray-500">
                        {draw.positionDescription}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-amber-300">
                      {cardInterpret.title}
                    </h3>

                    <h4 className="text-[11px] text-gray-400 font-sans italic">
                      Từ khóa cốt lõi: "{draw.card.keyword}"
                    </h4>
                  </div>

                  <div className="text-justify whitespace-pre-wrap leading-relaxed">
                    {renderParagraphs(cardInterpret.interpretation)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Actionable General Advisor Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border border-indigo-500/15 p-6 rounded-2xl shadow-xl flex gap-5 items-start"
      >
        <div className="p-3 border border-indigo-500/25 bg-indigo-500/10 rounded-xl text-indigo-400 hidden sm:block">
          <Compass className="w-5 h-5 animate-pulse" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase block">
              Chỉ Dẫn Hành Động
            </span>
          </div>
          <h3 className="font-serif text-lg text-indigo-200">
            Lời Khuyên Tổng Thể
          </h3>
          <div className="max-w-none pt-2 border-t border-indigo-500/10 text-justify">
            {renderParagraphs(result.advice)}
          </div>
        </div>
      </motion.div>

      {/* Spiritual Conclusion section & Reset Option */}
      <div className="space-y-8 text-center max-w-2xl mx-auto pt-4 border-t border-slate-900">
        <div className="space-y-3">
          <HeartHandshake className="w-6 h-6 text-amber-500/70 mx-auto" />
          <h3 className="font-serif text-lg text-amber-200">Lời Nguyện Cầu Cát Tường</h3>
          <div className="italic text-xs text-gray-400 px-6 font-serif leading-relaxed text-center">
            {renderParagraphs(result.conclusion)}
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleResetClick}
            className="px-8 py-3.5 rounded-xl border border-amber-400 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:bg-amber-400 transition-all cursor-pointer"
          >
            Trở Lại Cổng Vũ Trụ
          </motion.button>
        </div>
      </div>

    </div>
  );
}
export { renderParagraphs };
