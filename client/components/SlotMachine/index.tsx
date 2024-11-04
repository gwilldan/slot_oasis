"use client";

import { useState } from "react";
import { Coins, Volume2, VolumeX } from "lucide-react";
import { ReelDisplay } from "./ReelDisplay";
import { WinningCombinations } from "./WinningCombinations";
import { SpinButton } from "./SpinButton";
import { useSlotMachine } from "@/hooks/useSlotMachine";

export default function SlotMachine() {
	const { credits, spinning, reels, win, sound, setSound, spin, stoppedReels } =
		useSlotMachine();

	return (
		<>
			<div className="mb-8 flex items-center gap-4">
				<div className="flex items-center gap-2 bg-yellow-600/20 px-4 py-2 rounded-full">
					<Coins className="w-5 h-5 text-yellow-400" />
					<span className="text-xl font-bold text-yellow-400">{credits}</span>
				</div>
				<button
					onClick={() => setSound(!sound)}
					className="p-2 rounded-full hover:bg-white/10 transition-colors">
					{sound ? (
						<Volume2 className="w-5 h-5" />
					) : (
						<VolumeX className="w-5 h-5" />
					)}
				</button>
			</div>

			<div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 p-4 rounded-xl shadow-2xl border border-zinc-700 max-w-[350px]">
				<ReelDisplay
					reels={reels}
					spinning={spinning}
					stoppedReels={stoppedReels}
				/>
				<SpinButton
					onSpin={spin}
					disabled={spinning || credits < 10}
					spinning={spinning}
				/>
				{win > 0 && (
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black font-bold text-2xl px-6 py-3 rounded-full animate-bounce shadow-lg">
						Win: {win} credits!
					</div>
				)}
			</div>

			<WinningCombinations />
		</>
	);
}