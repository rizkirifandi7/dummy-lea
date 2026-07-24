import Link from "next/link";
import FloatingHearts from "@/components/FloatingHearts";
import LoveTrail from "@/components/LoveTrail";
import MusicPlayer from "@/components/MusicPlayer";
import BreathingGuide from "@/components/BreathingGuide";
import VirtualHugButton from "@/components/VirtualHugButton";
import ComfortCards from "@/components/ComfortCards";
import AffirmationChecklist from "@/components/AffirmationChecklist";
import { ArrowLeft, Sun, Heart, Coffee, Moon, Music, Sparkles } from "lucide-react";

export const metadata = {
  title: "Pelukan & Semangat Untuk Klea 🌻✨",
  description: "Halaman khusus penuh kehangatan, pelukan virtual, dan kalimat penyemangat saat Klea merasa sedih atau lelah.",
};

export default function CheerUpPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-velvet-deep via-velvet-mid to-velvet-deep text-pink-100 overflow-x-hidden font-sans pb-24 selection:bg-pink-600 selection:text-white">
      {/* Ambient background particle elements */}
      <FloatingHearts />
      <LoveTrail />
      <MusicPlayer />

      {/* Modern Minimalist Navigation Header */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-pink-500/10 backdrop-blur-md px-4 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-pink-200/80 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Halaman Utama</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            <Sun size={14} className="animate-spin-slow text-amber-400" />
            <span>Ruang Pelukan Klea 🌻</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 z-10 text-center flex flex-col items-center justify-center">
        {/* Soft background lighting */}
        <div className="absolute top-1/4 w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-200 text-xs font-semibold uppercase tracking-wider shadow-sm animate-pulse">
            ✨ Jangan Sedih Lagi Ya, Klea
          </div>

          {/* Central Glowing Icon */}
          <div className="relative my-2">
            <div className="absolute inset-0 bg-amber-400/20 rounded-full scale-150 blur-xl animate-pulse-slow" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-pink-500 p-0.5 shadow-2xl flex items-center justify-center relative">
              <div className="w-full h-full bg-velvet-mid rounded-full flex items-center justify-center">
                <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-amber-300 animate-spin-slow" />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-playfair font-black tracking-tight leading-tight">
            <span className="text-white">Semangat Ya, </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-pink-400 text-glow-pink">
              Klea Sayang 🌻
            </span>
            <br />
            <span className="text-xl sm:text-3xl md:text-4xl text-pink-200/90 italic font-normal mt-3 block">
              "Kamu Tidak Harus Selalu Kuat Setiap Saat"
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-pink-200/80 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-light mt-2">
            Jika hari ini terasa terlalu berat, letakkan sejenak bebannya di sini. Halaman ini dibuat khusus untuk memelukmu, menenangkan pikiranmu, dan mengingatkan betapa luar biasanya dirimu.
          </p>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <a
              href="#breathing"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-pink-200 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all hover:scale-105"
            >
              🌬️ Ambil Napas
            </a>
            <a
              href="#virtual-hug"
              className="bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-200 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all hover:scale-105"
            >
              💖 Pelukan Virtual
            </a>
            <a
              href="#comfort-cards"
              className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all hover:scale-105"
            >
              🌸 Pesan Penguat
            </a>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="max-w-4xl mx-auto px-4 my-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
      </div>

      {/* Section 1: Breathing Exercise */}
      <section className="py-10 px-4 relative z-10" id="breathing">
        <BreathingGuide />
      </section>

      {/* Section 2: Virtual Hug Generator */}
      <section className="py-10 px-4 relative z-10" id="virtual-hug">
        <VirtualHugButton />
      </section>

      {/* Section 3: Categorized Comfort Cards */}
      <section className="py-10 px-4 relative z-10" id="comfort-cards">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-playfair font-bold text-white mb-2">
            Surat Penyemangat Untuk Klea 💌
          </h2>
          <p className="text-xs sm:text-sm text-pink-200/70 max-w-md mx-auto">
            Pilih situasi perasaan Klea di bawah untuk membaca kalimat tenang yang menyejukkan hati.
          </p>
        </div>
        <ComfortCards />
      </section>

      {/* Section 4: Self Affirmations Checklist */}
      <section className="py-10 px-4 relative z-10" id="affirmations">
        <AffirmationChecklist />
      </section>

      {/* Section 5: Self-Care Prescription Grid */}
      <section className="py-12 px-4 relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles size={14} /> Resep Bahagia Sederhana
          </div>
          <h2 className="text-2xl sm:text-4xl font-playfair font-bold text-white">
            Rekomendasi Manja Untuk Klea 🧸
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-pink-500/10 text-center flex flex-col items-center gap-3 hover:border-pink-500/30 transition-all">
            <div className="p-3 rounded-full bg-pink-500/10 text-pink-300">
              <Coffee size={24} />
            </div>
            <h3 className="font-bold text-sm text-white">Minum Air/Teh Hangat</h3>
            <p className="text-xs text-pink-200/60">Bantu tubuh rileks dari dalam dengan minuman hangat kesukaanmu.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-pink-500/10 text-center flex flex-col items-center gap-3 hover:border-pink-500/30 transition-all">
            <div className="p-3 rounded-full bg-purple-500/10 text-purple-300">
              <Music size={24} />
            </div>
            <h3 className="font-bold text-sm text-white">Putar Musik Lembut</h3>
            <p className="text-xs text-pink-200/60">Dengarkan melodi menenangkan yang ada di pemutar musik halaman ini.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-pink-500/10 text-center flex flex-col items-center gap-3 hover:border-pink-500/30 transition-all">
            <div className="p-3 rounded-full bg-amber-500/10 text-amber-300">
              <Moon size={24} />
            </div>
            <h3 className="font-bold text-sm text-white">Istirahat / Tidur Nyenyak</h3>
            <p className="text-xs text-pink-200/60">Matikan HP sejenak, peluk guling hangat, dan biarkan matamu istirahat.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-pink-500/10 text-center flex flex-col items-center gap-3 hover:border-pink-500/30 transition-all">
            <div className="p-3 rounded-full bg-rose-500/10 text-rose-300">
              <Heart size={24} />
            </div>
            <h3 className="font-bold text-sm text-white">Cerita Ke Aku</h3>
            <p className="text-xs text-pink-200/60">Kapan pun Klea siap, aku selalu di sini mendengarkan tanpa menghakimi.</p>
          </div>
        </div>
      </section>

      {/* Footer / Closing Banner */}
      <footer className="mt-16 text-center px-4 relative z-10">
        <div className="max-w-md mx-auto glass-panel p-8 rounded-3xl border border-pink-500/20 shadow-xl flex flex-col items-center gap-4">
          <p className="font-caveat text-2xl text-pink-200">
            "Ingat ya Klea... Setelah hujan dan badai, selalu ada pelangi yang indah. Senyummu bakal kembali bersinar!"
          </p>

          <Link
            href="/"
            className="mt-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105"
          >
            Kembali ke Kenangan Manis Kita 💖
          </Link>

          <p className="text-[10px] text-pink-300/40 tracking-wider mt-4">
            &copy; {new Date().getFullYear()} &bull; Dibuat khusus dengan segenap perhatian & cinta
          </p>
        </div>
      </footer>
    </main>
  );
}
