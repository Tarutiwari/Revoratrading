'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowUpRight, Github, Twitter, Disc as Discord } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#E5DDD3] bg-[#FAF7F2] relative z-20 text-xs text-[#7E6F68] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E5DDD3]">
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#007D6D] flex items-center justify-center">
                <div className="flex items-end gap-0.5 px-1">
                  <div className="w-1 h-2 bg-white rounded-xs" />
                  <div className="w-1 h-4 bg-white rounded-xs" />
                  <div className="w-1 h-3 bg-[#C88A75] rounded-xs" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-[#2C221E] tracking-tight">REVORA TRADING</span>
            </div>

            <p className="text-xs leading-relaxed max-w-sm text-[#7E6F68]">
              High-performance algorithmic trading suite providing autonomous bot execution, live AI signals, macroeconomic calendar radar, and unified multi-broker custody.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#007D6D]/10 text-[#007D6D] font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> SOC2 Type II & ISO-27001 Certified
              </span>
            </div>
          </div>

          {/* Column 1: Trading Tools */}
          <div>
            <h4 className="font-bold text-[#2C221E] uppercase tracking-wider text-[11px] mb-3">
              Trading Facilities
            </h4>
            <ul className="space-y-2">
              <li><Link href="/#account" className="hover:text-[#007D6D] transition-colors">Account Management</Link></li>
              <li><Link href="/#bots" className="hover:text-[#007D6D] transition-colors">Automated Bots Fleet</Link></li>
              <li><Link href="/#signals" className="hover:text-[#007D6D] transition-colors">Real-Time AI Signals</Link></li>
              <li><Link href="/#news" className="hover:text-[#007D6D] transition-colors">Macro Economic Radar</Link></li>
              <li><Link href="/tools" className="hover:text-[#007D6D] transition-colors">Risk & Size Calculators</Link></li>
            </ul>
          </div>

          {/* Column 2: Ecosystem */}
          <div>
            <h4 className="font-bold text-[#2C221E] uppercase tracking-wider text-[11px] mb-3">
              Broker Connectors
            </h4>
            <ul className="space-y-2">
              <li><span className="text-[#4E3E39]">MetaTrader 4 / 5 Bridge</span></li>
              <li><span className="text-[#4E3E39]">Binance Pro Futures</span></li>
              <li><span className="text-[#4E3E39]">Interactive Brokers API</span></li>
              <li><span className="text-[#4E3E39]">Bybit Unified Margin</span></li>
              <li><span className="text-[#4E3E39]">TradingView Webhook Bot</span></li>
            </ul>
          </div>

          {/* Column 3: Platform & Legal */}
          <div>
            <h4 className="font-bold text-[#2C221E] uppercase tracking-wider text-[11px] mb-3">
              Company
            </h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-[#007D6D] transition-colors">Pricing & Plans</Link></li>
              <li><Link href="/contact" className="hover:text-[#007D6D] transition-colors">Contact & Support</Link></li>
              <li><Link href="/login" className="hover:text-[#007D6D] transition-colors">Sign In</Link></li>
              <li><Link href="/signup" className="hover:text-[#007D6D] transition-colors">Create Free Account</Link></li>
              <li><Link href="/history" className="hover:text-[#007D6D] transition-colors">Transaction History</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Regulatory Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#7E6F68] text-center md:text-left">
            © 2026 Revora Trading Technologies Inc. All rights reserved. Trading financial instruments carries substantial risk of loss. Past performance does not guarantee future results.
          </p>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-[#007D6D]">System Status: All Systems Operational (18ms)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
