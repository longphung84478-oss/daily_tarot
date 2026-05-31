import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, RotateCcw } from "lucide-react";
import MysticBackground from "./components/MysticBackground";
import SpreadSelector from "./components/SpreadSelector";
import TableLayout from "./components/TableLayout";
import OracleLoader from "./components/OracleLoader";
import InterpretationPanel from "./components/InterpretationPanel";
import { TarotSpread, CardDraw, TarotReadingResult } from "./types";
import { playChime } from "./utils/audio";

export default function App() {
  const [stage, setStage] = useState<"selector" | "dealing_table" | "loading" | "result">("selector");
  const [question, setQuestion] = useState("");
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread | null>(null);
  const [savedDraws, setSavedDraws] = useState<CardDraw[]>([]);
  const [readingResult, setReadingResult] = useState<TarotReadingResult | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const handleSpreadSelection = ({ question: q, spread: s }: { question: string; spread: TarotSpread }) => {
    setQuestion(q);
    setSelectedSpread(s);
    setStage("dealing_table");
  };

  const handleInterpretStart = async (drawnCards: CardDraw[]) => {
    setSavedDraws(drawnCards);
    setStage("loading");
    setErrorNotice(null);

    try {
      const response = await fetch("/api/tarot-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question,
          spreadId: selectedSpread?.id,
          cards: drawnCards,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Có lỗi xảy ra khi liên kết sóng năng lượng với AI Tarot.");
      }

      const parsedResult: TarotReadingResult = await response.json();
      setReadingResult(parsedResult);
      setStage("result");
    } catch (err: any) {
      console.error(err);
      setErrorNotice(err?.message || "Hết thời gian chờ phản hồi tinh cầu. Hãy kiểm tra kết nối mạng và thử lại.");
      // Go back to table so they don't lose bared cards
      setStage("dealing_table");
    }
  };

  const handleResetSession = () => {
    setSelectedSpread(null);
    setQuestion("");
    setSavedDraws([]);
    setReadingResult(null);
    setErrorNotice(null);
    setStage("selector");
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-amber-500/30 selection:text-amber-100 flex flex-col justify-between">
      {/* Immersive Space Atmosphere Background */}
      <MysticBackground />

      {/* Floating Error notification modal banner */}
      <AnimatePresence>
        {errorNotice && (
          <motion.div
            initial={{ opacity: 0, y: -45 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -45 }}
            className="fixed top-4 inset-x-4 max-w-md mx-auto z-50 bg-slate-950 border-2 border-red-500/50 rounded-2xl p-4 shadow-[0_0_25px_rgba(239,68,68,0.3)]"
          >
            <div className="flex gap-3">
              <div className="text-red-400 p-1 bg-red-400/10 rounded-lg self-start">
                <AlertCircle className="w-5 h-5 animate-bounce" />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-xs font-mono tracking-wider uppercase text-red-400 font-semibold">
                  Tín Hiệu Nhiễu Dương Bản
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans text-justify">
                  {errorNotice}
                </p>
                <button
                  onClick={() => setErrorNotice(null)}
                  className="text-[10px] uppercase font-mono px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-amber-500 text-gray-400 hover:text-amber-300 rounded transition-all cursor-pointer"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Core main app sections switcher */}
      <main className="flex-1 w-full relative z-10 flex flex-col justify-center py-4">
        <AnimatePresence mode="wait">
          {stage === "selector" && (
            <motion.div
              key="stage-selector"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <SpreadSelector onSelect={handleSpreadSelection} />
            </motion.div>
          )}

          {stage === "dealing_table" && selectedSpread && (
            <motion.div
              key="stage-table"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              <TableLayout
                spread={selectedSpread}
                question={question}
                onBack={handleResetSession}
                onInterpret={handleInterpretStart}
              />
            </motion.div>
          )}

          {stage === "loading" && (
            <motion.div
              key="stage-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <OracleLoader />
            </motion.div>
          )}

          {stage === "result" && readingResult && (
            <motion.div
              key="stage-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <InterpretationPanel
                result={readingResult}
                draws={savedDraws}
                question={question}
                onReset={handleResetSession}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Humble footer */}
      <footer className="w-full text-center py-6 text-[10px] font-mono text-gray-600 border-t border-slate-900/40 relative z-10">
        © 2026 Tarot Oracle • Powered by Gemini AI • Vạn sự tùy duyên
      </footer>
    </div>
  );
}
