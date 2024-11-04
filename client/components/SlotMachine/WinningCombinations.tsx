export function WinningCombinations() {
  const combinations = [
    { symbols: ["🍒", "🍒", "🍒"], multiplier: 2 },
    { symbols: ["🍋", "🍋", "🍋"], multiplier: 3 },
    { symbols: ["🍊", "🍊", "🍊"], multiplier: 4 },
    { symbols: ["🍇", "🍇", "🍇"], multiplier: 5 },
    { symbols: ["💎", "💎", "💎"], multiplier: 10 },
    { symbols: ["7️⃣", "7️⃣", "7️⃣"], multiplier: 20 },
    { symbols: ["🎰", "🎰", "🎰"], multiplier: 50 },
  ];

  return (
    <div className="mt-8 text-zinc-400 text-sm">
      <h3 className="font-semibold mb-2 text-center">Winning Combinations</h3>
      <div className="grid grid-cols-2 gap-2">
        {combinations.map((combo, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex">
              {combo.symbols.map((symbol, j) => (
                <span key={j} className="text-lg">{symbol}</span>
              ))}
            </div>
            <span>× {combo.multiplier}</span>
          </div>
        ))}
      </div>
    </div>
  );
}