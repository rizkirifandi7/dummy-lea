"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronRight, RotateCcw } from "lucide-react";

const REASONS = [
  {
    id: 1,
    title: "Senyuman Manismu 🌸",
    desc: "Setiap kali melihat senyummu, semua lelah dan rasa penat di kepalaku langsung menguap begitu saja. Senyummu adalah mood booster terbaikku.",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 2,
    title: "Ketulusan Hatimu ❤️",
    desc: "Caramu peduli, menyayangi, dan memperlakukanku dengan penuh kelembutan membuatku selalu bersyukur memilikimu di hidupku.",
    color: "from-rose-500 to-red-600",
  },
  {
    id: 3,
    title: "Caramu Tertawa 😂",
    desc: "Suara tawamu adalah melodi terindah. Terutama saat kamu tertawa lepas karena lelucon konyol yang sengaja kubuat hanya untuk menghiburmu.",
    color: "from-pink-600 to-purple-600",
  },
  {
    id: 4,
    title: "Sabar dan Pendengar Baik 👂",
    desc: "Kamu selalu ada untuk mendengarkan keluh kesahku, memberikan pelukan hangat virtual maupun nyata, dan sabar menghadapi segala sifat kekanak-kanakanku.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: 5,
    title: "Gaya Gemas & Lucumu 🧸",
    desc: "Segala tingkah laku random, cemberut manjamu, hingga ekspresi lucumu saat kesal selalu berhasil membuatku jatuh cinta berkali-kali.",
    color: "from-amber-500 to-rose-500",
  },
  {
    id: 6,
    title: "Selalu Mendukung Impianku 🚀",
    desc: "Kamu adalah pendukung nomor satuku. Kepercayaanmu padaku memberi kekuatan ekstra untuk terus berjuang meraih masa depan kita.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 7,
    title: "Membuat Hari Biasa Jadi Spesial ✨",
    desc: "Hal paling sederhana sekalipun seperti hanya teleponan berjam-jam atau berkirim pesan receh terasa sangat bermakna jika kulakukan bersamamu.",
    color: "from-cyan-500 to-indigo-500",
  },
  {
    id: 8,
    title: "Karena Kamu adalah Klea 💖",
    desc: "Tidak butuh alasan rumit lainnya. Aku menyukaimu apa adanya, dengan segala kelebihan dan kekuranganmu. Kamu adalah separuh jiwaku.",
    color: "from-rose-500 to-pink-500",
  },
];

export default function ReasonsCardStack() {
  const [cards, setCards] = useState(REASONS);

  // Swipe the top card to the back of the stack
  const swipeCard = () => {
    setCards((prevCards) => {
      const copy = [...prevCards];
      const popped = copy.shift(); // remove from top
      if (popped) copy.push(popped); // add to bottom
      return copy;
    });
  };

  const resetStack = () => {
    setCards(REASONS);
  };

  return (
    <section className="py-20 px-4 relative flex flex-col items-center justify-center min-h-[70vh] z-10" id="reasons">
      {/* Background radial glow */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-pink-800/10 blur-[100px] pointer-events-none" />

      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-playfair font-bold text-glow-pink text-pink-300 mb-3"
        >
          Mengapa Aku Sayang Kamu? 💖
        </motion.h2>
        <p className="text-pink-200/60 max-w-md mx-auto text-sm md:text-base">
          Seret kartu ke kanan/kiri atau klik tombol di bawah untuk melihat alasan selanjutnya kenapa kamu sangat spesial bagiku.
        </p>
      </div>

      {/* Card stack area */}
      <div className="relative w-[280px] sm:w-80 md:w-96 h-[340px] sm:h-96 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {cards.slice(0, 3).reverse().map((card, index, arr) => {
            // index 0 is bottom card, index arr.length-1 is top card
            const isTop = index === arr.length - 1;
            
            // Stack effect offsets
            const offset = (arr.length - 1 - index) * 12;
            const scale = 1 - (arr.length - 1 - index) * 0.05;

            return (
              <motion.div
                key={card.id}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, info) => {
                  if (Math.abs(info.offset.x) > 120) {
                    swipeCard();
                  }
                }}
                animate={{
                  y: offset,
                  scale: scale,
                  rotate: isTop ? 0 : (card.id % 2 === 0 ? 2 : -2) * (arr.length - 1 - index),
                  zIndex: index,
                }}
                whileGrab={isTop ? { scale: 1.03 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className={`absolute w-full h-72 sm:h-80 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between text-white bg-gradient-to-br ${card.color} ${
                  isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                }`}
                style={{
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Heart icons decoration */}
                <div className="flex justify-between items-start">
                  <div className="text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full font-semibold">
                    Alasan #{card.id}
                  </div>
                  <Heart className="fill-white/80 text-white/80 animate-pulse" size={20} />
                </div>

                {/* Content */}
                <div className="my-auto text-center flex flex-col gap-3">
                  <h3 className="font-playfair text-xl md:text-2xl font-bold tracking-wide">
                    {card.title}
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed text-pink-50 font-caveat font-bold select-none">
                    {card.desc}
                  </p>
                </div>

                {/* Swipe cue indicator at bottom */}
                {isTop && (
                  <div className="text-[10px] text-center text-white/60 tracking-wider flex items-center justify-center gap-1 animate-pulse">
                    <span>Geser kartu ini ke samping</span>
                    <ChevronRight size={10} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Buttons controls */}
      <div className="flex items-center gap-4 mt-8 z-10">
        <button
          onClick={swipeCard}
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-pink-200 px-6 py-2.5 rounded-full flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all text-sm font-semibold"
        >
          Lihat Alasan Lain <ChevronRight size={16} />
        </button>

        <button
          onClick={resetStack}
          className="bg-pink-950/40 hover:bg-pink-900/40 border border-pink-700/20 text-pink-300 p-2.5 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all"
          title="Ulangi dari Awal"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </section>
  );
}
