'use client';

import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Clock, 
  Flame, 
  ArrowUpRight 
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  actual?: string;
  forecast: string;
  previous: string;
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  affectedPairs: string[];
}

const EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    time: '14:30 GMT',
    currency: 'USD',
    event: 'US Core CPI (MoM)',
    impact: 'HIGH',
    actual: '0.3%',
    forecast: '0.3%',
    previous: '0.2%',
    bias: 'BULLISH',
    affectedPairs: ['EUR/USD', 'USD/JPY', 'XAU/USD'],
  },
  {
    id: 'ev-2',
    time: '15:15 GMT',
    currency: 'EUR',
    event: 'ECB Monetary Policy Decision',
    impact: 'HIGH',
    actual: '3.25%',
    forecast: '3.25%',
    previous: '3.50%',
    bias: 'NEUTRAL',
    affectedPairs: ['EUR/USD', 'EUR/GBP', 'DAX40'],
  },
  {
    id: 'ev-3',
    time: '18:00 GMT',
    currency: 'USD',
    event: 'FOMC Member Waller Speech',
    impact: 'MEDIUM',
    actual: '--',
    forecast: '--',
    previous: '--',
    bias: 'BULLISH',
    affectedPairs: ['USD/JPY', 'US500', 'BTC/USD'],
  },
  {
    id: 'ev-4',
    time: '01:30 GMT',
    currency: 'JPY',
    event: 'Tokyo Core CPI (YoY)',
    impact: 'MEDIUM',
    actual: '2.1%',
    forecast: '2.0%',
    previous: '1.9%',
    bias: 'BULLISH',
    affectedPairs: ['USD/JPY', 'GBP/JPY', 'NIKKEI'],
  },
];

const NEWS_FEED = [
  {
    title: 'Federal Reserve Balance Sheet Update Signals Controlled Liquidity Inflow',
    source: 'Bloomberg Macro Terminal',
    time: '14m ago',
    tag: 'Macro',
    impact: 'Positive for Risk Assets (BTC, Tech Equities)',
  },
  {
    title: 'OPEC+ Considers Postponing Planned December Oil Output Increase',
    source: 'Reuters Commodities',
    time: '42m ago',
    tag: 'Energy',
    impact: 'Bullish for Brent Crude & CAD pairs',
  },
  {
    title: 'Spot Gold Tests $2,680 Following Geopolitical Safe-Haven Allocation',
    source: 'Financial Times',
    time: '1h ago',
    tag: 'Precious Metals',
    impact: 'Support forming at $2,670 key level',
  },
];

export default function EconomicNewsSection() {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('ALL');

  const filteredEvents =
    selectedCurrency === 'ALL'
      ? EVENTS
      : EVENTS.filter((e) => e.currency === selectedCurrency);

  return (
    <section id="news" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#D49B74]/20 text-[#D49B74] text-xs font-bold uppercase tracking-wider mb-3">
            <Newspaper className="w-3.5 h-3.5" />
            Macro Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C221E] tracking-tight">
            Instrument-Basis Economic News & Radar
          </h2>
          <p className="mt-2 text-base text-[#7E6F68] max-w-xl">
            Never get stopped out by surprise data drops. Automated calendar alerts paired directly to your watchlist instruments.
          </p>
        </div>

        {/* Currency quick filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#E5DDD3] shadow-xs">
          {['ALL', 'USD', 'EUR', 'JPY'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCurrency(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCurrency === c
                  ? 'bg-[#007D6D] text-white shadow-xs'
                  : 'text-[#4E3E39] hover:bg-[#F2ECE1]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Economic Calendar Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5DDD3] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD3]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#007D6D]" />
              <h3 className="font-bold text-[#2C221E] text-sm">Key Economic Releases</h3>
            </div>
            <span className="text-[11px] text-[#7E6F68] font-mono">Today, GMT</span>
          </div>

          <div className="divide-y divide-[#E5DDD3] mt-2">
            {filteredEvents.map((ev) => (
              <div key={ev.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center justify-center w-12 py-1 rounded-lg bg-[#FAF7F2] border border-[#E5DDD3]">
                    <span className="text-xs font-black text-[#2C221E]">{ev.currency}</span>
                    <span
                      className={`text-[9px] font-black uppercase px-1 rounded ${
                        ev.impact === 'HIGH'
                          ? 'bg-[#C88A75]/20 text-[#C88A75]'
                          : 'bg-[#D49B74]/20 text-[#D49B74]'
                      }`}
                    >
                      {ev.impact}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-[#2C221E]">{ev.event}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#7E6F68] mt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-[#8E9EB8]" /> {ev.time}
                      </span>
                      <span>•</span>
                      <span>Affected:</span>
                      {ev.affectedPairs.map((p) => (
                        <span key={p} className="font-mono font-medium text-[#007D6D]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Values strip */}
                <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-center font-mono">
                  <div className="text-right">
                    <span className="text-[10px] text-[#7E6F68] block">Actual</span>
                    <span className="font-bold text-[#007D6D]">{ev.actual}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#7E6F68] block">Forecast</span>
                    <span className="text-[#4E3E39]">{ev.forecast}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#7E6F68] block">Prev</span>
                    <span className="text-[#7E6F68]">{ev.previous}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Gauge & News Flash (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Sentiment Gauge */}
          <div className="bg-white rounded-2xl border border-[#E5DDD3] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD3]">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#D49B74]" />
                <h3 className="font-bold text-[#2C221E] text-sm">Market Sentiment Meter</h3>
              </div>
              <span className="text-xs font-bold text-[#007D6D] px-2 py-0.5 rounded bg-[#007D6D]/10">
                Greed (68/100)
              </span>
            </div>

            <div className="mt-4">
              {/* Progress meter bar */}
              <div className="h-3 w-full rounded-full bg-[#FAF7F2] border border-[#E5DDD3] overflow-hidden flex">
                <div className="h-full bg-[#C88A75]" style={{ width: '22%' }} />
                <div className="h-full bg-[#D49B74]" style={{ width: '18%' }} />
                <div className="h-full bg-[#8E9EB8]" style={{ width: '20%' }} />
                <div className="h-full bg-[#007D6D]" style={{ width: '40%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-[#7E6F68] mt-1 font-semibold">
                <span>Extreme Fear</span>
                <span>Neutral</span>
                <span className="text-[#007D6D]">Greed (Current)</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E5DDD3] grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-[#FAF7F2]">
                <span className="text-[10px] text-[#7E6F68] block">Forex Bias</span>
                <span className="font-bold text-[#007D6D]">Bullish USD</span>
              </div>
              <div className="p-2 rounded-xl bg-[#FAF7F2]">
                <span className="text-[10px] text-[#7E6F68] block">Crypto Index</span>
                <span className="font-bold text-[#007D6D]">High Risk-On</span>
              </div>
              <div className="p-2 rounded-xl bg-[#FAF7F2]">
                <span className="text-[10px] text-[#7E6F68] block">Gold Safe-Haven</span>
                <span className="font-bold text-[#4E3E39]">Accumulation</span>
              </div>
            </div>
          </div>

          {/* Real-time Headline Wire */}
          <div className="bg-white rounded-2xl border border-[#E5DDD3] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5DDD3]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E6F68] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#007D6D]" /> AI Impact Flash Feed
              </span>
              <span className="text-[10px] text-[#007D6D] font-mono animate-pulse">● LIVE STREAM</span>
            </div>

            <div className="space-y-3">
              {NEWS_FEED.map((news, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FAF7F2] hover:bg-white border border-[#E5DDD3] transition-colors">
                  <div className="flex items-center justify-between text-[10px] text-[#7E6F68] mb-1">
                    <span className="font-semibold text-[#007D6D]">{news.source}</span>
                    <span>{news.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#2C221E] leading-snug">{news.title}</h4>
                  <div className="mt-1.5 text-[11px] font-medium text-[#7E6F68] flex items-center gap-1">
                    <span className="text-[#007D6D] font-bold">Impact:</span> {news.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
