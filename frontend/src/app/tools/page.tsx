'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  Calculator, 
  Percent, 
  DollarSign, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Zap 
} from 'lucide-react';

export default function ToolsPage() {
  // Position Size State
  const [balance, setBalance] = useState<number>(25000);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [stopLossPips, setStopLossPips] = useState<number>(30);
  const [pipValue, setPipValue] = useState<number>(10); // Standard lot

  // Risk / Reward State
  const [rrEntry, setRrEntry] = useState<number>(1.085);
  const [rrTp, setRrTp] = useState<number>(1.095);
  const [rrSl, setRrSl] = useState<number>(1.081);

  // Position Size Calculation
  const riskAmount = (balance * riskPercent) / 100;
  const recommendedLotSize = stopLossPips > 0 ? (riskAmount / (stopLossPips * pipValue)).toFixed(2) : '0.00';

  // RR Calculation
  const rewardPips = Math.abs(rrTp - rrEntry);
  const riskPips = Math.abs(rrEntry - rrSl);
  const rrRatio = riskPips > 0 ? (rewardPips / riskPips).toFixed(2) : '0.00';

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Title */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#007D6D]/10 text-[#007D6D] text-xs font-bold uppercase tracking-wider mb-3">
          <Calculator className="w-3.5 h-3.5" /> Quantitative Utilities
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2C221E] tracking-tight">
          Professional Trading Calculators & Tools
        </h1>
        <p className="mt-2 text-base text-[#7E6F68]">
          Eliminate guesswork from your risk allocation. Model exact lot sizes, risk-to-reward ratios, and margin requirements before executing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Tool 1: Position Size Calculator */}
        <div className="bg-white rounded-3xl border border-[#E5DDD3] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DDD3]">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#007D6D]/10 text-[#007D6D]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="font-extrabold text-[#2C221E] text-lg">
                Position Size & Risk Calculator
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#007D6D] bg-[#007D6D]/10 px-2.5 py-1 rounded-lg">
              Standard Lots
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#4E3E39] block mb-1">
                Account Balance ($ USD)
              </label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] font-mono text-sm text-[#2C221E] focus:outline-none focus:border-[#007D6D]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#4E3E39] mb-1">
                <span>Risk per Trade</span>
                <span className="text-[#007D6D] font-mono font-bold">{riskPercent}%</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="5.0"
                step="0.25"
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
                className="w-full accent-[#007D6D] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#4E3E39] block mb-1">
                  Stop Loss Distance (Pips/Pts)
                </label>
                <input
                  type="number"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] font-mono text-sm text-[#2C221E] focus:outline-none focus:border-[#007D6D]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#4E3E39] block mb-1">
                  Pip Value per Lot ($)
                </label>
                <input
                  type="number"
                  value={pipValue}
                  onChange={(e) => setPipValue(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] font-mono text-sm text-[#2C221E] focus:outline-none focus:border-[#007D6D]"
                />
              </div>
            </div>

            {/* Result Box */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7E6F68]">Total Dollar Risk:</span>
                <span className="font-mono font-bold text-[#C88A75] text-base">
                  -${riskAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7E6F68]">Optimal Position Size:</span>
                <span className="font-mono font-extrabold text-[#007D6D] text-2xl">
                  {recommendedLotSize} Lots
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tool 2: Risk-to-Reward Calculator */}
        <div className="bg-white rounded-3xl border border-[#E5DDD3] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DDD3]">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#8E9EB8]/20 text-[#71839F]">
                <Percent className="w-5 h-5" />
              </div>
              <h2 className="font-extrabold text-[#2C221E] text-lg">
                Risk-to-Reward (R:R) Analyzer
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#4E3E39] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E5DDD3]">
              Ratio 1 : {rrRatio}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#4E3E39] block mb-1">
                Entry Price Level
              </label>
              <input
                type="number"
                step="0.0001"
                value={rrEntry}
                onChange={(e) => setRrEntry(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] font-mono text-sm text-[#2C221E] focus:outline-none focus:border-[#007D6D]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#4E3E39] block mb-1">
                Take Profit Target (TP)
              </label>
              <input
                type="number"
                step="0.0001"
                value={rrTp}
                onChange={(e) => setRrTp(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] font-mono text-sm text-[#007D6D] focus:outline-none focus:border-[#007D6D]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#4E3E39] block mb-1">
                Stop Loss Invalidation (SL)
              </label>
              <input
                type="number"
                step="0.0001"
                value={rrSl}
                onChange={(e) => setRrSl(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] font-mono text-sm text-[#C88A75] focus:outline-none focus:border-[#C88A75]"
              />
            </div>

            {/* Result Box */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7E6F68]">Projected Confluence:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-xs ${
                    Number(rrRatio) >= 2.0
                      ? 'bg-[#007D6D]/15 text-[#007D6D]'
                      : 'bg-[#C88A75]/20 text-[#C88A75]'
                  }`}
                >
                  {Number(rrRatio) >= 2.0 ? 'Optimal Setup (>= 1:2.0)' : 'Sub-Optimal Setup (< 1:2.0)'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7E6F68]">Calculated Risk to Reward:</span>
                <span className="font-mono font-extrabold text-[#2C221E] text-2xl">
                  1 : {rrRatio}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
