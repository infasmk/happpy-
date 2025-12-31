import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, onClose }) => {
  const [yesClicked, setYesClicked] = useState(false);
  const [displayText, setDisplayText] = useState("Happy Birthday Hadiya! 🎂");
  const [explodingHearts, setExplodingHearts] = useState<{id: number, x: number, y: number, scale: number, rotation: number}[]>([]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setYesClicked(false);
      setDisplayText("Happy Birthday Hadiya! 🎂");
      setExplodingHearts([]);
    }
  }, [isOpen]);

  const handleYesClick = () => {
    setYesClicked(true);
    setDisplayText("I LOVE YOU PATH00III! ❤️");
    triggerMassiveCelebration();
    triggerHeartBlast();
  };

  const triggerHeartBlast = () => {
    // Create particles for Framer Motion to animate
    const hearts = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 600, // Explode outwards
        y: (Math.random() - 0.5) * 600,
        scale: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * 360
    }));
    setExplodingHearts(hearts);
  };

  const triggerMassiveCelebration = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff0000', '#ff69b4', '#ffd700'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ff0000', '#ff69b4', '#ffd700'] });
    }, 250);
    
    // Initial burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#fb7185', '#ffffff'],
        scalar: 1.5
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-rose-900/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative bg-white/95 backdrop-blur-xl w-full max-w-lg p-8 md:p-12 rounded-[2rem] shadow-2xl border-4 border-rose-200 text-center overflow-visible"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

            {/* Heart Blast Elements */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
                {explodingHearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                        animate={{ x: heart.x, y: heart.y, scale: heart.scale, opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute text-rose-500"
                    >
                        <Heart fill="currentColor" style={{ transform: `rotate(${heart.rotation}deg)` }} size={32} />
                    </motion.div>
                ))}
            </div>

            {!yesClicked && (
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>
            )}

            <motion.div 
                className="mx-auto w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <Cake size={48} className="text-rose-500 fill-rose-100" />
            </motion.div>

            <motion.h2 
                key={displayText}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-4xl font-handwriting font-bold text-rose-800 mb-8 leading-relaxed"
            >
                {displayText}
            </motion.h2>

            {!yesClicked ? (
              <div className="flex flex-col items-center justify-center gap-4">
                 <p className="text-slate-600 mb-4">Make a wish and blow out the candles! 🕯️</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold text-xl shadow-lg shadow-rose-200 transition-all w-60 relative z-10"
                >
                  Make a Wish ✨
                </motion.button>
              </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <p className="text-slate-600">May all your dreams come true, my Diyoo! 🎉</p>
                    <button 
                        onClick={onClose}
                        className="mt-4 px-6 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200"
                    >
                        Close
                    </button>
                </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProposalModal;