import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Coffee, Camera } from 'lucide-react';

const memories = [
  {
    id: 1,
    title: "Where It All Started",
    date: "Day 1",
    description: "The moment our paths crossed and everything changed for the better.",
    icon: Calendar,
    color: "bg-rose-100 text-rose-500",
  },
  {
    id: 2,
    title: "Our Favorite Spot",
    date: "That sunny afternoon",
    description: "Coffee, laughter, and conversations that I never wanted to end.",
    icon: Coffee,
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: 3,
    title: "Adventures Together",
    date: "Every single trip",
    description: "Getting lost, finding new places, and making the best memories.",
    icon: MapPin,
    color: "bg-sky-100 text-sky-500",
  },
  {
    id: 4,
    title: "Just Looking at You",
    date: "Always",
    description: "Sometimes I take a mental picture just to keep the moment forever.",
    icon: Camera,
    color: "bg-purple-100 text-purple-500",
  },
];

const MemoryLaneSection: React.FC = () => {
  return (
    <section className="w-full py-12">
      <motion.h2
        className="text-3xl font-bold text-center text-rose-900 mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Walking Down Memory Lane 💭
      </motion.h2>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-200 via-purple-200 to-rose-200 -z-10" />

        <div className="flex flex-col gap-12">
          {memories.map((memory, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={memory.id}
                className={`flex items-center gap-8 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Node (Mobile: Left, Desktop: Center) */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-rose-300 rounded-full transform -translate-x-1/2 z-10" />

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 w-full md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                  <div className={`p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/50 group`}>
                    <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${memory.color} ${isEven ? "md:ml-auto" : ""}`}>
                      <memory.icon size={20} />
                    </div>
                    <span className="block text-sm font-semibold text-rose-400 mb-1 tracking-wider uppercase">{memory.date}</span>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{memory.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{memory.description}</p>
                  </div>
                </div>
                
                {/* Spacer for the other side on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MemoryLaneSection;