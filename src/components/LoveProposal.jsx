"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

const NO_LABELS = [
  "Nggak",
  "Yakin? 🥺",
  "Pikir-pikir dulu...",
  "Nggak boleh lho! 😜",
  "Salah tombol! 😂",
  "Eits, gak kena!",
  "Yah, telat!",
  "Harus pilih YA! 💕",
  "Menyerahlah saja...",
  "Hati-hati kliknya!",
];

export default function LoveProposal() {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [noLabel, setNoLabel] = useState(NO_LABELS[0]);
  const [relationshipTime, setRelationshipTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Anniversary date: February 28, 2026
  const anniversaryDate = "2026-02-28T00:00:00"; 

  useEffect(() => {
    if (!isAccepted) return;

    // Calculate time elapsed since anniversary
    const interval = setInterval(() => {
      const start = new Date(anniversaryDate).getTime();
      const now = new Date().getTime();
      const diff = now - start;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRelationshipTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAccepted]);

  // Trigger rich confetti shower on accepting
  const handleAccept = () => {
    setIsAccepted(true);
    
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#db2777", "#f472b6", "#e11d48", "#f59e0b"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#db2777", "#f472b6", "#e11d48", "#f59e0b"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Extra centerpiece burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  // Move the "No" button randomly
  const moveNoButton = () => {
    // Detect mobile viewport to restrict boundaries
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxX = isMobile ? 80 : 180;
    const maxY = isMobile ? 80 : 130;
    
    // Generate random translations in bounding area
    const newX = (Math.random() * 2 - 1) * maxX;
    const newY = (Math.random() * 2 - 1) * maxY;

    setNoPosition({ x: newX, y: newY });
    
    const nextCount = noCount + 1;
    setNoCount(nextCount);
    setNoLabel(NO_LABELS[nextCount % NO_LABELS.length]);
  };

  // Yes button scale factor (grow bigger each time they hover No)
  const yesScale = 1 + noCount * 0.15;

  return (
    <section className="py-20 px-4 relative flex items-center justify-center min-h-[90vh] z-10" id="proposal">
      {/* Background soft pink/purple lights */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-romantic-rose/10 blur-[130px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="proposal-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-xl text-center box-glow-pink flex flex-col items-center gap-6"
          >
            {/* Cute beating heart */}
            <div className="w-20 h-20 bg-rose-950/40 rounded-full flex items-center justify-center border border-romantic-rose/30">
              <Heart className="text-romantic-rose fill-romantic-rose animate-heartbeat" size={40} />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-4xl font-playfair font-bold text-pink-200 leading-tight">
                Pertanyaan Terakhir... 🥺💖
              </h2>
              <p className="text-pink-100/80 font-sans text-base md:text-lg mt-2 px-2">
                Mau kan terus temenin aku berpetualang, berbagi tawa, dan bahagia bareng selamanya, Klea?
              </p>
            </div>

            {/* Action buttons */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 w-full min-h-[160px] sm:min-h-0 mt-4">
              {/* YES BUTTON */}
              <motion.button
                onClick={handleAccept}
                style={{ scale: yesScale }}
                whileHover={{ scale: yesScale * 1.05 }}
                whileTap={{ scale: yesScale * 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-gradient-to-r from-romantic-rose to-romantic-pink text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-pink-600/30 cursor-pointer text-base z-20 flex items-center gap-2 hover:brightness-110"
              >
                MAU BANGET! 💖
              </motion.button>

              {/* NO BUTTON (escapes on hover/touch) */}
              <motion.button
                animate={{ x: noPosition.x, y: noPosition.y }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-pink-300 px-6 py-3 rounded-full text-sm font-semibold cursor-pointer z-10 sm:relative shadow-md"
              >
                {noLabel}
              </motion.button>
            </div>
            
            {noCount > 0 && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                className="text-xs text-rose-gold mt-2 italic"
              >
                Kamu sudah mencoba menolak sebanyak {noCount} kali. Pilihannya hanya satu! 😉
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-2xl text-center box-glow-gold flex flex-col items-center gap-8 relative overflow-hidden"
          >
            {/* Soft decorative gold bubbles */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gold-glow/5 blur-xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-romantic-rose/5 blur-xl rounded-full" />

            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-4 border border-dashed border-gold-glow/20 rounded-full"
              />
              <div className="w-24 h-24 bg-gold-glow/10 rounded-full flex items-center justify-center border border-gold-glow/30">
                <Trophy className="text-gold-glow fill-gold-glow/20" size={48} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-5xl font-playfair font-black text-glow-gold text-gold-bright">
                Horeee! Terima Kasih Klea! 🎉
              </h2>
              <p className="text-pink-100/90 font-sans text-base md:text-lg mt-3 max-w-md mx-auto">
                Kamu membuat hari ini menjadi hari terindah! Aku janji akan terus menjaga senyum di wajah manis itu setiap harinya. 💖🥰
              </p>
            </div>

            {/* Anniversary Timer display */}
            <div className="w-full bg-pink-950/30 border border-pink-700/10 p-6 rounded-2xl">
              <p className="text-xs uppercase tracking-wider text-rose-gold font-bold mb-4 flex items-center justify-center gap-1.5">
                <Sparkles size={14} className="text-gold-glow" />
                Waktu Bersamamu Sejauh Ini
                <Sparkles size={14} className="text-gold-glow" />
              </p>
              
              <div className="grid grid-cols-4 gap-2 md:gap-4 justify-items-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-bold font-mono text-pink-200">{relationshipTime.days}</span>
                  <span className="text-[10px] text-pink-300/60 uppercase mt-1 font-sans">Hari</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-bold font-mono text-pink-200">
                    {String(relationshipTime.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-pink-300/60 uppercase mt-1 font-sans">Jam</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-bold font-mono text-pink-200">
                    {String(relationshipTime.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-pink-300/60 uppercase mt-1 font-sans">Menit</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-bold font-mono text-pink-200 animate-pulse">
                    {String(relationshipTime.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-pink-300/60 uppercase mt-1 font-sans">Detik</span>
                </div>
              </div>
            </div>

             <div className="text-xs text-pink-200/50 italic border-t border-pink-950 pt-4 w-full px-2">
              Semenjak tanggal 28 Februari 2026, dunia ini resmi menjadi berkali-kali lipat lebih indah bagiku.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
