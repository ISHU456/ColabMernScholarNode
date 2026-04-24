import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const PageLoader = ({ message = "Synchronizing Node" }) => {
  return (
    <div className="flex h-[60vh] min-h-[450px] w-full flex-col items-center justify-center bg-transparent relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-[100px]"
        />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Premium Geometric Loader */}
        <div className="relative w-32 h-32 mb-12">
          {/* Animated Orbit Rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 2 + i, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 0.2
              }}
              className="absolute inset-0 border-2 border-transparent border-t-indigo-500/40 rounded-full"
              style={{ padding: i * 12 }}
            />
          ))}

          {/* Liquid Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [0.9, 1.1, 0.9],
                borderRadius: ["35%", "50%", "35%"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 bg-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              <Star size={24} className="text-white fill-white/20 relative z-10" />
            </motion.div>
          </div>

          {/* Particle Effects */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [-20, -100], 
                x: [0, (i % 2 === 0 ? 30 : -30)],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.4,
                ease: "easeOut"
              }}
              className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full blur-[1px]"
            />
          ))}
        </div>

        {/* Premium Typography */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <motion.h2 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[11px] font-bold uppercase tracking-[0.6em] text-slate-500 dark:text-slate-400"
            >
              {message}
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            />
          </div>

          {/* Connectivity Status Dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  backgroundColor: ["#6366f1", "#a855f7", "#6366f1"],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                className="w-1.5 h-1.5 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
