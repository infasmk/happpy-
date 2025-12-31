import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const CutenessMeter: React.FC = () => {
  const [value, setValue] = useState(50);
  const controls = useAnimation();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  useEffect(() => {
    if (value > 95) {
      triggerMaxLove();
    }
  }, [value]);

  const triggerMaxLove = async () => {
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.7 },
      colors: ['#fb7185', '#f472b6', '#e879f9']
    });
    
    await controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    });
  };

  return (
    <section className="w-full py-16 flex flex-col items-center">
      <motion.div 
        className="w-full max-w-md bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-center text-rose-900 mb-2">
          How much do I adore you?
        </h2>
        <p className="text-center text-slate-500 mb-8 text-sm">
          (Try to drag the slider!)
        </p>

        <div className="relative w-full h-12 flex items-center justify-center mb-4">
          <motion.div
            animate={controls}
            style={{ scale: 0.5 + (value / 50) }}
            className="text-rose-500 drop-shadow-lg filter"
          >
            <Heart size={40} fill="currentColor" />
          </motion.div>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleInput}
          className="w-full h-3 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-500 hover:accent-rose-400 transition-all"
        />

        <div className="flex justify-between mt-4 text-xs font-bold text-rose-300 tracking-widest uppercase">
          <span>A little</span>
          <span>Infinity</span>
        </div>

        <motion.p 
          className="text-center mt-6 font-handwriting text-2xl text-rose-600 h-8"
          key={value > 90 ? 'max' : 'normal'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {value < 30 && "Keep going..."}
          {value >= 30 && value < 70 && "Getting there! 💕"}
          {value >= 70 && value < 95 && "Almost... 💖"}
          {value >= 95 && "To Infinity & Beyond! 🚀"}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default CutenessMeter;