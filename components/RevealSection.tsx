import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const RevealSection: React.FC = () => {
  const [count, setCount] = useState(3);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowCelebration(true);
      triggerExplosion();
    }
  }, [count]);

  const triggerExplosion = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    // Confetti explosion
    const interval: any = setInterval(function() {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: ['#e11d48', '#fb7185', '#fda4af', '#fff1f2']
      });
    }, 250);
  };

  const text = "Happy Birthday My Love! ❤️";

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center relative w-full">
        <AnimatePresence mode="wait">
            {!showCelebration ? (
                <motion.div
                    key={count}
                    initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
                    exit={{ scale: 3, opacity: 0, rotate: 10 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                    className="flex flex-col items-center justify-center"
                >
                    <div className="font-handwriting text-[10rem] md:text-[15rem] text-rose-400 font-bold leading-none drop-shadow-sm">
                        {count}
                    </div>
                    <p className="text-xl text-rose-300 font-sans mt-4">Get ready...</p>
                </motion.div>
            ) : (
                <motion.div 
                    className="relative z-10 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Background Popping Hearts */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
                        {Array.from({ length: 20 }).map((_, i) => (
                             <motion.div
                                key={i}
                                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                                animate={{ 
                                    scale: [0, 1.5, 0], 
                                    x: (Math.random() - 0.5) * 500,
                                    y: (Math.random() - 0.5) * 500,
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    delay: Math.random() * 0.5,
                                    ease: "easeOut",
                                    repeat: Infinity,
                                    repeatDelay: Math.random() * 2
                                }}
                                className="absolute text-rose-200/50"
                             >
                                 <Heart fill="currentColor" size={Math.random() * 40 + 20} />
                             </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="font-handwriting text-5xl md:text-8xl text-rose-800 leading-tight drop-shadow-sm mb-6 relative z-10"
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.05 }}
                    >
                        {text.split("").map((char, index) => (
                        <motion.span key={index} variants={letter} className="inline-block">
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                        ))}
                    </motion.div>
                    
                    <motion.div
                        className="mt-8 text-2xl md:text-3xl text-rose-500 font-sans font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, type: "spring" }}
                    >
                        My beautiful Pathooiii ✨
                    </motion.div>

                    <motion.div
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                    >
                        <Heart className="inline-block text-rose-500 fill-rose-500 animate-pulse" size={40} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </section>
  );
};

export default RevealSection;