"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Heart } from "lucide-react";

const INITIAL_AFFIRMATIONS = [
  { id: 1, text: "Aku sudah bertahan sejauh ini dan aku bangga pada diriku 💖", checked: false },
  { id: 2, text: "Tidak apa-apa jika belum menyelesaikan segalanya hari ini 🌸", checked: false },
  { id: 3, text: "Aku pantas untuk merasa tenang dan bahagia ☕", checked: false },
  { id: 4, text: "Senyum manisku terlalu berharga untuk hilang selamanya 🌻", checked: false },
  { id: 5, text: "Ada seseorang yang selalu siap mendukung & menyayangiku 100% ✨", checked: false },
];

export default function AffirmationChecklist() {
  const [items, setItems] = useState(INITIAL_AFFIRMATIONS);

  const toggleCheck = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedCount = items.filter((i) => i.checked).length;

  return (
    <div className="w-full max-w-xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/20 shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-rose-gold text-xs font-semibold mb-4 w-max">
        <Sparkles size={14} className="text-pink-300 animate-pulse" />
        Daftar Penguat Hati Klea
      </div>

      <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-2">
        Pengingat Kehebatan Diri ✨
      </h3>
      <p className="text-pink-200/70 text-xs sm:text-sm mb-6">
        Sentuh setiap poin di bawah ini saat kamu membacanya sebagai janji manis untuk hatimu.
      </p>

      {/* Checklist items */}
      <div className="space-y-3">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleCheck(item.id)}
            className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
              item.checked
                ? "bg-gradient-to-r from-pink-950/60 to-rose-950/40 border-pink-500/50 text-white shadow-md"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-pink-200/80"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                item.checked
                  ? "bg-pink-500 border-pink-400 text-white"
                  : "border-pink-300/40 bg-transparent"
              }`}
            >
              {item.checked && <Check size={14} strokeWidth={3} />}
            </div>

            <span
              className={`text-xs sm:text-sm font-medium leading-snug transition-all ${
                item.checked ? "line-through opacity-80 text-pink-200" : ""
              }`}
            >
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Completion reward note */}
      {checkedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm text-center flex items-center justify-center gap-2"
        >
          <Heart size={16} className="fill-amber-400 text-amber-400 animate-pulse" />
          <span>
            {checkedCount === items.length
              ? "Luar biasa! Klea sudah membaca semua pengingat baik ini. Senyum lagi ya! 🥰"
              : `Kamu sudah menyetujui ${checkedCount} pengingat baik hari ini.`}
          </span>
        </motion.div>
      )}
    </div>
  );
}
