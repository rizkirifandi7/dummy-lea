"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Romantic acoustic/piano instrumental
  const songUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"; 

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Audio playback was blocked or failed:", error);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const muted = !isMuted;
    setIsMuted(muted);
    audioRef.current.muted = muted;
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Hidden Audio element */}
      <audio
        ref={audioRef}
        src={songUrl}
        loop
        onTimeUpdate={handleTimeUpdate}
      />

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel p-4 rounded-2xl w-72 mb-3 box-glow-pink flex flex-col gap-3 relative overflow-hidden"
          >
            {/* Soft pink background glow inside panel */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-romantic-pink/10 blur-xl pointer-events-none" />

            <div className="flex items-center gap-3">
              {/* Vinyl cover image (rotating when playing) */}
              <div className="relative w-14 h-14 flex-shrink-0">
                <div 
                  className={`w-full h-full rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center shadow-lg overflow-hidden ${
                    isPlaying ? "animate-spin-slow" : ""
                  }`}
                >
                  {/* Vinyl center sticker */}
                  <div className="w-5 h-5 rounded-full bg-romantic-rose border border-gold-bright flex items-center justify-center">
                    <Heart size={8} className="text-white fill-white" />
                  </div>
                </div>
                {/* Needle overlay */}
                <div 
                  className={`absolute top-0 right-0 w-4 h-6 bg-transparent border-t-2 border-r-2 border-rose-gold/70 rounded-tr origin-top-left transition-transform duration-500 ${
                    isPlaying ? "rotate-12" : "-rotate-12"
                  }`} 
                />
              </div>

              {/* Title info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-rose-gold font-medium uppercase tracking-wider">Now Playing</p>
                <p className="text-sm font-semibold truncate text-pink-200">Melody for Klea 💖</p>
                <p className="text-[10px] text-pink-300/60 truncate">Royalty Free Acoustic</p>
              </div>

              {/* Mini visualizer bar animation */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-6">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-0.75 bg-romantic-rose rounded-full"
                      animate={{ height: ["10%", "90%", "10%"] }}
                      transition={{
                        duration: 0.6 + i * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Slider progress */}
            <div 
              className="w-full h-1.5 bg-pink-950/40 rounded-full overflow-hidden cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-gradient-to-r from-romantic-rose to-romantic-pink rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-between mt-1">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-romantic-rose to-romantic-pink flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-white"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </button>

              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-pink-300 hover:text-romantic-pink transition-colors">
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-romantic-rose cursor-pointer h-1 rounded-lg bg-pink-950/40"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating circle button to toggle panel */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border relative transition-all duration-300 ${
          isPlaying 
            ? "bg-romantic-rose border-romantic-pink/40 text-white box-glow-pink" 
            : "bg-velvet-light border-white/10 text-pink-300"
        }`}
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <Music size={22} />
          </motion.div>
        ) : (
          <Music size={22} />
        )}
        
        {/* Cute small floating notification dot if player is paused */}
        {!isPlaying && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-glow rounded-full text-[9px] font-bold text-velvet-deep flex items-center justify-center animate-pulse">
            !
          </span>
        )}
      </motion.button>
    </div>
  );
}
