"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Play, Pause, RefreshCw } from "lucide-react";

const PHASES = [
  { text: "Tarik Napas... 🌬️", duration: 4000, scale: 1.35, color: "from-pink-400 to-rose-400" },
  { text: "Tahan Napas... 🤍", duration: 4000, scale: 1.35, color: "from-amber-300 to-pink-400" },
  { text: "Hembuskan perlahan... 🍃", duration: 4000, scale: 0.85, color: "from-purple-400 to-pink-400" },
  { text: "Rileks sejenak... ✨", duration: 4000, scale: 1.0, color: "from-pink-500 to-purple-400" },
];

export default function BreathingGuide() {
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let timer;
    if (isActive) {
      const currentPhase = PHASES[currentPhaseIndex];
      timer = setTimeout(() => {
        const nextIndex = (currentPhaseIndex + 1) % PHASES.length;
        setCurrentPhaseIndex(nextIndex);
        if (nextIndex === 0) {
          setCycleCount((prev) => prev + 1);
        }
      }, currentPhase.duration);
    }
    return () => clearTimeout(timer);
  }, [isActive, currentPhaseIndex]);

  const toggleBreathing = () => {
    setIsActive(!isActive);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setCurrentPhaseIndex(0);
    setCycleCount(0);
  };

  const activePhase = PHASES[currentPhaseIndex];

  return (
    <div className="w-full max-w-lg mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/20 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-amber-500/5 pointer-events-none" />

      {/* Title */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-rose-gold text-xs font-semibold mb-4">
        <Wind size={14} className="animate-spin-slow text-pink-300" />
        Latihan Napas Ketenangan
      </div>

      <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-2">
        Ambil Napas Sejenak, Klea 🌬️
      </h3>
      <p className="text-pink-200/70 text-xs sm:text-sm max-w-sm mb-8">
        Ikuti irama lingkaran di bawah. Hembuskan semua sesak dan biarkan hatimu kembali tenang secara perlahan.
      </p>

      {/* Breathing Animated Circle */}
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center my-4">
        {/* Outer ambient pulsing ring */}
        <motion.div
          animate={{
            scale: isActive ? [1, activePhase.scale, 1] : 1,
            opacity: isActive ? [0.3, 0.6, 0.3] : 0.2,
          }}
          transition={{ duration: 4, ease: "easeInOut", repeat: isActive ? Infinity : 0 }}
          className="absolute inset-0 rounded-full bg-pink-500/20 blur-xl"
        />

        {/* Main scaling breathing ball */}
        <motion.div
          animate={{
            scale: isActive ? activePhase.scale : 1,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
          }}
          className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr ${activePhase.color} shadow-[0_0_40px_rgba(236,72,153,0.4)] flex flex-col items-center justify-center p-4 text-white font-medium cursor-pointer transition-colors duration-1000`}
          onClick={toggleBreathing}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isActive ? currentPhaseIndex : "stopped"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-center"
            >
              {isActive ? (
                <span className="text-sm sm:text-base font-bold drop-shadow-md tracking-wide">
                  {activePhase.text}
                </span>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Play size={28} className="fill-white text-white translate-x-0.5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Klik Mulai</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cycle counter */}
      {cycleCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-xs text-pink-300/80 font-medium"
        >
          ✨ Kamu sudah menyelesaikan {cycleCount} putaran pernapasan tenang.
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={toggleBreathing}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-pink-600/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
        >
          {isActive ? (
            <>
              <Pause size={16} /> Jeda Dulu
            </>
          ) : (
            <>
              <Play size={16} /> Mulai Bernapas
            </>
          )}
        </button>

        <button
          onClick={resetBreathing}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-pink-200/70 hover:text-white transition-all cursor-pointer active:scale-95"
          title="Reset"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  );
}
