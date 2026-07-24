"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PARTICLE_TYPES = ["🌻", "❤️", "💖", "✨", "💕", "🌻", "🌻", "💛"];

export default function FloatingHearts() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles only on the client side
    const initialParticles = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage from left
      delay: Math.random() * 8, // staggered start
      duration: 6 + Math.random() * 10, // how slow it floats
      scale: 0.5 + Math.random() * 1.2,
      type: PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)],
      sway: 15 + Math.random() * 30, // horizontal sway amplitude
    }));
    setParticles(initialParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl select-none opacity-0"
          style={{ left: `${particle.x}%`, bottom: "-5%" }}
          animate={{
            y: ["0vh", "-110vh"],
            x: [
              "0px", 
              `${particle.sway}px`, 
              `-${particle.sway}px`, 
              `${particle.sway / 2}px`
            ],
            scale: [particle.scale, particle.scale * 1.1, particle.scale * 0.9],
            opacity: [0, 0.6, 0.6, 0.4, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        >
          {particle.type}
        </motion.div>
      ))}
    </div>
  );
}
