"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HEARTS = ["🌻", "❤️", "💖", "💕", "✨", "🌻", "💛"];

export default function LoveTrail() {
  const [particles, setParticles] = useState([]);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      // Get pointer coordinates (handles both mouse and touch)
      let x, y;
      if (e.touches && e.touches[0]) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      // Calculate distance from last spawn to throttle spawning
      const dist = Math.hypot(x - lastPos.x, y - lastPos.y);
      if (dist < 45) return; // Spawn every 45px of movement

      setLastPos({ x, y });

      const newParticle = {
        id: Date.now() + Math.random(),
        x,
        y,
        emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        scale: 0.5 + Math.random() * 0.7,
        swayX: (Math.random() - 0.5) * 60, // random sway side-to-side
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]); // keep max 15 active
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        
        // Spawn 3 burst particles on tap
        const newBursts = Array.from({ length: 3 }).map((_, i) => ({
          id: Date.now() + Math.random() + i,
          x,
          y,
          emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
          scale: 0.6 + Math.random() * 0.8,
          swayX: (Math.random() - 0.5) * 80,
        }));
        
        setParticles((prev) => [...prev.slice(-15), ...newBursts]);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [lastPos]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: p.scale, x: p.x - 12, y: p.y - 12 }}
            animate={{
              opacity: 0,
              y: p.y - 80 - Math.random() * 40,
              x: p.x - 12 + p.swayX,
              scale: p.scale * 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute text-lg select-none filter drop-shadow-[0_2px_8px_rgba(219,39,119,0.4)]"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
