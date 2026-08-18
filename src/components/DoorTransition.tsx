import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface DoorTransitionProps {
  hasPlayed?: boolean;
  children: React.ReactNode;
  onComplete?: () => void;
}

export const DoorTransition: React.FC<DoorTransitionProps> = ({ children, onComplete, hasPlayed = false }) => {
  if (hasPlayed) {
    return <>{children}</>;
  }

  const [isRemoved, setIsRemoved] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const leftDoorControls = useAnimation();
  const rightDoorControls = useAnimation();
  const latchFadeControls = useAnimation();
  const scaleControls = useAnimation();
  
  const x = useMotionValue(0);
  
  const unlatchSoundRef = useRef<HTMLAudioElement>(null);
  const creakSoundRef = useRef<HTMLAudioElement>(null);

  // When isUnlocked becomes true, start the sequence
  useEffect(() => {
    let isMounted = true;

    if (isUnlocked) {
      const openSequence = async () => {
        // STATE 1: Sound
        if (unlatchSoundRef.current) {
          unlatchSoundRef.current.play().catch(() => {});
        }

        if (!isMounted) return;

        // STATE 2: Heavy Swing
        if (creakSoundRef.current) {
          creakSoundRef.current.play().catch(() => {});
        }

        // Fade out latch as doors swing open
        latchFadeControls.start({ opacity: 0, transition: { duration: 0.5 } });

        // Doors swing with heavy inertia curve
        const doorTransition = { duration: 2.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] };
        
        leftDoorControls.start({ rotateY: -110, transition: doorTransition });
        rightDoorControls.start({ rotateY: 110, transition: doorTransition });
        
        // Wait for door swing to finish
        await new Promise(resolve => setTimeout(resolve, 2200));

        if (!isMounted) return;

        // STATE 3: Reveal
        setIsRemoved(true);
        if (onComplete) onComplete();
      };
      
      // small delay to let the latch slide finish before swinging
      setTimeout(openSequence, 200); 
    }

    return () => {
      isMounted = false;
    };
  }, [isUnlocked, leftDoorControls, rightDoorControls, latchFadeControls, scaleControls, onComplete]);

  const handleDragEnd = () => {
    if (x.get() >= 100) {
      animate(x, 140, { duration: 0.2, ease: "easeOut" });
      setIsUnlocked(true);
    } else {
      animate(x, 0, { type: 'spring', bounce: 0.4 });
    }
  };

  return (
    <div className={`relative min-h-screen w-full bg-stone-950 ${!isRemoved ? 'overflow-hidden h-screen' : ''}`}>
      {/* Audio Hooks (src is empty for later local assets) */}
      <audio ref={unlatchSoundRef} preload="auto" />
      <audio ref={creakSoundRef} preload="auto" />

      {/* Main Content */}
      <motion.div
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>

      {/* 3D Door Wrapper with high perspective for realistic swing */}
      <AnimatePresence onExitComplete={() => setIsRemoved(true)}>
        {!isRemoved && (
          <div className="fixed inset-0 z-[9999] pointer-events-none flex perspective-[2000px]">
            
            {/* Instruction Text */}
            <AnimatePresence>
              {!isUnlocked && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-1/4 left-1/2 -translate-x-1/2 z-[10000] flex flex-col items-center gap-4 pointer-events-none"
                >
                  <span className="text-white/80 font-outfit uppercase tracking-[0.3em] text-sm md:text-base animate-pulse whitespace-nowrap">
                    Slide to open the door
                  </span>
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-6 h-6 text-brass-500/80" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Left Door */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={leftDoorControls}
              style={{ willChange: 'transform', transformOrigin: 'left' }}
              className="relative w-1/2 h-full pointer-events-auto border-r-[4px] border-black/90 shadow-[inset_-40px_0_80px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,0,0,0.5)] bg-[#2a1b12]"
            >
              {/* Wooden Texture */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-luminosity"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
              
              {/* Planks styling */}
              <div className="absolute inset-0 flex">
                <div className="flex-1 border-r border-black/40 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.3)]"></div>
                <div className="flex-1 border-r border-black/40 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.3)]"></div>
                <div className="flex-1 border-r border-black/40 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.3)]"></div>
                <div className="flex-1 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.3)]"></div>
              </div>

              {/* Door Bevel */}
              <div className="absolute inset-0 border-[8px] border-[#3e2717] shadow-[inset_0_0_20px_rgba(0,0,0,1)] opacity-80" />

              {/* Latch mechanism on left door (The hook/loop) */}
              <motion.div 
                animate={latchFadeControls}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-[1px]"
              >
                {/* Base Plate for loop */}
                <div className="w-16 h-32 bg-gradient-to-br from-[#4a3b2c] via-[#2a2016] to-[#1a120c] border border-[#7d6346]/40 rounded-l-md shadow-[-6px_6px_20px_rgba(0,0,0,0.9),inset_-1px_1px_2px_rgba(255,255,255,0.15)] flex items-center justify-end pr-3 relative">
                  {/* Heavy Screws */}
                  <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-gradient-to-br from-[#2a2016] to-black shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),_1px_1px_2px_rgba(0,0,0,0.8)]" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-gradient-to-br from-[#2a2016] to-black shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),_1px_1px_2px_rgba(0,0,0,0.8)]" />
                  
                  {/* The Loop (Receives the sliding rod) */}
                  <div className="w-8 h-16 border-l-[8px] border-y-[8px] border-[#5c4a37] rounded-l-lg shadow-[inset_-3px_0_10px_rgba(0,0,0,0.9),_3px_3px_10px_rgba(0,0,0,0.6)] bg-black/60" />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Door */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={rightDoorControls}
              style={{ willChange: 'transform', transformOrigin: 'right' }}
              className="relative w-1/2 h-full pointer-events-auto border-l-[4px] border-black/90 shadow-[inset_40px_0_80px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,0,0,0.5)] bg-[#2a1b12]"
            >
              {/* Wooden Texture */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-luminosity"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop")', transform: 'scaleX(-1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-black/80" />
              
              {/* Planks styling */}
              <div className="absolute inset-0 flex">
                <div className="flex-1 shadow-[inset_2px_0_5px_rgba(0,0,0,0.3)]"></div>
                <div className="flex-1 border-l border-black/40 shadow-[inset_2px_0_5px_rgba(0,0,0,0.3)]"></div>
                <div className="flex-1 border-l border-black/40 shadow-[inset_2px_0_5px_rgba(0,0,0,0.3)]"></div>
                <div className="flex-1 border-l border-black/40 shadow-[inset_2px_0_5px_rgba(0,0,0,0.3)]"></div>
              </div>

              {/* Door Bevel */}
              <div className="absolute inset-0 border-[8px] border-[#3e2717] shadow-[inset_0_0_20px_rgba(0,0,0,1)] opacity-80" />

              {/* Latch mechanism on right door (The sliding rod) */}
              <motion.div 
                animate={latchFadeControls}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 -translate-x-[1px]"
              >
                {/* Base Plate */}
                <div className="w-24 h-32 bg-gradient-to-br from-[#4a3b2c] via-[#2a2016] to-[#1a120c] border border-[#7d6346]/40 rounded-r-md shadow-[6px_6px_20px_rgba(0,0,0,0.9),inset_1px_1px_2px_rgba(255,255,255,0.15)] flex items-center pl-4 relative">
                  
                  {/* Heavy Screws */}
                  <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-gradient-to-br from-[#2a2016] to-black shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),_1px_1px_2px_rgba(0,0,0,0.8)]" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-gradient-to-br from-[#2a2016] to-black shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),_1px_1px_2px_rgba(0,0,0,0.8)]" />
                  
                  {/* Sliding Rod (Interactive) */}
                  <motion.div
                    style={{ x }}
                    drag={!isUnlocked ? "x" : false}
                    dragConstraints={{ left: 0, right: 140 }}
                    dragElastic={0.05}
                    onDragEnd={handleDragEnd}
                    className="w-48 h-10 bg-gradient-to-b from-[#b59a72] via-[#7d6346] to-[#3a2c1e] border border-white/10 rounded-sm shadow-[0_8px_20px_rgba(0,0,0,0.9)] z-30 flex items-center justify-end pr-3 absolute -left-16 cursor-grab active:cursor-grabbing touch-none"
                  >
                     {/* Handle Grip */}
                     <div className="w-6 h-16 bg-gradient-to-br from-[#a8906f] to-[#4a3b2c] rounded-sm shadow-2xl border border-white/20 pointer-events-none" />
                  </motion.div>
                  
                  {/* Rod Holders (Securing the rod to the base plate) */}
                  <div className="w-8 h-16 bg-gradient-to-r from-[#1a120c] to-[#3a2c1e] shadow-inner rounded-sm relative z-40 ml-2 border border-black/80 flex flex-col justify-between py-1 pointer-events-none">
                     <div className="w-full h-1 bg-black/50" />
                     <div className="w-full h-1 bg-black/50" />
                  </div>
                  <div className="w-8 h-16 bg-gradient-to-r from-[#1a120c] to-[#3a2c1e] shadow-inner rounded-sm relative z-40 ml-8 border border-black/80 flex flex-col justify-between py-1 pointer-events-none">
                     <div className="w-full h-1 bg-black/50" />
                     <div className="w-full h-1 bg-black/50" />
                  </div>
                  
                </div>
              </motion.div>
            </motion.div>
            
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

