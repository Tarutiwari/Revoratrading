'use client';

export interface MarketTicker {
  symbol: string;
  displayName: string;
  price: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  digits: number;
  lastUpdated: number;
}

const DEFAULT_SYMBOLS = [
  { rawSymbol: 'BTCUSDT', displayName: 'BTC/USDT', digits: 2 },
  { rawSymbol: 'ETHUSDT', displayName: 'ETH/USDT', digits: 2 },
  { rawSymbol: 'PAXGUSDT', displayName: 'XAU/USD (Gold)', digits: 2 },
  { rawSymbol: 'SOLUSDT', displayName: 'SOL/USDT', digits: 2 },
  { rawSymbol: 'BNBUSDT', displayName: 'BNB/USDT', digits: 2 },
  { rawSymbol: 'EURUSDT', displayName: 'EUR/USD', digits: 4 },
];

export async function fetchLiveBinanceTickers(): Promise<MarketTicker[]> {
  try {
    const symbolList = JSON.stringify(DEFAULT_SYMBOLS.map((s) => s.rawSymbol));
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbolList)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status}`);
    }

    const data = await response.json();

    return DEFAULT_SYMBOLS.map((cfg) => {
      const item = data.find((d: any) => d.symbol === cfg.rawSymbol);
      if (!item) {
        return {
          symbol: cfg.rawSymbol,
          displayName: cfg.displayName,
          price: 0,
          changePercent: 0,
          high24h: 0,
          low24h: 0,
          volume24h: 0,
          digits: cfg.digits,
          lastUpdated: Date.now(),
        };
      }

      return {
        symbol: cfg.rawSymbol,
        displayName: cfg.displayName,
        price: parseFloat(item.lastPrice),
        changePercent: parseFloat(item.priceChangePercent),
        high24h: parseFloat(item.highPrice),
        low24h: parseFloat(item.lowPrice),
        volume24h: parseFloat(item.quoteVolume),
        digits: cfg.digits,
        lastUpdated: Date.now(),
      };
    });
  } catch (error) {
    console.warn('Failed to fetch from Binance public API, using cached fallback:', error);
    // Graceful fallback
    return [
      { symbol: 'BTCUSDT', displayName: 'BTC/USDT', price: 83280.0, changePercent: -0.42, high24h: 84146.0, low24h: 82972.0, volume24h: 1028000000, digits: 2, lastUpdated: Date.now() },
      { symbol: 'ETHUSDT', displayName: 'ETH/USDT', price: 2500.0, changePercent: -0.46, high24h: 2530.0, low24h: 2489.0, volume24h: 387000000, digits: 2, lastUpdated: Date.now() },
      { symbol: 'PAXGUSDT', displayName: 'XAU/USD (Gold)', price: 3200.0, changePercent: -0.93, high24h: 3240.0, low24h: 3180.0, volume24h: 7960000, digits: 2, lastUpdated: Date.now() },
      { symbol: 'SOLUSDT', displayName: 'SOL/USDT', price: 106.65, changePercent: -0.63, high24h: 108.67, low24h: 105.63, volume24h: 220000000, digits: 2, lastUpdated: Date.now() },
      { symbol: 'BNBUSDT', displayName: 'BNB/USDT', price: 741.0, changePercent: -0.2, high24h: 747.0, low24h: 736.8, volume24h: 45170000, digits: 2, lastUpdated: Date.now() },
      { symbol: 'EURUSDT', displayName: 'EUR/USD', price: 1.0845, changePercent: 0.12, high24h: 1.0890, low24h: 1.0820, volume24h: 890000000, digits: 4, lastUpdated: Date.now() },
    ];
  }
}
