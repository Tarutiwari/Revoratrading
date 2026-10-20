'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  DollarSign,
  Tag
} from 'lucide-react';

interface BotProduct {
  id: string;
  name: string;
  tagline: string;
  category: string;
  priceYearly: number;
  priceMonthly: number;
  winRate: number;
  monthlyReturn: number;
  maxDrawdown: number;
  riskLevel: 'Ultra-Low' | 'Low' | 'Medium';
  features: string[];
  popular?: boolean;
}

const BOTS: BotProduct[] = [
  {
    id: 'bot-1',
    name: 'Neural Trend Scalper',
    tagline: 'High-frequency momentum detector executing rapid micro-scalps during active market sessions.',
    category: 'Forex & Gold (XAU)',
    priceYearly: 149,
    priceMonthly: 49,
    winRate: 83.2,
    monthlyReturn: 28.4,
    maxDrawdown: 4.2,
    riskLevel: 'Low',
    popular: true,
    features: [
      'Multi-timeframe EMA + RSI breakout logic',
      'Dynamic trailing stop loss to lock in profits',
      'Full setup for MetaTrader 4 / 5 and cTrader',
      'Instant Telegram notification on each execution',
      'Free yearly algorithm updates & support',
    ],
  },
  {
    id: 'bot-2',
    name: 'Dynamic Volatility Grid Bot',
    tagline: 'Capitalizes on sideways ranges by automatically laddering orders without emotional interference.',
    category: 'Crypto & Major Forex',
    priceYearly: 119,
    priceMonthly: 39,
    winRate: 91.5,
    monthlyReturn: 19.8,
    maxDrawdown: 3.1,
    riskLevel: 'Ultra-Low',
    features: [
      'Automatic dynamic grid range recalculation',
      'Operates 24/7 during consolidations and ranges',
      'Integrated risk buffer against sudden spikes',
      'Pre-configured for Binance, Bybit, & MT5',
      'Includes ready-to-run parameter presets',
    ],
  },
  {
    id: 'bot-3',
    name: 'Macro Reversal DCA Bot',
    tagline: 'Accumulates high-probability swing positions near major institutional support and demand zones.',
    category: 'Indices & Commodities',
    priceYearly: 179,
    priceMonthly: 59,
    winRate: 77.9,
    monthlyReturn: 34.6,
    maxDrawdown: 6.8,
    riskLevel: 'Medium',
    features: [
      'Smart dollar-cost averaging on oversold assets',
      'Takes profit at key institutional Fibonacci targets',
      'Strict max-position cap to avoid over-exposure',
      'Includes dedicated video walkthrough guide',
      'Priority 1-on-1 configuration assistance',
    ],
  },
  {
    id: 'bot-4',
    name: 'Institutional Arbitrage Sentinel',
    tagline: 'Exploits micro-spread price inefficiencies across top exchanges with delta-neutral hedging.',
    category: 'Crypto & FX Arbitrage',
    priceYearly: 249,
    priceMonthly: 79,
    winRate: 96.8,
    monthlyReturn: 14.2,
    maxDrawdown: 1.2,
    riskLevel: 'Ultra-Low',
    features: [
      'Delta-neutral strategy (market crash resistant)',
      'Simultaneous multi-exchange order routing',
      'Sub-20ms ultra-low latency execution speed',
      'Zero directional market risk on open positions',
      'VIP private Discord channel access',
    ],
  },
];

export default function TradingBotsSection() {
  const [billing, setBilling] = useState<'yearly' | 'monthly'>('yearly');

  return (
    <section id="bots" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#007D6D]/10 text-[#007D6D] text-xs font-bold uppercase tracking-wider mb-3">
            <Bot className="w-3.5 h-3.5" />
            Automated Strategy Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C221E] tracking-tight">
            Ready-to-Deploy Trading Bots
          </h2>
          <p className="mt-2 text-base text-[#7E6F68] max-w-2xl">
            Choose a verified, plug-and-play bot designed for your trading style. No complex coding or manual tweaking required—just connect your broker and let the strategy execute.
          </p>
        </div>

        {/* Pricing Toggle: Yearly vs Monthly */}
        <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#E5DDD3] shadow-xs shrink-0">
          <button
            onClick={() => setBilling('yearly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              billing === 'yearly'
                ? 'bg-[#007D6D] text-white shadow-xs'
                : 'text-[#4E3E39] hover:bg-[#FAF7F2]'
            }`}
          >
            Yearly License (Save 30%)
          </button>
          <button
            onClick={() => setBilling('monthly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              billing === 'monthly'
                ? 'bg-[#007D6D] text-white shadow-xs'
                : 'text-[#4E3E39] hover:bg-[#FAF7F2]'
            }`}
          >
            Monthly Access
          </button>
        </div>
      </div>

      {/* 4 Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {BOTS.map((bot) => {
          const price = billing === 'yearly' ? bot.priceYearly : bot.priceMonthly;
          return (
            <div
              key={bot.id}
              className={`rounded-3xl p-6 flex flex-col justify-between border transition-all ${
                bot.popular
                  ? 'bg-white border-[#007D6D] shadow-xl ring-2 ring-[#007D6D]/15 relative'
                  : 'bg-white/90 border-[#E5DDD3] shadow-sm hover:shadow-md hover:border-[#007D6D]/40'
              }`}
            >
              <div>
                {/* Popular Badge */}
                {bot.popular && (
                  <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#007D6D] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                    Most Popular
                  </span>
                )}

                {/* Header */}
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E5DDD3] text-[#7E6F68]">
                    {bot.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      bot.riskLevel === 'Ultra-Low'
                        ? 'bg-[#007D6D]/10 text-[#007D6D]'
                        : bot.riskLevel === 'Low'
                        ? 'bg-[#8E9EB8]/20 text-[#4E3E39]'
                        : 'bg-[#D49B74]/20 text-[#D49B74]'
                    }`}
                  >
                    {bot.riskLevel} Risk
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-[#2C221E] mt-3">
                  {bot.name}
                </h3>
                <p className="text-xs text-[#7E6F68] mt-1.5 leading-relaxed min-h-[48px]">
                  {bot.tagline}
                </p>

                {/* Price Display */}
                <div className="mt-5 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E6F68] block">
                    {billing === 'yearly' ? 'Yearly License Price' : 'Monthly Subscription'}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-mono text-3xl font-extrabold text-[#007D6D]">
                      ${price}
                    </span>
                    <span className="text-xs text-[#7E6F68] font-medium">
                      {billing === 'yearly' ? 'USD / year' : 'USD / month'}
                    </span>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
                  <div className="p-2 rounded-xl bg-white border border-[#E5DDD3]">
                    <span className="text-[10px] text-[#7E6F68] block">Win Rate</span>
                    <span className="font-mono font-bold text-[#007D6D]">{bot.winRate}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#E5DDD3]">
                    <span className="text-[10px] text-[#7E6F68] block">Avg Return</span>
                    <span className="font-mono font-bold text-[#007D6D]">+{bot.monthlyReturn}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#E5DDD3]">
                    <span className="text-[10px] text-[#7E6F68] block">Max DD</span>
                    <span className="font-mono font-bold text-[#C88A75]">-{bot.maxDrawdown}%</span>
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="mt-5 space-y-2 pt-3 border-t border-[#E5DDD3]">
                  {bot.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#4E3E39]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#007D6D] shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-[#E5DDD3]">
                <a
                  href="/services"
                  className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                    bot.popular
                      ? 'bg-[#007D6D] text-white hover:bg-[#006356] shadow-[#007D6D]/20'
                      : 'bg-white text-[#2C221E] hover:bg-[#007D6D] hover:text-white border border-[#E5DDD3]'
                  }`}
                >
                  <span>Get {bot.name.split(' ')[0]} Bot (${price})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* All-in-One 4-Bot Bundle Banner */}
      <div className="mt-10 rounded-3xl bg-gradient-to-r from-white via-[#FAF7F2] to-white border-2 border-[#007D6D]/30 p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#007D6D]/15 text-[#007D6D] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Fleet Bundle • Save Over $300</span>
          </div>
          <h3 className="text-2xl font-extrabold text-[#2C221E]">
            Get All 4 Trading Bots with Yearly Access
          </h3>
          <p className="text-xs text-[#7E6F68] max-w-xl">
            Deploy the complete quantitative suite: Scalper, Grid, DCA, and Arbitrage bots. Connect them across all your MT4/MT5, Binance, and Bybit accounts with 1-on-1 VIP setup assistance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <div className="text-center sm:text-right">
            <div className="text-xs text-[#7E6F68] line-through font-mono">$696.00 Total</div>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#007D6D]">$349.00</div>
            <span className="text-[10px] text-[#007D6D] font-bold block">Annual payment • 1-Year Full License</span>
          </div>

          <Link
            href="/services"
            className="px-6 py-3.5 rounded-xl font-bold bg-[#007D6D] text-white hover:bg-[#006356] shadow-md shadow-[#007D6D]/20 transition-all text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <span>Claim 4-Bot Yearly Bundle</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
