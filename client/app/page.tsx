"use client";

import dynamic from "next/dynamic";

const SlotMachine = dynamic(() => import("@/components/SlotMachine"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-center p-4">
      <SlotMachine />
    </main>
  );
}