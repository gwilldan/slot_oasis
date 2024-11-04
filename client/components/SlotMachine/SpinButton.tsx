"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SpinButtonProps {
	onSpin: () => void;
	disabled: boolean;
	spinning: boolean;
}

export function SpinButton({ onSpin, disabled, spinning }: SpinButtonProps) {
	return (
		<Button
			size="lg"
			className={cn(
				"w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-lg shadow-lg transition-all",
				disabled && "opacity-50 cursor-not-allowed"
			)}
			onClick={onSpin}
			disabled={disabled}>
			{spinning ? "Spinning..." : "Spin (10 credits)"}
		</Button>
	);
}
