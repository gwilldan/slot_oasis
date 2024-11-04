"use client";

import { cn } from "@/lib/utils";

interface ReelDisplayProps {
  reels: string[][];
  spinning: boolean;
  stoppedReels: boolean[];
}

export function ReelDisplay({ reels, spinning, stoppedReels }: ReelDisplayProps) {
  return (
    <div className="flex gap-2 bg-black p-4 rounded-lg shadow-inner mb-6">
      {reels.map((reel, i) => (
        <div key={i} className="relative w-24 h-24 overflow-hidden">
          <div
            className={cn(
              "absolute w-full transition-all duration-500",
              spinning && !stoppedReels[i] && "animate-spin-reel",
              spinning && !stoppedReels[i] && `reel-${i + 1}`
            )}
            style={{
              transform: !spinning || stoppedReels[i] ? "translateY(-50%)" : undefined,
            }}
          >
            {[...reel, ...reel].map((symbol, j) => (
              <div
                key={`${i}-${j}-${symbol}`}
                className="flex items-center justify-center h-24 text-4xl"
              >
                {symbol}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}