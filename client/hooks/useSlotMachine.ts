"use client";

import { useState, useRef, useCallback } from "react";
import { useSound } from "./useSound";

const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "💎", "7️⃣", "🎰"];
const REEL_LENGTH = 20;
const SPIN_DURATION = 2000;
const REEL_STOP_DELAYS = [
	SPIN_DURATION,
	SPIN_DURATION + 1000,
	SPIN_DURATION + 2000,
];

export const WIN_COMBINATIONS = [
	{ symbols: ["🍒", "🍒", "🍒"], multiplier: 2 },
	{ symbols: ["🍋", "🍋", "🍋"], multiplier: 3 },
	{ symbols: ["🍊", "🍊", "🍊"], multiplier: 4 },
	{ symbols: ["🍇", "🍇", "🍇"], multiplier: 5 },
	{ symbols: ["💎", "💎", "💎"], multiplier: 10 },
	{ symbols: ["7️⃣", "7️⃣", "7️⃣"], multiplier: 20 },
	{ symbols: ["🎰", "🎰", "🎰"], multiplier: 50 },
] as const;

const generateReel = () =>
	Array.from(
		{ length: REEL_LENGTH },
		() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
	);

const generateInitialReels = () => [
	generateReel(),
	generateReel(),
	generateReel(),
];

const WEIGHTED_SYMBOLS = [
	...Array(15).fill("🍒"), // Common
	...Array(12).fill("🍋"),
	...Array(10).fill("🍊"),
	...Array(8).fill("🍇"),
	...Array(5).fill("💎"),
	...Array(3).fill("7️⃣"),
	...Array(2).fill("🎰"), // Rare
] as const;

export function useSlotMachine() {
	const [credits, setCredits] = useState(100);
	const [spinning, setSpinning] = useState(false);
	const [reels, setReels] = useState(generateInitialReels);
	const [win, setWin] = useState(0);
	const [sound, setSound] = useState(true);
	const [stoppedReels, setStoppedReels] = useState([false, false, false]);
	const spinTimeoutRef = useRef<NodeJS.Timeout[]>([]);
	const finalResultsRef = useRef<string[]>([]);

	const spinSound = useSound("/spin.mp3");
	const winSound = useSound("/win.mp3");

	const generateRandomResults = useCallback(() => {
		return Array(3)
			.fill(0)
			.map(
				() =>
					WEIGHTED_SYMBOLS[Math.floor(Math.random() * WEIGHTED_SYMBOLS.length)]
			);
	}, []);

	const checkWin = useCallback((results: string[]) => {
		return WIN_COMBINATIONS.find((combo) =>
			combo.symbols.every((symbol, i) => symbol === results[i])
		);
	}, []);

	const spin = useCallback(() => {
		if (credits < 10 || spinning) return;

		// Deduct credits
		setCredits((prev) => prev - 10);
		setSpinning(true);
		setWin(0);
		setStoppedReels([false, false, false]);

		if (sound) {
			spinSound.play();
		}
		finalResultsRef.current = generateRandomResults();

		setReels((prevReels) =>
			prevReels.map((reel, i) => {
				const newReel = [...generateReel()];
				const centerIndex = Math.floor(REEL_LENGTH / 2);
				newReel[centerIndex] = finalResultsRef.current[i];
				return newReel;
			})
		);

		spinTimeoutRef.current.forEach(clearTimeout);
		spinTimeoutRef.current = [];

		REEL_STOP_DELAYS.forEach((delay, index) => {
			const timeout = setTimeout(() => {
				setStoppedReels((prev) => {
					const updated = [...prev];
					updated[index] = true;
					return updated;
				});

				if (index === REEL_STOP_DELAYS.length - 1) {
					setSpinning(false);
					const winningCombo = checkWin(finalResultsRef.current);

					if (winningCombo) {
						const winAmount = 10 * winningCombo.multiplier;
						setWin(winAmount);
						setCredits((prev) => prev + winAmount);
						if (sound) {
							winSound.play();
						}
					}
				}
			}, delay);

			spinTimeoutRef.current.push(timeout);
		});
	}, [
		credits,
		spinning,
		sound,
		spinSound,
		winSound,
		generateRandomResults,
		checkWin,
	]);

	return {
		credits,
		spinning,
		reels,
		win,
		sound,
		setSound,
		spin,
		stoppedReels,
	};
}
