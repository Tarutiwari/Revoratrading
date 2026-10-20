'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Zap, 
  Newspaper, 
  Wallet, 
  BarChart3, 
  Sliders, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export default function TradingSuiteShowcase() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      title: 'Automated Strategy Fleet',
      desc: 'Deploy pre-tuned algorithmic bots that execute micro-arbitrage, grid consolidation, and multi-timeframe trend scalping with millisecond precision.',
      badge: 'Zero-Emotion Trading',
      points: [
        'Over 14 pre-built, forward-tested quantitative bot templates',
        'Built-in trailing stop loss and dynamic order laddering',
        'Simulate on 5 years of historical tick-by-tick orderbook data',
      ],
      ctaText: 'Deploy a Bot',
      ctaHref: '/#bots',
      statLabel: 'Average Monthly Yield',
      statValue: '+24.6%',
    },
    {
      title: 'Real-Time High Confluence Signals',
      desc: 'Scan 150+ currency pairs, global indices, spot commodities, and digital assets every second with automated institutional breakout detection.',
      badge: '92.4% Confluence',
      points: [
        'Algorithmic consensus scoring across EMA, Stochastic, & Orderflow',
        'Exact Entry, TP1, TP2, and invalidation Stop Loss levels',
        'Instant low-latency webhooks & Telegram execution triggers',
      ],
      ctaText: 'View Signal Stream',
      ctaHref: '/#signals',
      statLabel: 'Signal Win Ratio',
      statValue: '87.2%',
    },
    {
      title: 'Instrument-Basis Economic Radar',
      desc: 'Filter high-impact macroeconomic events by their direct correlation to your open positions so volatility works in your favor.',
      badge: 'Institutional Macro',
      points: [
        'Instant notification 15 minutes before Tier-1 central bank releases',
        'Direct pair correlation mapping (USD, EUR, GBP, JPY, Gold)',
        'Fear & Greed real-time orderbook imbalance gauge',
      ],
      ctaText: 'Explore Calendar',
      ctaHref: '/#news',
      statLabel: 'Data Feed Latency',
      statValue: '<15ms',
    },
    {
      title: 'Professional Account Management & Broker Sync',
      desc: 'Seamlessly link your MetaTrader 4/5, Binance, or Bybit account for hands-free quantitative execution with zero fund withdrawal access.',
      badge: 'Non-Custodial Security',
      points: [
        'Single-click broker API synchronization with encrypted secrets',
        'Global portfolio drawdown killswitch to safeguard profits',
        'Automated tax & trade journal exports with complete audit trails',
      ],
      ctaText: 'Explore Account Security',
      ctaHref: '/#account',
      statLabel: 'Protected Capital',
      statValue: '$180M+',
    },
  ];

  const current = features[activeTab];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#007D6D] px-3 py-1 rounded-full bg-[#007D6D]/10">
          Integrated Financial Ecosystem
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C221E] tracking-tight mt-3">
          Every Trading Facility, Perfectly Orchestrated
        </h2>
        <p className="mt-3 text-base text-[#7E6F68]">
          Say goodbye to fragmented toolbars, clunky desktop charting software, and delayed news feeds.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {features.map((f, idx) => (
          <button
            key={f.title}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === idx
                ? 'bg-[#007D6D] text-white shadow-md shadow-[#007D6D]/20 scale-[1.02]'
                : 'bg-white text-[#4E3E39] border border-[#E5DDD3] hover:bg-[#F2ECE1]'
            }`}
          >
            {f.title}
          </button>
        ))}
      </div>

      {/* Active Tab Card Preview */}
      <div className="bg-white rounded-3xl border border-[#E5DDD3] p-8 sm:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DDD3] text-xs font-bold text-[#007D6D]">
            <span>{current.badge}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2C221E] tracking-tight">
            {current.title}
          </h3>

          <p className="text-base text-[#7E6F68] leading-relaxed">
            {current.desc}
          </p>

          <div className="space-y-3 pt-2">
            {current.points.map((pt, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-[#4E3E39]">
                <CheckCircle2 className="w-5 h-5 text-[#007D6D] shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link
              href={current.ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#007D6D] hover:bg-[#006356] transition-all shadow-md shadow-[#007D6D]/15"
            >
              <span>{current.ctaText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Visual Metric Box (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl border border-[#E5DDD3] p-8 text-center flex flex-col justify-center items-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white border border-[#E5DDD3] shadow-xs flex items-center justify-center text-[#007D6D]">
            <BarChart3 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-[#7E6F68] block font-semibold">
              {current.statLabel}
            </span>
            <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#007D6D] block mt-1">
              {current.statValue}
            </span>
          </div>

          <p className="text-xs text-[#7E6F68] max-w-xs">
            Independently audited quarterly across aggregated live customer execution environments.
          </p>
        </div>
      </div>
    </section>
  );
}
