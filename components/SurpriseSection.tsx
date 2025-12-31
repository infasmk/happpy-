import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import ProposalModal from './ProposalModal';

const SurpriseSection: React.FC = () => {
  const [showProposal, setShowProposal] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center py-12 w-full text-center">
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mb-8"
        >
            <Gift size={80} className="text-rose-500 drop-shadow-xl" strokeWidth={1} />
        </motion.div>

        <h2 className="text-4xl font-bold text-rose-900 mb-6 font-handwriting">
            One Final Surprise...
        </h2>
        
        <p className="text-lg text-slate-600 mb-10 max-w-md">
            I have one last special wish for my Pathooiii. Are you ready?
        </p>

        <motion.button
          onClick={() => setShowProposal(true)}
          className="group relative px-12 py-5 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full shadow-2xl shadow-rose-300"
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-3 text-white font-bold text-2xl tracking-wide">
            Open Gift 🎁
          </span>
          {/* Pulse Ring */}
          <span className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping opacity-50" />
        </motion.button>
      </motion.div>

      <ProposalModal isOpen={showProposal} onClose={() => setShowProposal(false)} />
      
    </section>
  );
};

export default SurpriseSection;