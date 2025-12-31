import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

interface SparkleItem {
  id: number;
  x: number;
  y: number;
  icon: any;
  color: string;
  size: number;
}

const ICONS = [Heart, Star, Sparkles];
const COLORS = [
  'text-rose-400', 
  'text-amber-400', 
  'text-sky-400', 
  'text-purple-400', 
  'text-pink-500'
];

const ClickSparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<SparkleItem[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create a small burst of 3-5 particles per click
      const particleCount = Math.floor(Math.random() * 3) + 3;
      const newSparkles: SparkleItem[] = [];

      for (let i = 0; i < particleCount; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          icon: ICONS[Math.floor(Math.random() * ICONS.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 12 + 12, // Random size between 12 and 24
        });
      }

      setSparkles(prev => [...prev, ...newSparkles]);

      // Cleanup after animation
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle, i) => (
          <motion.div
            key={sparkle.id}
            initial={{ 
              scale: 0, 
              opacity: 1, 
              x: sparkle.x - 10, // Center approx
              y: sparkle.y - 10 
            }}
            animate={{ 
              scale: [0, 1.2, 0], // Pop up and shrink
              opacity: [1, 1, 0],
              y: sparkle.y - (Math.random() * 100 + 50), // Float up significantly
              x: sparkle.x + (Math.random() * 100 - 50), // Scatter horizontally
              rotate: Math.random() * 180 - 90
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut"
            }}
            className={`absolute ${sparkle.color}`}
          >
            <sparkle.icon size={sparkle.size} fill="currentColor" className="opacity-80" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickSparkles;