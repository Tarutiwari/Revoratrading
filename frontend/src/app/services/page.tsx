'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Bot, 
  Zap, 
  ArrowUpRight, 
  HelpCircle, 
  ChevronDown 
} from 'lucide-react';

export default function ServicesPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const PLANS = [
    {
      name: 'Free Starter',
      priceMonthly: 0,
      priceYearly: 0,
      badge: 'Free Forever',
      desc: 'Basic quantitative tools for beginners. Zero commitment, no credit card required.',
      features: [
        'Full Access to Position Size & Risk Calculators',
        'Standard 15-Minute Delayed Economic Calendar',
        '1 Educational Sample Signal per Week',
        'Public Market Knowledge Base & Guides',
        'No Automated Trading Bots (Requires Pro)',
        'No VIP Live Telegram Signals (Requires Pro)',
        'No Broker API Sync or Account Management',
      ],
      cta: 'Access Free Tools',
      highlight: false,
    },
    {
      name: 'Pro Trader',
      priceMonthly: 49,
      priceYearly: 39,
      badge: 'Most Popular',
      desc: 'Active retail algorithmic execution with daily signals and live bot automation.',
      features: [
        '1 Autonomous Trading Bot Included (Scalper or Grid)',
        'Daily Live Standard Signals (R:R 1:1.5 to 1:2.0, 3-5/day)',
        'Instant Zero-Delay Economic Calendar & News Radar',
        'Full MT4/MT5, Binance, & Bybit API Synchronization',
        'Automated Slippage Guard & Daily Drawdown Breaker',
        'Private Telegram Alert Channel Access',
        'Priority Technical & Configuration Support',
      ],
      cta: 'Upgrade to Pro ($49/mo)',
      highlight: true,
    },
    {
      name: 'Elite All-Access',
      priceMonthly: 129,
      priceYearly: 99,
      badge: 'Complete Suite',
      desc: 'Full institutional power: all 4 trading bots, high R:R sniper signals, and managed account eligibility.',
      features: [
        'All 4 Autonomous Trading Bots Unlocked (Scalper, Grid, DCA, Arbitrage)',
        'High R:R Sniper Signals (R:R 1:2.5 to 1:3.5+) with Real-Time Updates',
        'Hands-Free Account Management Eligible (Lowest 15% Profit-Share)',
        'Sub-10ms Dedicated Co-Located Execution VPS Server',
        'Direct TradingView Webhook & Multi-Broker Trade Copier',
        '1-on-1 VIP Strategy Setup with Senior Portfolio Manager',
        '24/7 Dedicated WhatsApp Emergency Support Line',
      ],
      cta: 'Get Elite Access ($129/mo)',
      highlight: false,
    },
  ];

  const FAQS = [
    {
      q: 'What is Multi-Broker Integration and does Revora hold custody of my funds?',
      a: 'Absolutely NOT. We do not hold custody of your capital. Your trading balance stays 100% inside your own personal, regulated broker (such as MetaTrader 4/5, Binance, Bybit, Exness, etc.). Revora connects exclusively via non-custodial read-and-trade API keys or copier software. We never have permission to deposit, withdraw, or transfer your funds.',
    },
    {
      q: 'How does pricing work for Individual Bots vs All-Access Plans?',
      a: 'You can either purchase individual bots with a yearly license (starting at $119/year) from our Trading Bots catalog, or subscribe to a monthly/yearly membership ($49/mo or $129/mo) which bundles active bot hosting, real-time signals, and economic radar together.',
    },
    {
      q: 'How does Account Management pricing work?',
      a: 'Account Management is structured on a performance basis with a small one-time setup fee ($149 to $399) and a 15% to 25% profit share on net profits. We operate under a strict High-Water Mark: you only pay profit share when your account hits new all-time profit highs.',
    },
    {
      q: 'What is the difference between Standard Signals and High R:R Sniper Signals?',
      a: 'Standard signals target consistent daily profits with a 1:1.5 to 1:2.0 risk-reward ratio across major Forex and Gold pairs. Sniper signals target asymmetric breakouts with 1:2.5 to 1:3.5+ risk-reward ratios, risking $100 to make $250-$350+ per trade.',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#007D6D] px-3 py-1 rounded-full bg-[#007D6D]/10">
          Transparent Membership
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2C221E] tracking-tight mt-3">
          Institutional Capabilities at Every Tier
        </h1>
        <p className="mt-3 text-base text-[#7E6F68]">
          Choose the right operational tier for your volume and strategy complexity. Cancel or pause anytime.
        </p>

        {/* Billing Switch */}
        <div className="mt-8 inline-flex items-center gap-2 p-1 rounded-xl bg-white border border-[#E5DDD3] shadow-xs">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-[#007D6D] text-white shadow-xs'
                : 'text-[#4E3E39] hover:bg-[#F2ECE1]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-[#007D6D] text-white shadow-xs'
                : 'text-[#4E3E39] hover:bg-[#F2ECE1]'
            }`}
          >
            <span>Annual (Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PLANS.map((plan) => {
          const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
          return (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col justify-between border transition-all ${
                plan.highlight
                  ? 'bg-white border-[#007D6D] shadow-xl ring-2 ring-[#007D6D]/10 relative'
                  : 'bg-white/80 border-[#E5DDD3] shadow-sm hover:bg-white hover:border-[#007D6D]/40'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xl text-[#2C221E]">{plan.name}</h3>
                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                      plan.highlight
                        ? 'bg-[#007D6D] text-white'
                        : 'bg-[#FAF7F2] text-[#7E6F68] border border-[#E5DDD3]'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                <p className="text-xs text-[#7E6F68] mt-2 min-h-10">{plan.desc}</p>

                {/* Price */}
                <div className="mt-6 pb-6 border-b border-[#E5DDD3] flex items-baseline gap-1">
                  <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#2C221E]">
                    ${price}
                  </span>
                  <span className="text-xs text-[#7E6F68] font-medium">
                    {billingCycle === 'yearly' ? '/ month (billed yearly)' : '/ month'}
                  </span>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E6F68] block">
                    What is Included:
                  </span>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#4E3E39]">
                      <CheckCircle2 className="w-4 h-4 text-[#007D6D] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5DDD3]">
                <Link
                  href="/#bots"
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md ${
                    plan.highlight
                      ? 'bg-[#007D6D] text-white hover:bg-[#006356] shadow-[#007D6D]/20'
                      : 'bg-[#FAF7F2] text-[#2C221E] hover:bg-[#007D6D] hover:text-white border border-[#E5DDD3]'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white rounded-3xl border border-[#E5DDD3] p-8 sm:p-12 shadow-sm max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C221E] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#7E6F68] mt-1">
            Everything you need to know about security, broker synchronization, and latency.
          </p>
        </div>

        <div className="divide-y divide-[#E5DDD3]">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-sm text-[#2C221E] hover:text-[#007D6D] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7E6F68] transition-transform ${
                      isOpen ? 'rotate-180 text-[#007D6D]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs leading-relaxed text-[#7E6F68] animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
