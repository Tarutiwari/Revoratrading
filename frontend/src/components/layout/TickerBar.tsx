'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react';
import { fetchLiveBinanceTickers, MarketTicker } from '@/services/binanceMarketService';

interface DisplayTicker {
  symbol: string;
  price: number;
  changePercent: number;
  digits: number;
  isRealTime: boolean;
}

const INITIAL_TICKERS: DisplayTicker[] = [
  { symbol: 'BTC/USDT', price: 83280.0, changePercent: -0.42, digits: 2, isRealTime: true },
  { symbol: 'ETH/USDT', price: 2500.0, changePercent: -0.46, digits: 2, isRealTime: true },
  { symbol: 'XAU/USD (Gold)', price: 4148.1, changePercent: -0.93, digits: 2, isRealTime: true },
  { symbol: 'SOL/USDT', price: 106.65, changePercent: -0.63, digits: 2, isRealTime: true },
  { symbol: 'BNB/USDT', price: 741.0, changePercent: -0.2, digits: 2, isRealTime: true },
  { symbol: 'EUR/USD', price: 1.0842, changePercent: 0.17, digits: 4, isRealTime: false },
  { symbol: 'GBP/USD', price: 1.2985, changePercent: -0.25, digits: 4, isRealTime: false },
  { symbol: 'S&P 500', price: 5882.4, changePercent: 0.28, digits: 2, isRealTime: false },
];

export default function TickerBar() {
  const [tickers, setTickers] = useState<DisplayTicker[]>(INITIAL_TICKERS);
  const [flashingSymbol, setFlashingSymbol] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string>('Just now');

  // 1. Fetch Real Live Data from Binance Public API
  useEffect(() => {
    let isMounted = true;

    const loadLivePrices = async () => {
      const liveData = await fetchLiveBinanceTickers();
      if (!isMounted) return;

      setTickers((prev) =>
        prev.map((item) => {
          const match = liveData.find((d) => d.displayName === item.symbol);
          if (match && match.price > 0) {
            if (match.price !== item.price) {
              setFlashingSymbol(item.symbol);
              setTimeout(() => setFlashingSymbol(null), 900);
            }
            return {
              ...item,
              price: match.price,
              changePercent: match.changePercent,
              isRealTime: true,
            };
          }
          return item;
        })
      );
      setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };

    loadLivePrices();
    // Poll every 5 seconds for live Binance price updates
    const pollInterval = setInterval(loadLivePrices, 5000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <div className="w-full bg-[#FAF7F2]/95 border-b border-[#E5DDD3] overflow-hidden py-1.5 px-4 backdrop-blur-md relative z-30 select-none text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Real-time API Badge */}
        <div className="flex items-center gap-2 pr-4 border-r border-[#E5DDD3] font-semibold text-[#007D6D] whitespace-nowrap shrink-0">
          <Activity className="w-3.5 h-3.5 animate-pulse text-[#007D6D]" />
          <span className="tracking-wider uppercase text-[10px] font-mono">
            BINANCE LIVE API
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#007D6D] animate-ping" />
        </div>

        {/* Marquee Ticker Stream */}
        <div className="overflow-hidden flex-1 relative ml-4 mask-edges">
          <div className="animate-marquee flex items-center gap-8">
            {[...tickers, ...tickers].map((item, idx) => {
              const isPositive = item.changePercent >= 0;
              const isFlashing = flashingSymbol === item.symbol;
              return (
                <div
                  key={`${item.symbol}-${idx}`}
                  className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded transition-all duration-300 ${
                    isFlashing
                      ? isPositive
                        ? 'bg-[#007D6D]/20 ring-1 ring-[#007D6D]'
                        : 'bg-[#C88A75]/25 ring-1 ring-[#C88A75]'
                      : 'hover:bg-[#F2ECE1]'
                  }`}
                >
                  <span className="font-semibold text-[#2C221E] flex items-center gap-1">
                    {item.symbol}
                    {item.isRealTime && (
                      <span className="w-1 h-1 rounded-full bg-[#007D6D]" title="Direct Binance API Live" />
                    )}
                  </span>
                  <span className="font-mono text-[#4E3E39] font-medium">
                    ${item.price.toLocaleString(undefined, {
                      minimumFractionDigits: item.digits,
                      maximumFractionDigits: item.digits,
                    })}
                  </span>
                  <span
                    className={`inline-flex items-center font-mono text-[11px] font-semibold ${
                      isPositive ? 'text-[#007D6D]' : 'text-[#C88A75]'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 mr-0.5" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-0.5" />
                    )}
                    {isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
