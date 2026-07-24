"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Edit3, Trash2, Maximize2, RotateCcw } from "lucide-react";

const DEFAULT_MEMORIES = [
  {
    id: 1,
    defaultImage: "/images/couple_sunflower.png",
    caption: "Di taman bunga matahari favoritmu... 🌻",
    date: "12 Oktober 2024",
    rotation: -3,
  },
  {
    id: 2,
    defaultImage: "/images/holding_hands.png",
    caption: "Genggaman tangan yang takkan pernah lepas",
    date: "1 Desember 2024",
    rotation: 4,
  },
  {
    id: 3,
    defaultImage: "/images/coffee_date.png",
    caption: "Kopi hangat dan obrolan manis bersamamu",
    date: "14 Februari 2025",
    rotation: -2,
  },
  {
    id: 4,
    defaultImage: "/images/starry_sky.png",
    caption: "Melihat jutaan bintang, tapi kamu yang terindah",
    date: "05 Juni 2025",
    rotation: 5,
  },
];

export default function MemoryGallery() {
  const [memories, setMemories] = useState([]);
  const [activePhoto, setActivePhoto] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [tempCaption, setTempCaption] = useState("");
  const fileInputRefs = useRef({});

  // SSR Safe LocalStorage loading
  useEffect(() => {
    const savedMemories = localStorage.getItem("klea_memories");
    if (savedMemories) {
      try {
        setMemories(JSON.parse(savedMemories));
      } catch (e) {
        setMemories(DEFAULT_MEMORIES);
      }
    } else {
      setMemories(DEFAULT_MEMORIES);
    }
  }, []);

  const saveMemories = (updated) => {
    setMemories(updated);
    localStorage.setItem("klea_memories", JSON.stringify(updated));
  };

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const updated = memories.map((m) => {
        if (m.id === id) {
          return { ...m, customImage: event.target.result };
        }
        return m;
      });
      saveMemories(updated);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = (id) => {
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id].click();
    }
  };

  const startEditing = (id, currentCaption) => {
    setEditingId(id);
    setTempCaption(currentCaption);
  };

  const saveCaption = (id) => {
    const updated = memories.map((m) => {
      if (m.id === id) {
        return { ...m, caption: tempCaption || "Kenangan Manis ✨" };
      }
      return m;
    });
    saveMemories(updated);
    setEditingId(null);
  };

  const resetAllMemories = () => {
    if (confirm("Apakah kamu ingin mengembalikan foto & cerita bawaan semula?")) {
      setMemories(DEFAULT_MEMORIES);
      localStorage.removeItem("klea_memories");
    }
  };

  const removeCustomImage = (id) => {
    const updated = memories.map((m) => {
      if (m.id === id) {
        const { customImage, ...rest } = m;
        return rest;
      }
      return m;
    });
    saveMemories(updated);
  };

  return (
    <section className="py-20 px-4 relative max-w-6xl mx-auto z-10" id="gallery">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-glow-pink text-pink-300 mb-4">
            Galeri Kenangan Kita ✨
          </h2>
          <p className="text-pink-200/70 max-w-xl mx-auto text-sm md:text-base">
            Spot-spot foto spesial untuk mengabadikan momen terindah kita. Kamu bisa klik foto untuk memperbesar, klik teks untuk mengedit cerita, atau ganti foto dengan fotomu sendiri!
          </p>
        </motion.div>
        
        {/* Reset button */}
        <motion.button
          onClick={resetAllMemories}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-rose-gold border border-rose-gold/30 px-3 py-1.5 rounded-full cursor-pointer hover:bg-rose-gold/10 transition-all"
        >
          <RotateCcw size={12} />
          Reset ke Awal
        </motion.button>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {memories.map((memory, index) => {
          const displayImage = memory.customImage || memory.defaultImage;
          const isCustom = !!memory.customImage;

          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50, rotate: memory.rotation * 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: memory.rotation }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0, 
                y: -10,
                zIndex: 20,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)" 
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-pink-50 p-4 pb-6 rounded shadow-xl text-neutral-800 w-64 flex flex-col relative group"
            >
              {/* Adhesive tape simulation */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-100/40 backdrop-blur-xs border border-white/20 -rotate-2 origin-center shadow-xs pointer-events-none" />

              {/* Photo box */}
              <div className="relative w-full aspect-square bg-neutral-200 overflow-hidden border border-neutral-300 shadow-inner rounded-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displayImage}
                  alt={memory.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Upload overlay buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-300">
                  <button
                    onClick={() => triggerFileInput(memory.id)}
                    className="p-2 rounded-full bg-white/90 text-pink-600 hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer"
                    title="Ganti Foto"
                  >
                    <Camera size={18} />
                  </button>
                  <button
                    onClick={() => setActivePhoto(memory)}
                    className="p-2 rounded-full bg-white/90 text-neutral-700 hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer"
                    title="Perbesar"
                  >
                    <Maximize2 size={18} />
                  </button>
                  {isCustom && (
                    <button
                      onClick={() => removeCustomImage(memory.id)}
                      className="p-2 rounded-full bg-rose-600/90 text-white hover:bg-rose-600 hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer"
                      title="Hapus Kustom"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={(el) => (fileInputRefs.current[memory.id] = el)}
                  onChange={(e) => handleImageUpload(memory.id, e)}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Caption area */}
              <div className="mt-4 flex-1 flex flex-col justify-between">
                {editingId === memory.id ? (
                  <div className="flex flex-col gap-1.5">
                    <textarea
                      value={tempCaption}
                      onChange={(e) => setTempCaption(e.target.value)}
                      maxLength={70}
                      rows={2}
                      className="w-full text-base p-1.5 border border-pink-300 rounded font-caveat font-bold focus:outline-none focus:ring-1 focus:ring-pink-500 bg-white"
                      autoFocus
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-[10px] text-neutral-500 px-2 py-0.5 hover:bg-neutral-100 rounded cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => saveCaption(memory.id)}
                        className="text-[10px] bg-pink-500 text-white px-2 py-0.5 hover:bg-pink-600 rounded cursor-pointer font-medium"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => startEditing(memory.id, memory.caption)}
                    className="cursor-pointer group/caption relative hover:bg-pink-100/50 p-1 rounded transition-colors"
                  >
                    <p className="font-caveat text-xl text-center leading-tight font-bold text-neutral-800 pr-4">
                      "{memory.caption}"
                    </p>
                    <Edit3 
                      size={10} 
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 opacity-0 group-hover/caption:opacity-100 transition-opacity" 
                    />
                  </div>
                )}

                <div className="mt-3 text-center border-t border-dashed border-neutral-300 pt-2">
                  <span className="text-[10px] font-mono tracking-wider text-neutral-400 block">
                    {memory.date}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-pink-50 p-5 pb-8 rounded-lg shadow-2xl max-w-xl w-full text-neutral-800 flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute -top-10 right-0 text-white hover:text-pink-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                Tutup ×
              </button>

              <div className="w-full aspect-video rounded overflow-hidden shadow-inner border border-neutral-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activePhoto.customImage || activePhoto.defaultImage}
                  alt={activePhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-6 text-center">
                <p className="font-caveat text-2xl font-bold text-neutral-900 mb-1">
                  "{activePhoto.caption}"
                </p>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  {activePhoto.date}
                </span>
                
                <p className="mt-4 text-base md:text-lg text-neutral-600 font-caveat font-bold leading-relaxed max-w-md mx-auto">
                  Setiap detik bersamamu adalah lembaran cerita yang paling berharga. Foto ini mewakili sejuta kebahagiaan yang kita ukir, dan aku tak sabar untuk mengukir ribuan senyum baru di hari-hari esok bersamamu.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
