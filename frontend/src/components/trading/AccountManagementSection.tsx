'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wallet, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Sparkles,
  DollarSign,
  AlertCircle
} from 'lucide-react';

interface AccountTier {
  name: string;
  capitalRange: string;
  setupFee: number;
  profitShare: number;
  targetMonthly: string;
  maxDrawdown: string;
  popular?: boolean;
  features: string[];
}

const TIERS: AccountTier[] = [
  {
    name: 'Silver Growth Tier',
    capitalRange: '$5,000 to $20,000 Capital',
    setupFee: 149,
    profitShare: 25,
    targetMonthly: '+12% to +18%',
    maxDrawdown: '5.0% Hard Breaker',
    features: [
      'Non-custodial MT4/MT5 or Binance API connection',
      'Automated hybrid trend & scalping bot execution',
      'High-water mark: only pay profit-share on net gains',
      'Bi-weekly performance audit statement',
      'Telegram trade confirmation alerts',
    ],
  },
  {
    name: 'Gold Pro Managed Tier',
    capitalRange: '$20,000 to $50,000 Capital',
    setupFee: 249,
    profitShare: 20,
    targetMonthly: '+18% to +26%',
    maxDrawdown: '4.0% Hard Breaker',
    popular: true,
    features: [
      'Full institutional multi-broker synchronization',
      'Priority multi-asset allocation (Forex, Gold, BTC)',
      'Lower 20% profit share with high-water mark protection',
      'Custom drawdown breaker & daily loss caps',
      'Dedicated private risk officer assigned to your account',
    ],
  },
  {
    name: 'Diamond Institutional Tier',
    capitalRange: '$50,000+ Capital',
    setupFee: 399,
    profitShare: 15,
    targetMonthly: '+22% to +32%',
    maxDrawdown: '3.0% Tailored Breaker',
    features: [
      'Lowest 15% profit-share for large private capital',
      'Sub-10ms co-located execution node',
      'Delta-neutral arbitrage and macro hedging strategies',
      '24/7 direct WhatsApp / Telegram emergency line',
      'Personal monthly strategy consultation with lead trader',
    ],
  },
];

export default function AccountManagementSection() {
  return (
    <section id="account" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#007D6D]/10 text-[#007D6D] text-xs font-bold uppercase tracking-wider mb-3">
            <Wallet className="w-3.5 h-3.5" />
            Professional Hands-Free Trading
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C221E] tracking-tight">
            Account Management & Pricing
          </h2>
          <p className="mt-2 text-base text-[#7E6F68] max-w-2xl">
            Let our quantitative algorithms and seasoned traders manage your trading account hands-free. Your capital remains 100% inside your own personal broker account at all times.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E5DDD3] shadow-xs text-xs font-semibold text-[#007D6D]">
          <Lock className="w-4 h-4 text-[#007D6D]" />
          <span>Non-Custodial: Zero Withdrawal Access</span>
        </div>
      </div>

      {/* Crucial Security Explanation Box (Answering "Custody kya hai") */}
      <div className="mb-10 p-5 rounded-2xl bg-white border border-[#E5DDD3] shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#007D6D]/10 flex items-center justify-center text-[#007D6D] shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="flex-1 text-xs">
          <h4 className="font-extrabold text-sm text-[#2C221E] mb-1">
            How Does Account Management Work? (100% Secure & Non-Custodial)
          </h4>
          <p className="text-[#7E6F68] leading-relaxed">
            You do <strong>NOT</strong> transfer your funds to Revora. Your deposit stays safely inside your existing regulated broker (MetaTrader 4/5, Binance, Bybit, Exness, etc.). You simply connect your account using <strong>Read & Trade API keys or Investor/Copier credentials</strong>. We cannot withdraw or transfer your money.
          </p>
        </div>
      </div>

      {/* Account Management Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between border transition-all ${
              tier.popular
                ? 'bg-white border-[#007D6D] shadow-xl ring-2 ring-[#007D6D]/15 relative'
                : 'bg-white/90 border-[#E5DDD3] shadow-sm hover:shadow-md hover:border-[#007D6D]/40'
            }`}
          >
            <div>
              {tier.popular && (
                <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#007D6D] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                  Most Popular Allocation
                </span>
              )}

              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-[11px] font-bold uppercase text-[#7E6F68]">
                  Account Size
                </span>
                <span className="text-xs font-mono font-bold text-[#007D6D] bg-[#007D6D]/10 px-2.5 py-0.5 rounded-md">
                  {tier.capitalRange}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-[#2C221E] mt-3">
                {tier.name}
              </h3>

              {/* Pricing Box: Setup Fee + Profit Share */}
              <div className="mt-5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD3] space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#7E6F68]">One-Time Setup Fee:</span>
                  <span className="font-mono text-2xl font-extrabold text-[#2C221E]">
                    ${tier.setupFee}
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-2 border-t border-[#E5DDD3]">
                  <span className="text-xs text-[#7E6F68]">Net Profit Share:</span>
                  <span className="font-mono text-xl font-extrabold text-[#007D6D]">
                    {tier.profitShare}% Monthly
                  </span>
                </div>
                <p className="text-[10px] text-[#7E6F68] pt-1">
                  *High-Water Mark: You only pay profit-share when your account reaches new profit highs.
                </p>
              </div>

              {/* Targets */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono text-center">
                <div className="p-2.5 bg-white rounded-xl border border-[#E5DDD3]">
                  <span className="text-[10px] text-[#7E6F68] block font-sans">Monthly Target</span>
                  <span className="font-bold text-[#007D6D]">{tier.targetMonthly}</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-[#E5DDD3]">
                  <span className="text-[10px] text-[#7E6F68] block font-sans">Max Loss Breaker</span>
                  <span className="font-bold text-[#C88A75]">{tier.maxDrawdown}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="mt-5 space-y-2 pt-3 border-t border-[#E5DDD3]">
                {tier.features.map((feat, i) => (
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
                  tier.popular
                    ? 'bg-[#007D6D] text-white hover:bg-[#006356] shadow-[#007D6D]/20'
                    : 'bg-[#FAF7F2] text-[#2C221E] hover:bg-[#007D6D] hover:text-white border border-[#E5DDD3]'
                }`}
              >
                <span>Apply for {tier.name.split(' ')[0]} Management</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
