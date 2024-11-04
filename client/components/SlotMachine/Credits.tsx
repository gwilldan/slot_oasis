import { Coins } from "lucide-react";

interface CreditsProps {
	amount: number;
}

export function Credits({ amount }: CreditsProps) {
	return (
		<div className="flex items-center gap-2 bg-yellow-600/20 px-4 py-2 rounded-full">
			<Coins className="w-5 h-5 text-yellow-400" />
			<span className="text-xl font-bold text-yellow-400">{amount}</span>
		</div>
	);
}
