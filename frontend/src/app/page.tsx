import React from 'react';
import HeroSection from '@/components/trading/HeroSection';
import TradingBotsSection from '@/components/trading/TradingBotsSection';
import TradingSignalsSection from '@/components/trading/TradingSignalsSection';
import EconomicNewsSection from '@/components/trading/EconomicNewsSection';
import AccountManagementSection from '@/components/trading/AccountManagementSection';
import TradingSuiteShowcase from '@/components/trading/TradingSuiteShowcase';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* 1. Hero with Interactive Trading Cockpit */}
      <HeroSection />

      {/* 2. Automated Trading Bots Fleet */}
      <TradingBotsSection />

      {/* 3. Live Algorithmic Confluence Signals */}
      <TradingSignalsSection />

      {/* 4. Instrument-Basis Economic News & Sentiment Radar */}
      <EconomicNewsSection />

      {/* 5. Account Management & Algorithmic Risk Shield */}
      <AccountManagementSection />

      {/* 6. Comprehensive Suite Feature Switcher */}
      <TradingSuiteShowcase />

      {/* 7. Conversion Callout Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#2C221E] to-[#1F1715] text-[#FAF7F2] p-8 sm:p-14 shadow-2xl overflow-hidden border border-[#4E3E39]">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-[#007D6D]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 rounded-full bg-[#C88A75]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#007D6D] border border-white/15 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D49B74]" />
              <span>Algorithmic Precision & Automated Execution</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Upgrade Your Trading Execution Edge?
            </h2>

            <p className="mt-4 text-[#D3C4B6] text-base leading-relaxed">
              Connect your favorite broker and deploy automated bots, receive high-confluence signals, and stay ahead of macroeconomic shifts with Revora.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#bots"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-[#007D6D] text-white hover:bg-[#006356] transition-all shadow-lg shadow-[#007D6D]/30 hover:scale-[1.02]"
              >
                <span>Explore Trading Bots</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20"
              >
                <span>Compare Plans & Features</span>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#D3C4B6]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#007D6D]" /> Non-custodial API permissions
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#007D6D]" /> 18ms latency order router
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#007D6D]" /> 24/7 autonomous bot execution
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
