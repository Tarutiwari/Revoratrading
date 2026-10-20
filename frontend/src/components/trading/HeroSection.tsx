'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Newspaper,
  ArrowRight,
  Sparkles, 
  CheckCircle2,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';
import { fetchLiveBinanceTickers } from '@/services/binanceMarketService';

export default function HeroSection() {
  const [activeFacility, setActiveFacility] = useState<'bots' | 'signals' | 'news' | 'account'>('bots');
  const [liveBtcPrice, setLiveBtcPrice] = useState<number>(83280);

  useEffect(() => {
    const loadBtc = async () => {
      const tickers = await fetchLiveBinanceTickers();
      const btc = tickers.find((t) => t.symbol === 'BTCUSDT');
      if (btc && btc.price > 0) {
        setLiveBtcPrice(btc.price);
      }
    };
    loadBtc();
  }, []);

  return (
    <section className="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Value Pill */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DDD3] shadow-xs mb-6">
          <span className="flex h-2 w-2 rounded-full bg-[#007D6D] animate-ping" />
          <span className="text-xs font-semibold text-[#007D6D]">Revora Trading Platform</span>
          <span className="text-[#8E9EB8] text-xs">|</span>
          <span className="text-xs text-[#7E6F68] font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D49B74]" /> Automated Trading Tools & Operations
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C221E] tracking-tight leading-[1.12]">
          Intelligent Trading Tools for the <span className="text-[#007D6D] underline decoration-[#007D6D]/30 decoration-wavy">Modern Trader</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[#7E6F68] leading-relaxed max-w-2xl font-normal">
          Revora provides everything you need to trade smarter: pre-built automated trading bots, high-confluence algorithmic signals, instrument-basis macroeconomic news, and unified multi-broker account management.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#bots"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#007D6D] hover:bg-[#006356] shadow-md shadow-[#007D6D]/20 transition-all hover:scale-[1.02]"
          >
            <Bot className="w-4 h-4" />
            <span>Explore Trading Bots</span>
          </a>
          <a
            href="#signals"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[#2C221E] bg-white border border-[#E5DDD3] hover:bg-[#F2ECE1] shadow-xs transition-all hover:border-[#007D6D]/40"
          >
            <Zap className="w-4 h-4 text-[#007D6D]" />
            <span>View Live Signals</span>
          </a>
        </div>

        {/* Feature quick badges */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left w-full max-w-3xl">
          <div className="p-3.5 rounded-2xl bg-white/80 border border-[#E5DDD3] flex items-center gap-3 shadow-xs">
            <div className="p-2 rounded-xl bg-[#007D6D]/10 text-[#007D6D]">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2C221E]">Autonomous Bots</div>
              <div className="text-[11px] text-[#7E6F68]">Grid, DCA & Scalper</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-[#E5DDD3] flex items-center gap-3 shadow-xs">
            <div className="p-2 rounded-xl bg-[#8E9EB8]/20 text-[#71839F]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2C221E]">Live Signals</div>
              <div className="text-[11px] text-[#7E6F68]">87.2% Win Ratio</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-[#E5DDD3] flex items-center gap-3 shadow-xs">
            <div className="p-2 rounded-xl bg-[#D49B74]/20 text-[#D49B74]">
              <Newspaper className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2C221E]">Economic Radar</div>
              <div className="text-[11px] text-[#7E6F68]">Instrument Correlated</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-[#E5DDD3] flex items-center gap-3 shadow-xs">
            <div className="p-2 rounded-xl bg-[#007D6D]/10 text-[#007D6D]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2C221E]">Account Security</div>
              <div className="text-[11px] text-[#7E6F68]">Non-Custodial API</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Interactive Platform Overview Hub */}
      <div className="relative mt-6 rounded-3xl bg-white border border-[#E5DDD3] p-6 sm:p-8 shadow-xl max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DDD3]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#007D6D] bg-[#007D6D]/10 px-2.5 py-1 rounded-md">
              Platform Facilities Overview
            </span>
            <h2 className="text-xl font-extrabold text-[#2C221E] mt-2">
              All Trading Operations in One Harmonized Suite
            </h2>
          </div>

          {/* Facility Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF7F2] border border-[#E5DDD3] overflow-x-auto">
            {[
              { id: 'bots', label: 'Trading Bots', icon: Bot },
              { id: 'signals', label: 'Live Signals', icon: Zap },
              { id: 'news', label: 'Economic News', icon: Newspaper },
              { id: 'account', label: 'Account Control', icon: ShieldCheck },
            ].map((f) => {
              const Icon = f.icon;
              const isSelected = activeFacility === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFacility(f.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#007D6D] text-white shadow-xs'
                      : 'text-[#4E3E39] hover:bg-white hover:text-[#2C221E]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Facility Card Display */}
        <div className="mt-6">
          {activeFacility === 'bots' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2C221E]">Neural Trend Scalper</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#007D6D]/15 text-[#007D6D]">
                    Active 24/7
                  </span>
                </div>
                <p className="text-xs text-[#7E6F68]">Automated multi-timeframe EMA breakout execution with dynamic profit taking.</p>
                <div className="pt-2 border-t border-[#E5DDD3] flex justify-between text-xs font-mono">
                  <span className="text-[#7E6F68]">30D Return:</span>
                  <span className="text-[#007D6D] font-bold">+28.4%</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2C221E]">Volatility Grid Bot</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#007D6D]/15 text-[#007D6D]">
                    Active 24/7
                  </span>
                </div>
                <p className="text-xs text-[#7E6F68]">Captures sideways oscillations by laddering buy/sell orders in consolidating ranges.</p>
                <div className="pt-2 border-t border-[#E5DDD3] flex justify-between text-xs font-mono">
                  <span className="text-[#7E6F68]">30D Return:</span>
                  <span className="text-[#007D6D] font-bold">+19.8%</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2C221E]">Institutional Arbitrage</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8E9EB8]/20 text-[#4E3E39]">
                    Delta-Neutral
                  </span>
                </div>
                <p className="text-xs text-[#7E6F68]">Exploits micro-spread variances across Binance, Bybit, and OKX orderbooks.</p>
                <div className="pt-2 border-t border-[#E5DDD3] flex justify-between text-xs font-mono">
                  <span className="text-[#7E6F68]">30D Return:</span>
                  <span className="text-[#007D6D] font-bold">+14.2%</span>
                </div>
              </div>
            </div>
          )}

          {activeFacility === 'signals' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#2C221E]">BTC/USDT</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#7E6F68]">1H Frame</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#007D6D]/15 text-[#007D6D]">
                    BUY SIGNAL
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
                  <div className="p-2 bg-white rounded-lg border border-[#E5DDD3]">
                    <span className="text-[10px] text-[#7E6F68] block">Live Entry</span>
                    <span className="font-bold text-[#2C221E]">${liveBtcPrice.toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#E5DDD3]">
                    <span className="text-[10px] text-[#007D6D] block">Target (TP)</span>
                    <span className="font-bold text-[#007D6D]">${Math.round(liveBtcPrice * 1.025).toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#E5DDD3]">
                    <span className="text-[10px] text-[#C88A75] block">Stop Loss</span>
                    <span className="font-bold text-[#C88A75]">${Math.round(liveBtcPrice * 0.985).toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#7E6F68] flex items-center justify-between">
                  <span>Confluence: <strong>4H RSI Bullish Divergence</strong></span>
                  <span className="text-[#007D6D] font-bold">94% Confidence</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#2C221E]">EUR/USD</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#7E6F68]">4H Frame</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#007D6D]/15 text-[#007D6D]">
                    BUY SIGNAL
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
                  <div className="p-2 bg-white rounded-lg border border-[#E5DDD3]">
                    <span className="text-[10px] text-[#7E6F68] block">Entry</span>
                    <span className="font-bold text-[#2C221E]">1.0845</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#E5DDD3]">
                    <span className="text-[10px] text-[#007D6D] block">Target (TP)</span>
                    <span className="font-bold text-[#007D6D]">1.0890</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#E5DDD3]">
                    <span className="text-[10px] text-[#C88A75] block">Stop Loss</span>
                    <span className="font-bold text-[#C88A75]">1.0815</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#7E6F68] flex items-center justify-between">
                  <span>Confluence: <strong>Bounce off 200 EMA Support</strong></span>
                  <span className="text-[#007D6D] font-bold">89% Confidence</span>
                </div>
              </div>
            </div>
          )}

          {activeFacility === 'news' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-2">
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#C88A75]/20 text-[#C88A75]">
                  HIGH IMPACT
                </span>
                <h4 className="font-bold text-xs text-[#2C221E]">US Core CPI (MoM)</h4>
                <p className="text-[11px] text-[#7E6F68]">Directly impacts: EUR/USD, USD/JPY, Gold (XAU)</p>
                <div className="text-[11px] font-medium text-[#007D6D]">Automated alerts dispatched 15m prior</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-2">
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#C88A75]/20 text-[#C88A75]">
                  HIGH IMPACT
                </span>
                <h4 className="font-bold text-xs text-[#2C221E]">ECB Policy Rate Decision</h4>
                <p className="text-[11px] text-[#7E6F68]">Directly impacts: EUR/USD, DAX40, EUR/GBP</p>
                <div className="text-[11px] font-medium text-[#007D6D]">Volatility protection enabled</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-2">
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#D49B74]/20 text-[#D49B74]">
                  SENTIMENT METER
                </span>
                <h4 className="font-bold text-xs text-[#2C221E]">Global Greed Index (68/100)</h4>
                <p className="text-[11px] text-[#7E6F68]">Risk-on bias across tech equities & digital assets</p>
                <div className="text-[11px] font-medium text-[#007D6D]">Updated tick-by-tick</div>
              </div>
            </div>
          )}

          {activeFacility === 'account' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-2">
                <h4 className="font-bold text-xs text-[#2C221E]">Multi-Broker Sync</h4>
                <p className="text-xs text-[#7E6F68]">Seamless non-custodial synchronization with MetaTrader 4/5, Binance, Bybit, and Interactive Brokers.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-2">
                <h4 className="font-bold text-xs text-[#2C221E]">Drawdown Breaker</h4>
                <p className="text-xs text-[#7E6F68]">Enforce daily maximum drawdown limits so your trading bots automatically protect your accrued profits.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-2">
                <h4 className="font-bold text-xs text-[#2C221E]">Zero-Trust Security</h4>
                <p className="text-xs text-[#7E6F68]">All connections require read-and-trade permissions only. Revora never touches or requests withdrawal privileges.</p>
              </div>
            </div>
          )}
        </div>

        {/* Live Facility Navigation Footer */}
        <div className="mt-6 pt-4 border-t border-[#E5DDD3] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-[#7E6F68]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#007D6D]" /> Real-time tick engine
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#007D6D]" /> No coding necessary
            </span>
          </div>

          <a
            href={`#${activeFacility}`}
            className="inline-flex items-center gap-1 font-bold text-[#007D6D] hover:underline"
          >
            <span>Learn more about this facility</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
