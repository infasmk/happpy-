import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate rotation for the heart based on scroll speed could be complex, 
  // but let's just make it slide.
  
  // Create a transform for the heart icon's X position based on percentage
  // Since we can't easily map scaleX (which is 0-1) to pixel width directly in the transform property 
  // efficiently without layout thrashing, we'll use a container approach.

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-[100] bg-rose-100/30">
      <motion.div
        className="h-full bg-gradient-to-r from-rose-400 to-pink-500 origin-left relative"
        style={{ scaleX }}
      >
        {/* Heart Indicator at the tip of the progress bar */}
        {/* We use a hacky way to position the heart at the right end of the scaled div */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
            <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <Heart size={16} className="fill-rose-500 text-rose-600 drop-shadow-md" />
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollProgress;