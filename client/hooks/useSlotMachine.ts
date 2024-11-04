"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "💎", "7️⃣", "🎰"];
const REEL_LENGTH = 20;
const SPIN_DURATION = 2000;
const REEL_STOP_DELAYS = [SPIN_DURATION, SPIN_DURATION + 1000, SPIN_DURATION + 2000];
const WIN_COMBINATIONS = [
  { symbols: ["🍒", "🍒", "🍒"], multiplier: 2 },
  { symbols: ["🍋", "🍋", "🍋"], multiplier: 3 },
  { symbols: ["🍊", "🍊", "🍊"], multiplier: 4 },
  { symbols: ["🍇", "🍇", "🍇"], multiplier: 5 },
  { symbols: ["💎", "💎", "💎"], multiplier: 10 },
  { symbols: ["7️⃣", "7️⃣", "7️⃣"], multiplier: 20 },
  { symbols: ["🎰", "🎰", "🎰"], multiplier: 50 },
];

const generateReel = () => 
  Array.from({ length: REEL_LENGTH }, () => 
    SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
  );

const generateInitialReels = () => [
  generateReel(),
  generateReel(),
  generateReel(),
];

export function useSlotMachine() {
  const [credits, setCredits] = useState(100);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState(generateInitialReels);
  const [win, setWin] = useState(0);
  const [sound, setSound] = useState(true);
  const [stoppedReels, setStoppedReels] = useState([false, false, false]);
  const spinSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);
  const spinTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      spinSound.current = new Audio("/spin.mp3");
      winSound.current = new Audio("/win.mp3");
    }
    return () => {
      spinTimeoutRef.current.forEach(clearTimeout);
    };
  }, []);

  const spin = useCallback(() => {
    if (credits < 10 || spinning) return;
    setCredits(prev => prev - 10);
    setSpinning(true);
    setWin(0);
    setStoppedReels([false, false, false]);
    
    if (sound && spinSound.current) {
      spinSound.current.currentTime = 0;
      spinSound.current.play().catch(() => {});
    }

    const newResults = SYMBOLS.map(() => 
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    );
    
    const newReels = reels.map((reel, i) => {
      const newReel = [...reel];
      newReel[Math.floor(REEL_LENGTH / 2)] = newResults[i];
      return newReel;
    });

    setReels(newReels);

    // Clear any existing timeouts
    spinTimeoutRef.current.forEach(clearTimeout);
    spinTimeoutRef.current = [];

    // Set up staggered stopping of reels
    REEL_STOP_DELAYS.forEach((delay, index) => {
      const timeout = setTimeout(() => {
        setStoppedReels(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });

        // Check for win after last reel stops
        if (index === REEL_STOP_DELAYS.length - 1) {
          setSpinning(false);
          const winningCombo = WIN_COMBINATIONS.find(combo => 
            combo.symbols.every((symbol, i) => symbol === newResults[i])
          );

          if (winningCombo) {
            const winAmount = 10 * winningCombo.multiplier;
            setWin(winAmount);
            setCredits(prev => prev + winAmount);
            if (sound && winSound.current) {
              winSound.current.currentTime = 0;
              winSound.current.play().catch(() => {});
            }
          }
        }
      }, delay);
      
      spinTimeoutRef.current.push(timeout);
    });
  }, [credits, spinning, reels, sound]);

  return {
    credits,
    spinning,
    reels,
    win,
    sound,
    setSound,
    spin,
    stoppedReels
  };
}