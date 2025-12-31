import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Sparkles, Sun, Smile, Music } from 'lucide-react';
import { Moment } from '../types';

const moments: Moment[] = [
  {
    id: '1',
    title: 'Pathooiii’s Smile',
    description: 'When you smile, my whole world lights up. It is my favorite sight.',
    icon: 'sun'
  },
  {
    id: '2',
    title: 'Diyoo’s Heart',
    description: 'You are the kindest soul I know. I am so lucky to be loved by you.',
    icon: 'heart'
  },
  {
    id: '3',
    title: 'Your Cuteness',
    description: 'You are just effortlessly adorable in everything you do.',
    icon: 'star'
  },
  {
    id: '4',
    title: 'Being with You',
    description: 'Every moment with you is a gift I cherish deeply.',
    icon: 'music'
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'sun': return <Sun className="text-amber-400" />;
    case 'heart': return <Smile className="text-rose-400" />;
    case 'music': return <Music className="text-violet-400" />;
    default: return <Sparkles className="text-sky-400" />;
  }
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const MomentsSection: React.FC = () => {
  return (
    <section className="w-full">
      <motion.h2
        className="text-3xl font-bold text-center text-rose-900 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Things I Love About You 🌸
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {moments.map((moment) => (
          <motion.div
            key={moment.id}
            variants={item}
            className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-full shadow-sm">
                {getIcon(moment.icon)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">{moment.title}</h3>
                <p className="text-slate-600 leading-relaxed">{moment.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default MomentsSection;