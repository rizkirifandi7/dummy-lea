"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Smile, Sun } from "lucide-react";
import confetti from "canvas-confetti";

const HUG_MESSAGES = [
  "🤗 *Huuuggg erat-erat!* Kamu hebat banget sudah bertahan sampai detik ini!",
  "💖 Jangan lupa, Klea selalu punya seseorang yang bangga sama kamu!",
  "🌻 Tarik napas... Istirahat dulu ya, nggak apa-apa kok kalau belum sempurna hari ini.",
  "✨ Badai ini cuma sebentar, senyum manismu bakal bersinar lagi!",
  "🍦 Habis ini yuk makan es krim atau makanan favorit Klea biar makin happy!",
  "🤍 Klea itu kuat, berharga, dan sangat dicintai. Ingat itu terus ya!",
  "🌸 Aku di sini selalu siap mendengarkan semua cerita dan keluh kesahmu.",
  "⭐ Kamu nggak sendirian, ada pelukan hangat yang selalu terbuka buat kamu!",
];

export default function VirtualHugButton() {
  const [hugCount, setHugCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleSendHug = (e) => {
    // Increment Hug Count
    setHugCount((prev) => prev + 1);
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 300);

    // Random message selection
    const randomIndex = Math.floor(Math.random() * HUG_MESSAGES.length);
    setCurrentMessage(HUG_MESSAGES[randomIndex]);

    // Trigger soft confetti bursting from button
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x, y },
        colors: ["#f472b6", "#fbbf24", "#e879f9", "#ffffff"],
        disableForReducedMotion: true,
      });
    } catch (err) {
      console.log("Confetti trigger:", err);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/20 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
      {/* Background Decorative Element */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Badge */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-semibold mb-4">
        <Sun size={14} className="text-amber-400 animate-spin-slow" />
        Virtual Hug & Comfort Generator
      </div>

      <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-2">
        Kirim Pelukan Virtual 💖
      </h3>
      <p className="text-pink-200/70 text-xs sm:text-sm max-w-md mb-6">
        Setiap kali Klea butuh kepastian atau sandaran, tekan tombol di bawah ini untuk menerima pelukan hangat dan kalimat manis penyemangat.
      </p>

      {/* Hug Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.93 }}
        onClick={handleSendHug}
        className={`relative group bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-bold text-base sm:text-lg px-8 py-5 rounded-full shadow-[0_10px_30px_rgba(219,39,119,0.4)] hover:shadow-[0_15px_40px_rgba(219,39,119,0.6)] cursor-pointer flex items-center gap-3 transition-all ${
          isPulsing ? "scale-105" : ""
        }`}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Heart className="fill-white text-white" size={24} />
        </motion.div>
        <span>Terima Pelukan Warm! 🤗</span>
        <Sparkles size={20} className="text-amber-200 group-hover:rotate-45 transition-transform" />
      </motion.button>

      {/* Counter indicator */}
      <div className="mt-4 text-xs text-pink-300/80 font-medium tracking-wide">
        {hugCount === 0 ? (
          "Tekan tombol di atas untuk memulai ❤️"
        ) : (
          <span className="text-amber-300 font-bold">
            ✨ {hugCount} Pelukan hangat telah dikirimkan khusus untuk Klea!
          </span>
        )}
      </div>

      {/* Message Output Card */}
      <div className="mt-6 min-h-[90px] w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentMessage ? (
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-velvet-mid/80 border border-pink-500/30 p-4 sm:p-5 rounded-2xl shadow-inner text-pink-100 font-caveat text-xl sm:text-2xl leading-relaxed flex items-center justify-center gap-3 text-center"
            >
              <Smile className="text-pink-400 shrink-0" size={24} />
              <span>{currentMessage}</span>
            </motion.div>
          ) : (
            <div className="text-pink-300/40 text-xs italic">
              "Pesan hangat penyemangat akan muncul di sini..."
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
