import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface Photo {
  id: number;
  url: string;
  caption: string;
  rotation: number;
  delay: number;
}

const photos: Photo[] = [
  {
    id: 1,
    url: "https://i.ibb.co/5hbcVmFb/IMG-20251231-223445-206.jpg",
    caption: "Magic in the air",
    rotation: -2,
    delay: 0
  },
  {
    id: 2,
    url: "https://i.ibb.co/qLt1WnQJ/IMG-20251231-223418-801.jpg",
    caption: "The prettiest smile",
    rotation: 3,
    delay: 0.2
  },
  {
    id: 3,
    url: "https://i.ibb.co/fVpcFsHX/IMG-20251231-223500-959.jpg",
    caption: "Adventures with you",
    rotation: -3,
    delay: 0.4
  },
  {
    id: 4,
    url: "https://i.ibb.co/0V6ST7Hg/IMG-20251231-223410-008.jpg",
    caption: "Flowers for you",
    rotation: 2,
    delay: 0.6
  }
];

const TiltCard: React.FC<{ photo: Photo }> = ({ photo }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Calculate rotation based on mouse position
  // Range is small (±10 deg) for subtle effect
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]); 
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    // Calculate percentage from center (-0.5 to 0.5)
    const xPct = clientX / width - 0.5;
    const yPct = clientY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotate: photo.rotation, // Apply the base rotation here
        transition: { 
          type: "spring", 
          stiffness: 100, 
          damping: 20, 
          delay: photo.delay 
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white p-4 pb-12 rounded-sm shadow-md border border-slate-100 relative group cursor-pointer"
    >
        {/* Shadow enhancement on hover */}
        <motion.div 
            style={{ transform: "translateZ(-50px)" }} 
            className="absolute inset-0 bg-black/20 blur-xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10 translate-y-10" 
        />

        {/* Tape effect */}
        <div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm border-l border-r border-white/50 rotate-[-2deg] opacity-60 z-10 shadow-sm"
            style={{ transform: "translateZ(20px)" }}
        ></div>

        <div 
            className="aspect-[4/3] overflow-hidden bg-slate-100 mb-4"
            style={{ transform: "translateZ(10px)" }}
        >
            <motion.img 
            src={photo.url} 
            alt={photo.caption}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            />
        </div>
        
        <div 
            className="absolute bottom-4 left-0 right-0 text-center"
            style={{ transform: "translateZ(30px)" }}
        >
            <p className="font-handwriting text-2xl text-slate-700">{photo.caption}</p>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-sm bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
    </motion.div>
  );
};

const PhotoGallerySection: React.FC = () => {
  return (
    <section className="w-full py-12 perspective-1000">
      <motion.h2
        className="text-3xl font-bold text-center text-rose-900 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Captured Moments 📸
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 px-4">
        {photos.map((photo) => (
          <TiltCard key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
};

export default PhotoGallerySection;
