import Link from "next/link";
import FloatingHearts from "@/components/FloatingHearts";
import LoveTrail from "@/components/LoveTrail";
import MusicPlayer from "@/components/MusicPlayer";
import InteractiveLetter from "@/components/InteractiveLetter";
import MemoryGallery from "@/components/MemoryGallery";
import ReasonsCardStack from "@/components/ReasonsCardStack";
import LoveProposal from "@/components/LoveProposal";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-velvet-deep via-velvet-mid to-velvet-deep text-pink-100 overflow-x-hidden font-sans pb-20 selection:bg-pink-600 selection:text-white">
      {/* 1. Ambient Background Particles */}
      <FloatingHearts />

      {/* 2. Interactive Sparkle & Heart Trail (Touch/Cursor) */}
      <LoveTrail />

      {/* 3. Floating Ambient Music Player */}
      <MusicPlayer />

      {/* 4. Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 z-10 pt-20">
        {/* Soft pink highlight */}
        <div className="absolute top-1/4 w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />

        <div className="flex flex-col items-center gap-6 max-w-3xl">
          {/* Badge indicator */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-950/40 text-rose-gold text-xs font-semibold uppercase tracking-wider animate-pulse shadow-sm">
            ✨ Dibuat Khusus Untukmu
          </div>

          {/* Glowing Animated Heart */}
          <div className="relative my-4">
            {/* Pulsing ring around the heart */}
            <div className="absolute inset-0 bg-romantic-rose/20 rounded-full scale-150 blur-lg animate-pulse-slow" />
            <svg 
              className="w-20 h-20 text-romantic-rose fill-romantic-rose animate-heartbeat relative filter drop-shadow-[0_0_15px_rgba(219,39,119,0.6)]" 
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Main Title Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-playfair font-black tracking-tight leading-none">
            <span className="text-white">Untuk </span>
            <span className="text-glow-pink text-pink-400 bg-clip-text">Klea</span>
            <span className="text-white">, </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-gold-light via-rose-gold to-gold-bright text-glow-gold text-3xl sm:text-5xl md:text-6xl mt-4 block italic font-bold">
              Tersayang & Terindah ✨
            </span>
          </h1>

          {/* Subheading text */}
          <p className="text-pink-200/80 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-light mt-4">
            Selamat datang di tempat kecil kita. Sebuah rangkuman dari semua cerita indah, tawa hangat, dan sejuta alasan kenapa memiliki kamu di hidupku adalah anugerah terbesar.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#letter"
              className="bg-white/5 hover:bg-pink-900/20 border border-pink-500/30 hover:border-pink-500/50 text-pink-200 px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-pink-950/50 transition-all text-sm tracking-wider cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              Mulai Membaca 💖
              <span className="group-hover:translate-y-1 transition-transform">↓</span>
            </a>

            <Link
              href="/semangat"
              className="bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 border border-amber-500/40 text-amber-200 hover:text-white px-8 py-3.5 rounded-full font-bold shadow-lg transition-all text-sm tracking-wider cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Lagi Sedih / Lelah? 🌻
            </Link>
          </div>
          <span className="text-[10px] text-pink-300/40 uppercase tracking-widest mt-2 animate-bounce">
            Scroll kebawah untuk melanjutkan
          </span>
        </div>
      </section>

      {/* Decorative Wave Divider */}
      <div className="w-full overflow-hidden leading-none z-10 relative">
        <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.43,26.85,150.18,43.68,232.61,72.93,321.39,56.44Z" fill="#150311" opacity="0.3"></path>
        </svg>
      </div>

      {/* 5. Love Letter Envelope Section */}
      <div className="bg-velvet-mid/40">
        <InteractiveLetter />
      </div>

      {/* 6. Memory Polaroid Gallery Section */}
      <div className="bg-velvet-deep/20 border-y border-pink-950/20">
        <MemoryGallery />
      </div>

      {/* 7. Reasons Stack Section */}
      <div className="bg-velvet-mid/30">
        <ReasonsCardStack />
      </div>

      {/* 9. Proposal Section */}
      <div className="bg-gradient-to-t from-velvet-deep to-velvet-mid/50 border-t border-pink-950/20">
        <LoveProposal />
      </div>

      {/* 10. Footer */}
      <footer className="text-center py-8 border-t border-pink-950/40 px-4 mt-10 relative z-10">
        <div className="max-w-md mx-auto flex flex-col items-center gap-2">
          <p className="text-xs text-pink-300/40 tracking-wider">
            &copy; {new Date().getFullYear()} &bull; Dibuat khusus dengan segenap cinta 💖
          </p>
          <p className="text-[10px] text-pink-300/25 italic">
            "Semoga hari-hari kita selalu dipenuhi tawa hangat dan kebahagiaan manis."
          </p>
        </div>
      </footer>
    </main>
  );
}
