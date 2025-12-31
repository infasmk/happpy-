import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plane, Star, Camera, Utensils, Music, Heart, Home, Map } from 'lucide-react';

const goals = [
  { id: 1, text: "Build a massive cozy blanket fort", icon: Home },
  { id: 2, text: "Late night drive & karaoke session", icon: Music },
  { id: 3, text: "Picnic under the stars", icon: Star },
  { id: 4, text: "Bake cookies (and eat the dough)", icon: Utensils },
  { id: 5, text: "Fly somewhere spontaneous", icon: Plane },
  { id: 6, text: "Recreate our very first date", icon: Camera },
  { id: 7, text: "Get lost in a new city together", icon: Map },
  { id: 8, text: "Grow old and happy together", icon: Heart },
];

const BucketListSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-4">
      <motion.div
        className="max-w-2xl mx-auto bg-white rotate-1 shadow-xl border border-rose-100 rounded-lg p-8 md:p-12 relative overflow-hidden"
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 1 }}
        viewport={{ once: true }}
      >
        {/* Paper lines decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '100% 2rem' }}>
        </div>

        {/* Tape decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-rose-200/50 -rotate-2 transform -translate-y-4 backdrop-blur-sm"></div>

        <motion.h2 
          className="text-3xl font-handwriting text-center text-rose-800 mb-8 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Bucket List 📝
        </motion.h2>

        <div className="space-y-4 relative z-10">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              className="flex items-center gap-4 p-3 hover:bg-rose-50 rounded-lg transition-colors group cursor-default"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative">
                <div className="w-8 h-8 border-2 border-rose-300 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:border-rose-400 transition-colors">
                   <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + (index * 0.1), type: "spring" }}
                   >
                     <Check size={18} className="text-rose-500" />
                   </motion.div>
                </div>
              </div>
              
              <span className="flex-1 font-sans text-slate-700 text-lg group-hover:text-rose-700 transition-colors">
                {goal.text}
              </span>
              
              <goal.icon size={20} className="text-rose-300 group-hover:text-rose-500 transition-colors" />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="font-handwriting text-3xl text-rose-300/80 rotate-2">...forever to go.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default BucketListSection;