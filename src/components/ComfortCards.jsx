"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, ShieldCheck, Feather, HeartHandshake, CheckCircle2 } from "lucide-react";

const CATEGORIES = [
  {
    id: "lelah",
    label: "🌧️ Saat Merasa Lelah",
    icon: Coffee,
    badge: "Istirahat Sejenak",
    color: "from-blue-500/20 to-purple-500/20",
    borderColor: "border-blue-500/30",
    title: "Tidak Apa-Apa Untuk Berhenti Sejenak ☕",
    quote:
      "Klea, kamu bukan robot yang harus selalu produktif atau berenergi 24/7. Kalau hari ini terasa terlalu menguras tenaga, tidak apa-apa untuk mematikan notifikasi, rebahan, dan tidur lebih awal. Dunia bisa menunggu, tapi kesehatan hatimu adalah yang utama.",
    tips: ["Tutup mata 10 menit", "Minum air hangat", "Nonton film santai", "Jangan paksakan kerjaan"],
  },
  {
    id: "cemas",
    label: "🌸 Saat Merasa Cemas",
    icon: Feather,
    badge: "Ketenangan Pikiran",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    title: "Satu Langkah Kecil Dalam Satu Waktu 🌾",
    quote:
      "Rasa cemas sering kali membuat pikiran kita berlari ke hal-hal yang belum tentu terjadi. Fokuslah pada detik ini, pada napasmu sekarang. Apa pun yang membuatmu khawatir, kamu tidak perlu menyelesaikannya sekaligus hari ini. Selangkah demi selangkah ya.",
    tips: ["Rasakan pijakan kakimu di lantai", "Tuliskan apa yang kamu rasakan", "Fokus ke hal yang bisa dikontrol"],
  },
  {
    id: "gagal",
    label: "💫 Saat Merasa Ragu / Gagal",
    icon: ShieldCheck,
    badge: "Kepercayaan Diri",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    title: "Kamu Sudah Berusaha Sangat Baik ⭐",
    quote:
      "Satu kesalahan atau hasil yang tidak sesuai harapan TIDAK mendefinisikan seberapa berharganya dirimu. Ingat semua rintangan yang sudah berhasil kamu lewati sebelumnya. Kamu memiliki ketangguhan luar biasa yang sering kamu lupakan sendiri.",
    tips: ["Ingat pencapaian terbesarmu", "Maafkan kekurangan hari ini", "Aku selalu percaya padamu"],
  },
  {
    id: "pengingat",
    label: "☀️ Pengingat Betapa Spesialnya Klea",
    icon: HeartHandshake,
    badge: "Pelukan Sayang",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    title: "Klea Adalah Anugerah Terindah 💖",
    quote:
      "Kehadiranmu membawa senyum dan kehangatan buat orang-orang di sekitarmu. Tawamu manis, hatimu tulus, dan kamu sangat dicintai. Apapun yang terjadi hari ini, nilai dan keindahan dirimu tidak pernah berkurang sedikit pun.",
    tips: ["Kamu dicintai apa adanya", "Senyummu bernilai tinggi", "Ada rumah hangat untukmu pulang"],
  },
];

export default function ComfortCards() {
  const [activeTab, setActiveTab] = useState("lelah");

  const currentCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      {/* Category Pills Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeTab;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                isActive
                  ? "bg-pink-500 text-white border-pink-400 shadow-lg shadow-pink-500/25 scale-105"
                  : "bg-white/5 hover:bg-white/10 text-pink-200/70 border-white/10"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Display Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCategory.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className={`glass-panel p-6 sm:p-10 rounded-3xl border ${currentCategory.borderColor} bg-gradient-to-br ${currentCategory.color} shadow-2xl relative overflow-hidden`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-pink-100 text-xs font-semibold uppercase tracking-wider mb-4">
            ✨ {currentCategory.badge}
          </div>

          <h3 className="font-playfair text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            {currentCategory.title}
          </h3>

          <p className="text-pink-100/90 text-sm sm:text-base md:text-lg leading-relaxed mb-8 font-light italic">
            "{currentCategory.quote}"
          </p>

          {/* Micro Checklist / Tips inside the card */}
          <div className="pt-6 border-t border-white/10">
            <h4 className="text-xs uppercase tracking-widest text-pink-300/70 font-bold mb-4">
              💡 Hal Kecil Yang Bisa Klea Lakukan Sekarang:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentCategory.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-velvet-mid/50 border border-white/10 p-3 rounded-xl text-xs sm:text-sm text-pink-100"
                >
                  <CheckCircle2 size={16} className="text-pink-400 shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
