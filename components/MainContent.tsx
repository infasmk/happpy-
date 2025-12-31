import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';

import RevealSection from './RevealSection';
import MemoryLaneSection from './MemoryLaneSection';
import PhotoGallerySection from './PhotoGallerySection';
import ReasonsSection from './ReasonsSection';
import CouponsSection from './CouponsSection';
import MomentsSection from './MomentsSection';
import CutenessMeter from './CutenessMeter';
import SurpriseSection from './SurpriseSection';
import FinalMessage from './FinalMessage';

const steps = [
  { component: RevealSection, id: 'reveal' },
  { component: MemoryLaneSection, id: 'memory' },
  { component: PhotoGallerySection, id: 'photos' },
  { component: ReasonsSection, id: 'reasons' },
  { component: CouponsSection, id: 'coupons' },
  { component: MomentsSection, id: 'moments' },
  { component: CutenessMeter, id: 'meter' },
  { component: SurpriseSection, id: 'surprise' },
  { component: FinalMessage, id: 'final' }
];

const MainContent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const CurrentComponent = steps[currentStep].component;

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    })
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col py-20 overflow-x-hidden">
      
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 relative flex flex-col items-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 }
            }}
            className="w-full bg-white/60 backdrop-blur-md rounded-[2rem] p-6 md:p-12 shadow-xl border border-white/80 min-h-[50vh] flex flex-col"
          >
            {/* Component Content */}
            <div className="flex-1 w-full">
                <CurrentComponent />
            </div>

            {/* Navigation Controls - Inline at bottom */}
            <div className="w-full flex justify-between items-center mt-16 pt-8 border-t border-rose-100/50">
                
                {/* Back Button */}
                <div className="min-w-[100px]">
                  {currentStep > 0 ? (
                    <motion.button
                      onClick={prevStep}
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-slate-500 hover:text-rose-500 font-medium px-4 py-2 hover:bg-rose-50 rounded-full transition-colors"
                    >
                      <ChevronLeft size={20} /> Back
                    </motion.button>
                  ) : <div />}
                </div>

                {/* Next Button */}
                <div className="min-w-[100px] flex justify-end">
                  {currentStep < steps.length - 1 && (
                    <motion.button
                      onClick={nextStep}
                      className="group relative px-8 py-3 bg-rose-500 text-white rounded-full font-bold shadow-lg shadow-rose-300/40 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Next Page <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <motion.div 
                        className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                        animate={{ left: ['100%'] }}
                        transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                      />
                    </motion.button>
                  )}
                </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots - Fixed at bottom center */}
      <div className="fixed bottom-6 left-0 w-full z-40 flex justify-center items-center pointer-events-none">
        <div className="bg-white/40 backdrop-blur-xl px-6 py-3 rounded-full flex gap-3 shadow-lg border border-white/40">
            {steps.map((_, idx) => (
                <motion.div 
                    key={idx}
                    animate={{ 
                        scale: idx === currentStep ? 1.3 : 1,
                        backgroundColor: idx === currentStep ? '#f43f5e' : '#fda4af',
                        opacity: idx === currentStep ? 1 : 0.5
                    }}
                    className="w-2.5 h-2.5 rounded-full"
                />
            ))}
        </div>
      </div>

    </div>
  );
};

export default MainContent;