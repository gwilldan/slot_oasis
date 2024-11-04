"use client";

import { useEffect, useRef } from "react";

export function useSound(soundUrl: string) {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			audioRef.current = new Audio(soundUrl);
		}
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		};
	}, [soundUrl]);

	const play = () => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0;
			audioRef.current.play().catch(() => {});
		}
	};

	return { play };
}
