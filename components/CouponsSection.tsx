import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Heart, Utensils, Film, Coffee, Moon, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const coupons = [
  { 
    id: 1, 
    title: "Dinner Date", 
    desc: "My treat, your choice of place! 🍝", 
    icon: Utensils, 
    color: "bg-rose-50 border-rose-200 text-rose-600",
    dashed: "border-rose-300"
  },
  { 
    id: 2, 
    title: "Movie Night", 
    desc: "You pick the movie & the snacks. 🍿", 
    icon: Film, 
    color: "bg-violet-50 border-violet-200 text-violet-600",
    dashed: "border-violet-300"
  },
  { 
    id: 3, 
    title: "Breakfast in Bed", 
    desc: "Pancakes, coffee, and lazy vibes. 🥞", 
    icon: Coffee, 
    color: "bg-amber-50 border-amber-200 text-amber-600",
    dashed: "border-amber-300"
  },
  { 
    id: 4, 
    title: "Late Night Drive", 
    desc: "Music, stars, and just us. 🌙", 
    icon: Moon, 
    color: "bg-indigo-50 border-indigo-200 text-indigo-600",
    dashed: "border-indigo-300"
  },
  { 
    id: 5, 
    title: "Unlimited Hugs", 
    desc: "Redeemable anytime, anywhere. 🫂", 
    icon: Heart, 
    color: "bg-pink-50 border-pink-200 text-pink-600",
    dashed: "border-pink-300"
  },
];

const CouponsSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <motion.div
             initial={{ scale: 0 }}
             whileInView={{ scale: 1 }}
             transition={{ type: 'spring', stiffness: 200, damping: 15 }}
             className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Ticket className="text-rose-500 w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-bold text-rose-900 mb-2">A Little Something For You 🎟️</h2>
          <p className="text-slate-500">Tap a coupon to redeem it!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon, index) => (
            <CouponCard key={coupon.id} coupon={coupon} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

interface CouponCardProps {
  coupon: typeof coupons[0];
  index: number;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon, index }) => {
  const [redeemed, setRedeemed] = useState(false);

  const handleRedeem = (e: React.MouseEvent) => {
    if (redeemed) return;
    setRedeemed(true);
    
    // Get click coordinates for confetti origin
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: ['#ffe4e6', '#fda4af']
    });
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border-2 ${coupon.color} cursor-pointer transition-all duration-300`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03, rotate: 1 }}
      onClick={handleRedeem}
    >
      <div className="flex flex-col h-full p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <coupon.icon size={28} />
          <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-white/50 border ${coupon.color}`}>
            Valid Forever
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{coupon.title}</h3>
        <p className="text-sm opacity-80 mb-4">{coupon.desc}</p>

        {/* Perforation Line visual */}
        <div className={`w-full border-t-2 border-dashed ${coupon.dashed} my-2 opacity-50`}></div>

        <div className="mt-auto pt-2 flex justify-between items-center">
          <span className="text-xs font-mono opacity-60">NO. 00{coupon.id}</span>
          <span className={`text-xs font-bold ${redeemed ? "text-slate-400" : "underline"}`}>
            {redeemed ? "REDEEMED" : "TAP TO REDEEM"}
          </span>
        </div>
      </div>

      {/* Redeemed Overlay */}
      {redeemed && (
        <motion.div 
          className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-[1px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 2, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: -15, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="border-4 border-rose-500 text-rose-500 px-4 py-2 rounded-lg font-black text-xl tracking-widest uppercase transform -rotate-12 bg-white/50 shadow-sm"
          >
            Redeemed
          </motion.div>
        </motion.div>
      )}

      {/* Decorative Circles mimicking ticket holes */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-r border-slate-100" />
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-l border-slate-100" />
    </motion.div>
  );
};

export default CouponsSection;