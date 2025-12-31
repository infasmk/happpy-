import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  icon: any;
  color: string;
  size: number;
  rotation: number;
}

const ICONS = [Heart, Star, Sparkles];
const COLORS = [
  'text-rose-400', 
  'text-pink-400', 
  'text-purple-400', 
  'text-sky-400', 
  'text-amber-400'
];

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const lastParticleTime = useRef(0);

  // cleanup function to remove old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => {
        const now = Date.now();
        const filtered = prev.filter(p => now - p.id < 1000); // Remove particles older than 1s
        return filtered.length !== prev.length ? filtered : prev;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Add trail particle with throttle
      const now = Date.now();
      if (now - lastParticleTime.current > 40) { // New particle every 40ms
        const newParticle: TrailParticle = {
          id: now,
          x: e.clientX,
          y: e.clientY,
          icon: ICONS[Math.floor(Math.random() * ICONS.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 8 + 8, // 8px to 16px
          rotation: Math.random() * 360,
        };

        setTrail(prev => [...prev, newParticle]);
        lastParticleTime.current = now;
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Magic Trail Layer */}
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        <AnimatePresence>
          {trail.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                opacity: 0.8, 
                scale: 0, 
                x: particle.x - particle.size / 2, 
                y: particle.y - particle.size / 2 
              }}
              animate={{ 
                opacity: 0, 
                scale: 1, 
                x: particle.x + (Math.random() * 40 - 20), // Drift X
                y: particle.y + (Math.random() * 40 + 20), // Fall down Y
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`absolute ${particle.color}`}
            >
              <particle.icon 
                size={particle.size} 
                fill="currentColor" 
                style={{ transform: `rotate(${particle.rotation}deg)` }} 
                className="opacity-70"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Cursor Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-rose-300 pointer-events-none z-[9999] mix-blend-multiply flex items-center justify-center"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : 1,
          rotate: clicked ? -45 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <div className="w-1 h-1 bg-rose-400 rounded-full opacity-50" />
      </motion.div>

      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-rose-500 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
          mass: 0.1
        }}
      />
    </>
  );
};

export default CustomCursor;