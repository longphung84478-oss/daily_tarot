import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, RefreshCw, Layers, ArrowRight } from "lucide-react";
import { TarotCard as CardType, TarotSpread, CardDraw } from "../types";
import { MAJOR_ARCANA, shuffleCards } from "../data/tarotData";
import TarotCardView from "./TarotCard";
import { playChime, playCardFlip, playDrawCard } from "../utils/audio";

interface TableLayoutProps {
  spread: TarotSpread;
  question: string;
  onBack: () => void;
  onInterpret: (drawn: CardDraw[]) => void;
}

export default function TableLayout({ spread, question, onBack, onInterpret }: TableLayoutProps) {
  const [stage, setStage] = useState<"ready_shuffle" | "shuffling" | "ready_deal" | "dealing" | "revealing">("ready_shuffle");
  const [shuffledPool, setShuffledPool] = useState<CardType[]>([]);
  const [draws, setDraws] = useState<CardDraw[]>([]);
  const [dealIndex, setDealIndex] = useState(0);
  const [selectedCardIdForPreview, setSelectedCardIdForPreview] = useState<number | null>(null);

  // Initialize pool of 22 Major Arcana cards
  useEffect(() => {
    setShuffledPool([...MAJOR_ARCANA]);
  }, []);

  const handleShuffle = () => {
    if (stage !== "ready_shuffle" && stage !== "ready_deal") return;
    setStage("shuffling");
    playChime();

    // Perform shuffling animation and swap logic
    let counter = 0;
    const interval = setInterval(() => {
      setShuffledPool((prev) => shuffleCards(prev));
      counter++;
      if (counter >= 4) {
        clearInterval(interval);
        setStage("ready_deal");
      }
    }, 280);
  };

  const handleDeal = () => {
    if (stage !== "ready_deal") return;
    setStage("dealing");
    playDrawCard();

    // Select N cards from the shuffled pool
    const selectedCards = shuffledPool.slice(0, spread.cardCount);
    const preparedDraws: CardDraw[] = selectedCards.map((card, idx) => ({
      id: `draw-${idx}-${Date.now()}`,
      card,
      isReversed: Math.random() < 0.35, // 35% chance reversed
      isFlipped: false,
      positionTitle: spread.positions[idx].title,
      positionDescription: spread.positions[idx].description,
    }));

    setDraws(preparedDraws);
    setDealIndex(0);

    // Turn dealing into staggered deal-ins one by one
    let currentIdx = 0;
    const dealTimer = setInterval(() => {
      currentIdx++;
      setDealIndex(currentIdx);
      if (currentIdx < spread.cardCount) {
        playDrawCard();
      } else {
        clearInterval(dealTimer);
        setStage("revealing");
      }
    }, 450);
  };

  const handleCardFlipToggle = (idx: number) => {
    if (stage !== "revealing") return;
    setDraws((prev) =>
      prev.map((item, i) => {
        if (i === idx) {
          const toggledState = !item.isFlipped;
          if (toggledState) {
            setSelectedCardIdForPreview(item.card.id);
          }
          return { ...item, isFlipped: toggledState };
        }
        return item;
      })
    );
  };

  const allFlipped = draws.length > 0 && draws.every((d) => d.isFlipped);
  const currentPreviewCard = draws.find(d => d.card.id === selectedCardIdForPreview);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 select-none font-sans">
      {/* Table Navigation Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
        <button
          onClick={onBack}
          className="text-xs font-mono text-gray-400 hover:text-amber-400 border border-slate-800 bg-slate-900/40 px-3 py-1.5 rounded-lg transition-all"
        >
          ← Chọn Lại Trải Bài
        </button>
        <span className="text-xs font-mono text-amber-500 max-w-[200px] md:max-w-md truncate">
          Hỏi về: "{question}"
        </span>
      </div>

      {/* Stage: SHUFFLING STAGE AND INTERACTIVE DECK PACK */}
      {stage === "ready_shuffle" || stage === "shuffling" || stage === "ready_deal" ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative w-72 h-52 flex items-center justify-center mb-10">
            {/* Visual stacked cards representation */}
            {Array.from({ length: 6 }).map((_, idx) => {
              const isShuffling = stage === "shuffling";
              return (
                <motion.div
                  key={idx}
                  className="absolute w-32 h-48 border-2 border-amber-500/30 rounded-xl bg-gradient-to-tr from-slate-950 to-indigo-950 p-2 shadow-2xl"
                  style={{
                    zIndex: 10 - idx,
                  }}
                  animate={
                    isShuffling
                      ? {
                          x: [0, (idx % 2 === 0 ? 110 : -110), 0],
                          rotate: [idx * 2, (idx % 2 === 0 ? 25 : -25), idx * 2],
                          scale: [1, 1.05, 1],
                        }
                      : {
                          x: idx * 2.5 - 6,
                          y: idx * -2.5 + 6,
                          rotate: idx * 1.5 - 3,
                        }
                  }
                  transition={{
                    duration: 0.6,
                    repeat: isShuffling ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  {/* Intricate pattern on mock card backs */}
                  <div className="w-full h-full border border-amber-600/10 rounded-lg flex items-center justify-center opacity-40">
                    <Layers className="w-5 h-5 text-amber-400" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center space-y-4 max-w-sm">
            <h3 className="font-serif text-xl text-amber-200">
              {stage === "shuffling"
                ? "Tinh Tú Đang Lay Động..."
                : stage === "ready_deal"
                ? "Bộ Bài Đã Sẵn Sàng"
                : "Kết Nối Linh Lực"}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              {stage === "shuffling"
                ? "Hãy tĩnh tâm cảm nhận lực hút nam châm vũ trụ sưởi ấm đầu ngón tay của bạn."
                : stage === "ready_deal"
                ? "Bài Tarot đã hòa thanh cùng tần số năng lượng của bạn. Hãy chia bài lên bàn trải."
                : "Trộn đều bộ bài để thanh tẩy năng lượng cũ và đồng bộ ý niệm của bạn với các chòm sao."}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleShuffle}
                disabled={stage === "shuffling"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-500/40 hover:border-amber-400 text-amber-400 text-xs font-mono uppercase bg-slate-950 hover:bg-slate-900 transition-all cursor-pointer disabled:opacity-40"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${stage === "shuffling" ? "animate-spin" : ""}`} />
                Trộn Bài ({stage === "ready_deal" ? "Lại" : "Xáo Bài"})
              </button>

              {stage === "ready_deal" && (
                <button
                  onClick={handleDeal}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl border border-amber-400 bg-amber-500 text-slate-950 font-semibold text-xs tracking-wide uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:bg-amber-400 transition-all cursor-pointer"
                >
                  Xếp Bài Trải
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Stage: DEALING OUT & REVEAL INTERATIVE SECTION */}
      {stage === "dealing" || stage === "revealing" ? (
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] px-2.5 py-1 rounded-full border border-amber-400/20 bg-amber-500/5 text-amber-400 uppercase font-mono tracking-widest">
              Giai Đoạn Lật Bài
            </span>
            <h2 className="font-serif text-2xl text-amber-100">
              {allFlipped ? "Khai Mở Toàn Diệu" : "Giải Đoán Sơ Khởi"}
            </h2>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {allFlipped
                ? "Năng lượng bài đã hội đủ. Bấm nút giải mã bên dưới để xem toàn bộ lời chỉ dẫn từ AI."
                : "Chạm hoặc nhấp chuột vào từng lá bài úp trên bàn để lật ngửa thông điệp."}
            </p>
          </div>

          {/* Cards Spread layout grid */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pb-4">
            {Array.from({ length: spread.cardCount }).map((_, idx) => {
              const isDealt = dealIndex > idx || stage === "revealing";
              const drawItem = draws[idx];

              return (
                <div key={idx} className="flex flex-col items-center gap-4">
                  {/* Slide in animation from side representing dealers action */}
                  <AnimatePresence>
                    {isDealt && drawItem ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7, y: 100, rotate: -15 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 85, damping: 14 }}
                      >
                        <TarotCardView
                          card={drawItem.card}
                          isReversed={drawItem.isReversed}
                          isFlipped={drawItem.isFlipped}
                          onClick={() => handleCardFlipToggle(idx)}
                        />
                      </motion.div>
                    ) : (
                      /* Slot outline placeholder */
                      <div className="w-44 h-76 border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-4 bg-slate-950/20">
                        <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center text-xs font-mono text-gray-500 mb-2">
                          {idx + 1}
                        </div>
                        <span className="text-[10px] text-gray-600 text-center font-mono tracking-widest uppercase">
                          Waiting Deal
                        </span>
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Slot Position Title labels */}
                  <div className="text-center space-y-1 max-w-[176px]">
                    <span className="text-[11px] font-mono text-amber-500 font-medium tracking-wide uppercase block">
                      Vị trí {idx + 1}: {spread.positions[idx].title}
                    </span>
                    <span className="text-[10px] text-gray-500 font-sans block leading-tight">
                      {spread.positions[idx].description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview panel for currently opened card */}
          {stage === "revealing" && currentPreviewCard && currentPreviewCard.isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/40 backdrop-blur-sm border border-amber-500/10 rounded-2xl p-5 max-w-2xl mx-auto flex gap-4 items-start shadow-xl"
            >
              <div className="p-2 border border-amber-500/20 rounded-lg bg-black/40 text-amber-400 self-start">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-sm font-medium text-amber-300">
                    Chiêm nghiệm nhanh: Lá {currentPreviewCard.card.nameVi} ({currentPreviewCard.isReversed ? "Chiều Ngược" : "Chiều Xuôi"})
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.2 bg-slate-800 text-gray-400 rounded">
                    Khóa: {currentPreviewCard.card.keyword}
                  </span>
                </div>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  {currentPreviewCard.isReversed
                    ? currentPreviewCard.card.descriptionReversed
                    : currentPreviewCard.card.descriptionUpright}
                </p>
              </div>
            </motion.div>
          )}

          {/* Core AI Interpreter Trigger Button - HIDDEN */}
        </div>
      ) : null}
    </div>
  );
}
