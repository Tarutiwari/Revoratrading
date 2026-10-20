import type { Metadata } from 'next';
import './global.css';
import { AuthProvider } from '@/context/AuthContext';
import TickerBar from '@/components/layout/TickerBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TradingBackground from '@/components/ThreeScene/TradingBackground';

export const metadata: Metadata = {
  title: 'Revora Trading | Algorithmic Trading Bots, Live Signals & Market Intelligence',
  description: 'Enterprise-grade trading platform equipped with autonomous trading bots, real-time AI market signals, macroeconomic news radar, and unified multi-broker account management.',
  keywords: 'trading bot, trading signals, economic calendar, forex signals, crypto trading, algorithmic trading, account management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#FAF7F2] text-[#4E3E39] min-h-screen flex flex-col selection:bg-[#007D6D]/20 selection:text-[#007D6D]">
        <AuthProvider>
          <TradingBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            <TickerBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
