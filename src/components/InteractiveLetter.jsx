"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Edit3, Save, Check } from "lucide-react";

export default function InteractiveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [letterText, setLetterText] = useState("");

  const defaultText = `Klea Tersayang,

Lewat surat ini, Rizki ingin menyampaikan permintaan maaf yang paling tulus dari lubuk hatiku yang terdalam. Aku sadar ada sikap atau kesalahanku yang mungkin membuatmu sedih dan kecewa, dan aku benar-benar menyesal atas hal itu. Maafkan aku ya, Klea.

Melihat hubungan kita renggang dan tidak sedang baik-baik saja terasa sangat hampa bagiku. Aku tidak ingin tawa hangat, senyuman manismu, dan semua kisah indah yang telah kita lewati dan perjuangkan hilang begitu saja.

Aku sangat berharap kita bisa memperbaiki semuanya, kembali baik-baik saja, saling merangkul, dan melangkah bersama lagi melewati hari-hari esok. Rizki tidak ingin menyerah tentang kita, karena bagiku, tempat pulang terbaik dan terindah adalah di sisimu.

Klea, mari kita kembali bersama lagi, memulai lembaran baru dengan lebih baik, ya?

Dari seseorang yang selalu menyayangimu dan ingin terus bersamamu,
Rizki ❤️`;

  useEffect(() => {
    const savedText = localStorage.getItem("klea_letter_text");
    if (savedText) {
      setLetterText(savedText);
    } else {
      setLetterText(defaultText);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("klea_letter_text", letterText);
    setIsEditing(false);
  };

  return (
    <section className="py-20 px-4 relative flex flex-col items-center justify-center min-h-[80vh] z-10 overflow-hidden" id="letter">
      {/* Background soft glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-romantic-rose/10 blur-[120px] pointer-events-none" />
      
      <div className="text-center mb-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-playfair font-bold text-glow-pink text-pink-300 mb-3"
        >
          Sepucuk Surat Untukmu ✉️
        </motion.h2>
        <p className="text-pink-200/60 max-w-md mx-auto text-sm md:text-base">
          {isOpen ? "Bacalah surat ini perlahan-lahan..." : "Klik segel lilin emas pada amplop untuk membuka pesan rahasia di dalamnya."}
        </p>
      </div>

      <div className="relative w-full max-w-xl h-[450px] flex items-center justify-center">
        {/* The Envelope container */}
        <motion.div
          animate={{ y: isOpen ? 120 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="absolute w-[280px] h-44 sm:w-80 sm:h-52 md:w-96 md:h-60 bg-gradient-to-br from-rose-950 to-pink-900 rounded-lg shadow-2xl z-30 flex items-center justify-center border border-pink-700/20"
        >
          {/* Back flap triangles simulation */}
          <div className="absolute inset-0 bg-transparent overflow-hidden rounded-lg pointer-events-none">
            {/* Left flap */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[88px] sm:border-t-[104px] md:border-t-[120px] border-t-transparent border-b-[88px] sm:border-b-[104px] md:border-b-[120px] border-b-transparent border-l-[140px] sm:border-l-[160px] md:border-l-[192px] border-l-rose-900/30" />
            {/* Right flap */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[88px] sm:border-t-[104px] md:border-t-[120px] border-t-transparent border-b-[88px] sm:border-b-[104px] md:border-b-[120px] border-b-transparent border-r-[140px] sm:border-r-[160px] md:border-r-[192px] border-r-rose-900/30" />
            {/* Bottom flap */}
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[140px] sm:border-l-[160px] md:border-l-[192px] border-l-transparent border-r-[140px] sm:border-r-[160px] md:border-r-[192px] border-r-transparent border-b-[90px] sm:border-b-[110px] md:border-b-[130px] border-b-rose-950/80" />
          </div>

          {/* Top Flap (opens up) */}
          <motion.div
            style={{ originY: 0, transformStyle: "preserve-3d" }}
            animate={{ rotateX: isOpen ? -180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-0 border-l-[140px] sm:border-l-[160px] md:border-l-[192px] border-l-transparent border-r-[140px] sm:border-r-[160px] md:border-r-[192px] border-r-transparent border-t-[90px] sm:border-t-[110px] md:border-t-[130px] border-t-rose-900 z-40 drop-shadow-md pointer-events-none"
          />

          {/* Golden Wax Seal (Trigger button) */}
          <AnimatePresence>
            {!isOpen && (
              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                exit={{ scale: 0, opacity: 0, rotate: -45 }}
                transition={{ duration: 0.3 }}
                className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-amber-600 border border-yellow-300 z-50 flex items-center justify-center cursor-pointer shadow-lg shadow-black/40 hover:brightness-110 active:brightness-95"
                title="Buka Surat"
              >
                {/* Wax seal SVG pattern */}
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 15C30.7 15 15 30.7 15 50s15.7 35 35 35 35-15.7 35-35S69.3 15 50 15zm0 8c14.9 0 27 12.1 27 27S64.9 77 50 77 23 64.9 23 50s12.1-27 27-27z" />
                  <path d="M50 32c-9.9 0-18 8.1-18 18s8.1 18 18 18 18-8.1 18-18-8.1-18-18-18zm0 4c7.7 0 14 6.3 14 14s-6.3 14-14 14-14-6.3-14-14 6.3-14 14-14z" />
                  <path d="M50 42c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Letter paper (slides up) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 50, opacity: 0, zIndex: 10 }}
              animate={{ y: -80, opacity: 1, zIndex: 35 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
              className="absolute w-[270px] sm:w-80 md:w-[480px] h-[340px] sm:h-[380px] md:h-[380px] bg-amber-50 rounded shadow-2xl p-4 sm:p-6 flex flex-col justify-between text-neutral-800 border-t border-amber-100 z-35 overflow-y-auto"
            >
              {/* Notebook lines effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100%_24px] pointer-events-none rounded opacity-30 mt-8" />

              {/* Action buttons (Close and Edit) */}
              <div className="flex justify-between items-center mb-2 z-10 border-b border-amber-200 pb-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-rose-800 hover:text-red-600 transition-colors font-medium cursor-pointer"
                >
                  ← Lipat Amplop
                </button>
                <div className="flex gap-2">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Check size={12} /> Simpan
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-xs bg-amber-200 hover:bg-amber-300 text-amber-950 px-2 py-1 rounded flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Edit3 size={12} /> Edit Surat
                    </button>
                  )}
                </div>
              </div>

              {/* Letter content area */}
              <div className="flex-1 overflow-y-auto pr-1 my-3 z-10">
                {isEditing ? (
                  <textarea
                    value={letterText}
                    onChange={(e) => setLetterText(e.target.value)}
                    className="w-full h-full text-xl font-caveat font-semibold p-2 bg-white/80 border border-amber-300 rounded focus:outline-none focus:ring-1 focus:ring-rose-800"
                    placeholder="Tulis surat cintamu disini..."
                  />
                ) : (
                  <p className="font-caveat text-xl md:text-2xl leading-relaxed text-neutral-800 whitespace-pre-line font-semibold pr-1 select-text">
                    {letterText}
                  </p>
                )}
              </div>

              {/* Decorative border decoration at the bottom */}
              <div className="text-center pt-2 border-t border-dashed border-amber-300 z-10 text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                Dibuat dengan cinta untuk Klea
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
