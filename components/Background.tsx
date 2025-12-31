import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ExtendedFloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  shape: string;
  color: string;
  rotate: number;
  layer: number;
  rotationDirection: number;
  swayDistance: number;
  swayDuration: number;
}

const SHAPES = ['♥', '✦', '•', '⋆', '✿', '♪', '☁', '✧', '♦', '❋'];
const COLORS = [
  'text-rose-300', 
  'text-pink-300', 
  'text-purple-300', 
  'text-sky-200', 
  'text-amber-200',
];

const Background: React.FC = () => {
  const [elements, setElements] = useState<ExtendedFloatingElement[]>([]);
  const { scrollY } = useScroll();

  // Optimized: Removed heavy mouse-tracking state that caused lag.
  // We rely purely on CSS animations and Scroll transforms for smoothness.

  // Parallax layers
  const y1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -120]);
  const layers = [y1, y2, y1]; // Reusing y1 for third layer to save resources

  const yGrad = useTransform(scrollY, [0, 1000], [0, -80]);

  useEffect(() => {
    // Optimization: Reduced density from 100 to 30 for smooth performance
    const newElements = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotate: Math.random() * 360,
      layer: Math.floor(Math.random() * 3),
      rotationDirection: Math.random() > 0.5 ? 1 : -1,
      swayDistance: Math.random() * 30 + 10,
      swayDuration: Math.random() * 10 + 10,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient Orbs - Simplified for performance */}
      <motion.div 
        style={{ y: yGrad }} 
        className="absolute inset-0"
      >
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
      </motion.div>

      {/* Floating Icons */}
      {elements.map((el) => {
        return (
            <motion.div
            key={el.id}
            className="absolute"
            style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                y: layers[el.layer % 3], // Safe index
            }}
            >
            <motion.div
                className={`${el.color} opacity-40`}
                style={{
                    fontSize: `${el.size}px`,
                }}
                initial={{ rotate: el.rotate, scale: 0 }}
                animate={{
                    y: [0, -30, 0], // Reduced float distance
                    x: [0, el.swayDistance, 0],
                    opacity: [0, 0.6, 0],
                    rotate: [el.rotate, el.rotate + (180 * el.rotationDirection)],
                    scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                    y: { 
                        duration: el.duration, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: el.delay 
                    },
                    x: {
                        duration: el.swayDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: el.delay
                    },
                    opacity: {
                        duration: el.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: el.delay
                    },
                    rotate: {
                        duration: el.duration * 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    },
                    scale: {
                        duration: el.duration * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            >
                {el.shape}
            </motion.div>
            </motion.div>
        );
      })}
    </div>
  );
};

export default Background;