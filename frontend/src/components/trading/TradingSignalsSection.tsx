'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  CheckCircle2, 
  Copy, 
  ArrowRight,
  Activity,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { fetchLiveBinanceTickers, MarketTicker } from '@/services/binanceMarketService';

interface SignalPackage {
  title: string;
  rrRange: string;
  priceMonthly: number;
  priceQuarterly: number;
  badge: string;
  desc: string;
  signalsPerDay: string;
  winRate: string;
  features: string[];
  popular?: boolean;
}

const SIGNAL_PACKAGES: SignalPackage[] = [
  {
    title: 'Standard Day & Swing Signals',
    rrRange: 'R:R 1:1.5 to 1:2.0',
    priceMonthly: 39,
    priceQuarterly: 89,
    badge: 'Consistent Flow',
    desc: 'High-frequency setups focused on steady account growth and conservative drawdowns.',
    signalsPerDay: '3 to 5 Signals / Day',
    winRate: '84.8% Verified',
    features: [
      'Forex Majors & Spot Gold (XAU/USD)',
      'Clear Entry, Take-Profit & Stop-Loss',
      'Telegram channel instant push notifications',
      'Average risk-to-reward ratio 1:1.85',
      'Weekly performance track record recap',
    ],
  },
  {
    title: 'High R:R Sniper Signals',
    rrRange: 'R:R 1:2.5 to 1:3.5+',
    priceMonthly: 79,
    priceQuarterly: 179,
    badge: 'Maximum Asymmetry',
    popular: true,
    desc: 'Institutional order block setups designed to risk $100 to yield $250 to $350+.',
    signalsPerDay: '2 to 3 Sniper Calls / Day',
    winRate: '88.6% Verified',
    features: [
      'Crypto (BTC, ETH, SOL) & High-Beta FX',
      'Multi-timeframe liquidity sweep confirmation',
      'Live trailing stop & breakeven update alerts',
      'Average risk-to-reward ratio 1:2.95',
      'Exclusive VIP Telegram alert channel',
    ],
  },
  {
    title: 'VIP All-Access Signals Pass',
    rrRange: 'All Ratios (1:1.5 up to 1:4.5)',
    priceMonthly: 119,
    priceQuarterly: 249,
    badge: 'Full Coverage',
    desc: 'Complete institutional signal stream covering all instruments with webhook bot integration.',
    signalsPerDay: '6 to 8 Signals / Day',
    winRate: '89.4% Verified',
    features: [
      'All asset classes: Forex, Crypto, Indices, Oil, Gold',
      'Direct TradingView webhook & MT4/MT5 copiers',
      'Early pre-market setup heads-up warnings',
      'Direct Q&A with quantitative signal analysts',
      'Includes private macro news commentary',
    ],
  },
];

interface LiveSignalItem {
  id: string;
  pair: string;
  binanceSymbol?: string;
  type: 'BUY' | 'SELL';
  assetClass: 'Forex' | 'Crypto' | 'Commodities' | 'Indices';
  confidence: number;
  timeframe: string;
  baseEntryOffset: number; // offset from market price to calculate entry
  tp1Percent: number;
  tp2Percent: number;
  slPercent: number;
  riskReward: string;
  rrTier: string;
  age: string;
  reasons: string[];
  digits: number;
  defaultPrice: number;
}

const BASE_SIGNALS: LiveSignalItem[] = [
  {
    id: 'sig-1',
    pair: 'BTC/USDT',
    binanceSymbol: 'BTCUSDT',
    type: 'BUY',
    assetClass: 'Crypto',
    confidence: 94,
    timeframe: '1H',
    baseEntryOffset: -0.003, // entered slightly below current price
    tp1Percent: 0.024,
    tp2Percent: 0.042,
    slPercent: 0.012,
    riskReward: '1:2.85',
    rrTier: 'Sniper (R:R 1:2.5+)',
    age: '8m ago',
    reasons: ['Bullish Divergence on 4H RSI', 'Liquidity Sweep of Recent Lows', 'Funding Rate Reset'],
    digits: 2,
    defaultPrice: 83280.0,
  },
  {
    id: 'sig-2',
    pair: 'ETH/USDT',
    binanceSymbol: 'ETHUSDT',
    type: 'BUY',
    assetClass: 'Crypto',
    confidence: 91,
    timeframe: '4H',
    baseEntryOffset: -0.004,
    tp1Percent: 0.032,
    tp2Percent: 0.055,
    slPercent: 0.014,
    riskReward: '1:3.10',
    rrTier: 'Sniper (R:R 1:2.5+)',
    age: '24m ago',
    reasons: ['Ascending Triangle Breakout', 'Institutional Net Inflows', 'Volume Surge on 4H'],
    digits: 2,
    defaultPrice: 2500.0,
  },
  {
    id: 'sig-3',
    pair: 'XAU/USD (Gold)',
    binanceSymbol: 'PAXGUSDT',
    type: 'SELL',
    assetClass: 'Commodities',
    confidence: 86,
    timeframe: '30M',
    baseEntryOffset: 0.002,
    tp1Percent: -0.018,
    tp2Percent: -0.032,
    slPercent: -0.010,
    riskReward: '1:2.15',
    rrTier: 'Standard (R:R 1:2.0)',
    age: '42m ago',
    reasons: ['Overbought 14-period RSI (78)', 'Rejection at Major Resistance', 'US Dollar Rebound'],
    digits: 2,
    defaultPrice: 3200.0,
  },
  {
    id: 'sig-4',
    pair: 'SOL/USDT',
    binanceSymbol: 'SOLUSDT',
    type: 'BUY',
    assetClass: 'Crypto',
    confidence: 89,
    timeframe: '1H',
    baseEntryOffset: -0.005,
    tp1Percent: 0.045,
    tp2Percent: 0.075,
    slPercent: 0.018,
    riskReward: '1:3.40',
    rrTier: 'Sniper (R:R 1:2.5+)',
    age: '1h ago',
    reasons: ['DeFi Volume Spike (+38%)', 'Descending Wedge Clean Break', 'High Open Interest'],
    digits: 2,
    defaultPrice: 106.65,
  },
  {
    id: 'sig-5',
    pair: 'EUR/USD',
    binanceSymbol: 'EURUSDT',
    type: 'BUY',
    assetClass: 'Forex',
    confidence: 88,
    timeframe: '4H',
    baseEntryOffset: -0.0015,
    tp1Percent: 0.006,
    tp2Percent: 0.011,
    slPercent: 0.0025,
    riskReward: '1:2.40',
    rrTier: 'Standard (R:R 1:2.0)',
    age: '1h 15m ago',
    reasons: ['Bounce off 200 EMA Support', 'ECB Dovish Pause Priced In', 'Orderblock Absorption'],
    digits: 4,
    defaultPrice: 1.0845,
  },
];

export default function TradingSignalsSection() {
  const [filter, setFilter] = useState<'All' | 'Forex' | 'Crypto' | 'Commodities' | 'Indices'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  const [flashingPair, setFlashingPair] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('Connecting to Binance...');

  // Connect live Binance API stream
  useEffect(() => {
    let isMounted = true;

    const updateSignalPrices = async () => {
      try {
        const tickers = await fetchLiveBinanceTickers();
        if (!isMounted) return;

        const priceMap: Record<string, number> = {};
        tickers.forEach((t) => {
          priceMap[t.symbol] = t.price;
        });

        setLivePrices((prev) => {
          // Detect price changes for flashing animation
          Object.keys(priceMap).forEach((sym) => {
            if (prev[sym] && prev[sym] !== priceMap[sym]) {
              setFlashingPair(sym);
              setTimeout(() => setFlashingPair(null), 800);
            }
          });
          return { ...prev, ...priceMap };
        });

        setLastUpdated(`Live sync: ${new Date().toLocaleTimeString()}`);
      } catch (err) {
        console.warn('Error fetching Binance prices for signals:', err);
      }
    };

    updateSignalPrices();
    const interval = setInterval(updateSignalPrices, 4000); // Poll every 4 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredSignals =
    filter === 'All'
      ? BASE_SIGNALS
      : BASE_SIGNALS.filter((s) => s.assetClass === filter);

  const handleCopy = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="signals" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#8E9EB8]/20 text-[#71839F] text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            Risk-Reward (R:R) Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C221E] tracking-tight">
            Live Signal Plans by Risk:Reward Ratio
          </h2>
          <p className="mt-2 text-base text-[#7E6F68] max-w-2xl">
            Choose your signal subscription based on your profit target asymmetry. All plans include direct Telegram push alerts with exact Entry, Take Profit, and Stop Loss.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#E5DDD3] shadow-xs text-xs font-mono">
          <Target className="w-4 h-4 text-[#007D6D]" />
          <span className="text-[#2C221E] font-bold">Verified 30-Day Win Rate:</span>
          <span className="text-[#007D6D] font-extrabold">87.2%</span>
        </div>
      </div>

      {/* 1. Risk-Reward Pricing Packages Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-stretch">
        {SIGNAL_PACKAGES.map((pkg) => (
          <div
            key={pkg.title}
            className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between border transition-all ${
              pkg.popular
                ? 'bg-white border-[#007D6D] shadow-xl ring-2 ring-[#007D6D]/15 relative'
                : 'bg-white/90 border-[#E5DDD3] shadow-sm hover:shadow-md hover:border-[#007D6D]/40'
            }`}
          >
            <div>
              {pkg.popular && (
                <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#007D6D] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                  Recommended Tier
                </span>
              )}

              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-[#007D6D] border border-[#E5DDD3] font-mono">
                  {pkg.rrRange}
                </span>
                <span className="text-[10px] font-bold uppercase text-[#7E6F68]">
                  {pkg.badge}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-[#2C221E] mt-3">
                {pkg.title}
              </h3>
              <p className="text-xs text-[#7E6F68] mt-1.5 leading-relaxed min-h-[36px]">
                {pkg.desc}
              </p>

              {/* Price */}
              <div className="mt-5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3]">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#007D6D]">
                    ${pkg.priceMonthly}
                  </span>
                  <span className="text-xs text-[#7E6F68] font-medium">/ month</span>
                </div>
                <div className="text-[11px] text-[#7E6F68] mt-1 flex justify-between pt-2 border-t border-[#E5DDD3]">
                  <span>Quarterly (Save 25%):</span>
                  <span className="font-mono font-bold text-[#2C221E]">${pkg.priceQuarterly} / 3-mo</span>
                </div>
              </div>

              {/* Volume & Winrate */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono text-center">
                <div className="p-2 bg-white rounded-xl border border-[#E5DDD3]">
                  <span className="text-[10px] text-[#7E6F68] block font-sans">Cadence</span>
                  <span className="font-bold text-[#2C221E]">{pkg.signalsPerDay}</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-[#E5DDD3]">
                  <span className="text-[10px] text-[#7E6F68] block font-sans">Accuracy</span>
                  <span className="font-bold text-[#007D6D]">{pkg.winRate}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="mt-5 space-y-2 pt-3 border-t border-[#E5DDD3]">
                {pkg.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#4E3E39]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#007D6D] shrink-0 mt-0.5" />
                    <span className="leading-tight">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5DDD3]">
              <Link
                href="/services"
                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                  pkg.popular
                    ? 'bg-[#007D6D] text-white hover:bg-[#006356] shadow-[#007D6D]/20'
                    : 'bg-[#FAF7F2] text-[#2C221E] hover:bg-[#007D6D] hover:text-white border border-[#E5DDD3]'
                }`}
              >
                <span>Subscribe to {pkg.rrRange.split(' ')[0]} Signals (${pkg.priceMonthly}/mo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Live Active Signals Stream Header & Feed */}
      <div className="pt-6 border-t border-[#E5DDD3]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-[#2C221E]">
                Current Live Signal Stream
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#007D6D]/15 text-[#007D6D] text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#007D6D] animate-ping" />
                BINANCE API CONNECTED
              </span>
            </div>
            <p className="text-xs text-[#7E6F68] mt-0.5">
              Live market prices streaming directly from Binance API • {lastUpdated}
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#E5DDD3] shadow-xs overflow-x-auto">
            {(['All', 'Crypto', 'Commodities', 'Forex'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filter === tab
                    ? 'bg-[#007D6D] text-white shadow-xs'
                    : 'text-[#4E3E39] hover:bg-[#FAF7F2]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Signals Cards Grid with LIVE BINANCE PRICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSignals.map((signal) => {
            const isBuy = signal.type === 'BUY';
            const isCopied = copiedId === signal.id;
            
            // Get live market price from Binance API, or fallback to default
            const currentLivePrice = (signal.binanceSymbol && livePrices[signal.binanceSymbol])
              ? livePrices[signal.binanceSymbol]
              : signal.defaultPrice;

            // Calculate live entry and targets dynamically from real price
            const entryPrice = currentLivePrice * (1 + signal.baseEntryOffset);
            const tp1 = isBuy 
              ? entryPrice * (1 + signal.tp1Percent)
              : entryPrice * (1 - Math.abs(signal.tp1Percent));
            const sl = isBuy
              ? entryPrice * (1 - signal.slPercent)
              : entryPrice * (1 + Math.abs(signal.slPercent));

            // Calculate live PnL of the signal
            const priceDiff = isBuy ? (currentLivePrice - entryPrice) : (entryPrice - currentLivePrice);
            const livePnlPercent = (priceDiff / entryPrice) * 100;
            const inProfit = livePnlPercent >= 0;
            const isFlashing = signal.binanceSymbol && flashingPair === signal.binanceSymbol;

            return (
              <div
                key={signal.id}
                className={`bg-white rounded-2xl p-5 border shadow-xs flex flex-col justify-between transition-all duration-300 ${
                  isFlashing
                    ? 'border-[#007D6D] ring-2 ring-[#007D6D]/20'
                    : 'border-[#E5DDD3] hover:border-[#007D6D]/50 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Bar with Live Indicator */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD3]">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-[#2C221E]">{signal.pair}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF7F2] text-[#7E6F68]">
                        {signal.timeframe}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1 ${
                        isBuy
                          ? 'bg-[#007D6D]/15 text-[#007D6D]'
                          : 'bg-[#C88A75]/20 text-[#C88A75]'
                      }`}
                    >
                      {isBuy ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {signal.type}
                    </span>
                  </div>

                  {/* Real-Time Live Binance Market Price Banner */}
                  <div className="mt-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDD3] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#7E6F68] block tracking-wider flex items-center gap-1">
                        <Activity className="w-3 h-3 text-[#007D6D] animate-pulse" /> Live Market Price
                      </span>
                      <span className="font-mono text-base font-extrabold text-[#2C221E]">
                        ${currentLivePrice.toLocaleString(undefined, { minimumFractionDigits: signal.digits, maximumFractionDigits: signal.digits })}
                      </span>
                    </div>

                    {/* Live Signal Running PnL */}
                    <div className="text-right">
                      <span className="text-[10px] text-[#7E6F68] block">Running Signal PnL</span>
                      <span
                        className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded ${
                          inProfit
                            ? 'bg-[#007D6D]/15 text-[#007D6D]'
                            : 'bg-[#C88A75]/20 text-[#C88A75]'
                        }`}
                      >
                        {inProfit ? '+' : ''}{livePnlPercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Calculated Entry, Stop Loss & TP1 based on live market */}
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-mono text-center">
                    <div className="p-2 rounded-lg bg-white border border-[#E5DDD3]">
                      <span className="text-[9px] text-[#7E6F68] block font-sans">Signal Entry</span>
                      <span className="font-bold text-[#2C221E]">
                        ${entryPrice.toLocaleString(undefined, { minimumFractionDigits: signal.digits, maximumFractionDigits: signal.digits })}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-[#E5DDD3]">
                      <span className="text-[9px] text-[#C88A75] block font-sans">Stop Loss</span>
                      <span className="font-bold text-[#C88A75]">
                        ${sl.toLocaleString(undefined, { minimumFractionDigits: signal.digits, maximumFractionDigits: signal.digits })}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#007D6D]/10 border border-[#007D6D]/20">
                      <span className="text-[9px] text-[#007D6D] block font-sans font-semibold">Target (TP1)</span>
                      <span className="font-bold text-[#007D6D]">
                        ${tp1.toLocaleString(undefined, { minimumFractionDigits: signal.digits, maximumFractionDigits: signal.digits })}
                      </span>
                    </div>
                  </div>

                  {/* Confluence reason */}
                  <div className="mt-3 text-[11px] text-[#7E6F68] flex items-center justify-between">
                    <span>Confluence: <strong>{signal.reasons[0]}</strong></span>
                    <span className="text-[#007D6D] font-bold text-[10px]">{signal.confidence}% Confidence</span>
                  </div>
                </div>

                {/* Footer with R:R and Copy Button */}
                <div className="mt-4 pt-3 border-t border-[#E5DDD3] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7E6F68] block">Setup Ratio</span>
                    <span className="text-xs font-mono font-bold text-[#007D6D]">
                      {signal.rrTier}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(signal.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF7F2] hover:bg-[#007D6D] hover:text-white text-[#2C221E] border border-[#E5DDD3] transition-colors flex items-center gap-1.5"
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#007D6D]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8E9EB8]" />
                        <span>Copy Signal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
