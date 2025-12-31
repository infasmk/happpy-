import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
            scale: 1, 
            rotate: 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 bg-rose-200 blur-2xl opacity-50 rounded-full animate-pulse" />
        
        {/* Heartbeat animation */}
        <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.2, 1]
            }}
        >
            <Heart className="w-24 h-24 text-rose-500 fill-rose-200 relative z-10 drop-shadow-lg" strokeWidth={1.5} />
        </motion.div>

        {/* Floating Sparkles around heart */}
        <motion.div 
            className="absolute -top-4 -right-4 text-amber-300"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
            <Sparkles size={24} />
        </motion.div>
      </motion.div>

      <motion.h1
        className="font-handwriting text-5xl md:text-7xl text-rose-900 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Hey Diyoo...
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-slate-600 mb-12 max-w-md font-sans"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Today is all about you, my love.
      </motion.p>

      <motion.button
        onClick={onStart}
        className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-pink-100 hover:border-pink-300 transition-all duration-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(255 228 230 / 0.5)" }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center gap-2 text-rose-600 font-medium tracking-wide">
          Enter Your Birthday World <Heart size={16} className="fill-rose-500 group-hover:scale-125 transition-transform" />
        </span>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    </motion.div>
  );
};

export default IntroScreen;