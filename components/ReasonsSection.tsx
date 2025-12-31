import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Cloud } from 'lucide-react';

interface Reason {
  id: number;
  icon: any;
  front: string;
  back: string;
  color: string;
  iconColor: string;
}

const reasons: Reason[] = [
  {
    id: 1,
    icon: Star,
    front: "Reason #1",
    back: "Because my Diyoo is the most supportive person in my life.",
    color: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-400"
  },
  {
    id: 2,
    icon: Heart,
    front: "Reason #2",
    back: "Because loving you is the easiest thing I've ever done.",
    color: "bg-rose-50 border-rose-100",
    iconColor: "text-rose-400"
  },
  {
    id: 3,
    icon: Cloud,
    front: "Reason #3",
    back: "Because you make even boring days feel like an adventure.",
    color: "bg-sky-50 border-sky-100",
    iconColor: "text-sky-400"
  },
];

const ReasonsSection: React.FC = () => {
  return (
    <section className="w-full py-12">
      <motion.h2 
        className="text-3xl font-bold text-center text-rose-900 mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Why I Love You 💖
      </motion.h2>
      <motion.p 
        className="text-center text-slate-500 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        (Click a card to reveal)
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((reason) => (
          <FlipCard key={reason.id} reason={reason} />
        ))}
      </div>
    </section>
  );
};

interface FlipCardProps {
  reason: Reason;
}

const FlipCard: React.FC<FlipCardProps> = ({ reason }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = reason.icon;

  return (
    <div 
      className="h-64 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className={`absolute inset-0 backface-hidden ${reason.color} border-2 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <Icon size={48} className={`${reason.iconColor} mb-4`} />
          <h3 className="text-2xl font-handwriting text-slate-700">{reason.front}</h3>
          <p className="text-xs text-slate-400 mt-4 uppercase tracking-widest">Tap to see</p>
        </div>

        {/* Back */}
        <div 
          className={`absolute inset-0 backface-hidden bg-white border-2 border-white rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-lg`}
          style={{ 
            transform: 'rotateY(180deg)', 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden' 
          }}
        >
          <p className="text-slate-700 text-lg leading-relaxed font-medium">
            "{reason.back}"
          </p>
          <div className="mt-4 text-rose-400">
            <Heart size={20} fill="currentColor" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReasonsSection;