import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX, Volume2 } from 'lucide-react';

interface MusicToggleProps {
  started: boolean;
}

const MusicToggle: React.FC<MusicToggleProps> = ({ started }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    // Using a reliable, gentle royalty-free piano track source
    // This is a placeholder URL for a soft piano track.
    audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73467.mp3"); // "Gentle Piano" style track
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle start interaction
  useEffect(() => {
    if (started && audioRef.current && !isPlaying) {
      // Browsers often block autoplay, so we try to play on the "Start" interaction state change
      // However, usually we need a direct user event. 
      // We'll set it to play if the user toggles it, but for auto-start we might try:
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // Autoplay prevented, waiting for manual toggle
        console.log("Autoplay prevented, waiting for user input");
      });
    }
  }, [started]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!started) return null;

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-pink-100 hover:scale-110 transition-transform active:scale-95"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ boxShadow: "0 0 15px rgba(255, 182, 193, 0.6)" }}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Volume2 className="text-rose-500 w-6 h-6" />
          </motion.div>
        ) : (
          <motion.div
            key="muted"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <VolumeX className="text-slate-400 w-6 h-6" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Visual ring pulse if playing */}
      {isPlaying && (
        <span className="absolute inset-0 rounded-full border-2 border-rose-300 animate-ping opacity-30 pointer-events-none" />
      )}
    </motion.button>
  );
};

export default MusicToggle;