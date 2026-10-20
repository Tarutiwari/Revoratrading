'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Receipt, Bot, Zap, ShieldCheck, Package, Download,
  CheckCircle2, Clock, XCircle, Filter, Search, ArrowUpRight, Calendar, CreditCard
} from 'lucide-react';

type TxStatus = 'Active' | 'Completed' | 'Refunded' | 'Pending';

interface Transaction {
  id: string;
  date: string;
  service: string;
  category: 'Trading Bot' | 'Signal Plan' | 'Account Management' | 'Tools';
  plan: string;
  amount: number;
  billing: 'Monthly' | 'Quarterly' | 'Yearly' | 'One-time';
  status: TxStatus;
  nextRenewal?: string;
  invoice: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-2026-0041',
    date: '2026-10-01',
    service: 'High R:R Sniper Signals',
    category: 'Signal Plan',
    plan: 'Quarterly Plan',
    amount: 179,
    billing: 'Quarterly',
    status: 'Active',
    nextRenewal: '2027-01-01',
    invoice: 'INV-2026-0041',
  },
  {
    id: 'TXN-2026-0038',
    date: '2026-09-15',
    service: 'ScalpMaster Pro Bot',
    category: 'Trading Bot',
    plan: 'Yearly Access',
    amount: 299,
    billing: 'Yearly',
    status: 'Active',
    nextRenewal: '2027-09-15',
    invoice: 'INV-2026-0038',
  },
  {
    id: 'TXN-2026-0029',
    date: '2026-08-01',
    service: 'Account Risk Shield',
    category: 'Account Management',
    plan: 'Monthly',
    amount: 49,
    billing: 'Monthly',
    status: 'Completed',
    invoice: 'INV-2026-0029',
  },
  {
    id: 'TXN-2026-0021',
    date: '2026-07-01',
    service: 'Standard Day & Swing Signals',
    category: 'Signal Plan',
    plan: 'Monthly',
    amount: 39,
    billing: 'Monthly',
    status: 'Completed',
    invoice: 'INV-2026-0021',
  },
  {
    id: 'TXN-2026-0014',
    date: '2026-06-12',
    service: 'Pro Risk Calculator Suite',
    category: 'Tools',
    plan: 'One-time Purchase',
    amount: 19,
    billing: 'One-time',
    status: 'Completed',
    invoice: 'INV-2026-0014',
  },
  {
    id: 'TXN-2026-0009',
    date: '2026-05-28',
    service: 'VIP All-Access Signals Pass',
    category: 'Signal Plan',
    plan: 'Monthly',
    amount: 119,
    billing: 'Monthly',
    status: 'Refunded',
    invoice: 'INV-2026-0009',
  },
];

const STATUS_CONFIG: Record<TxStatus, { label: string; icon: typeof CheckCircle2; bg: string; text: string }> = {
  Active: { label: 'Active', icon: CheckCircle2, bg: 'bg-[#007D6D]/12', text: 'text-[#007D6D]' },
  Completed: { label: 'Completed', icon: CheckCircle2, bg: 'bg-[#8E9EB8]/15', text: 'text-[#71839F]' },
  Refunded: { label: 'Refunded', icon: XCircle, bg: 'bg-[#C88A75]/15', text: 'text-[#C88A75]' },
  Pending: { label: 'Pending', icon: Clock, bg: 'bg-[#D49B74]/15', text: 'text-[#D49B74]' },
};

const CATEGORY_ICONS: Record<string, typeof Bot> = {
  'Trading Bot': Bot,
  'Signal Plan': Zap,
  'Account Management': ShieldCheck,
  'Tools': Package,
};

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | TxStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | string>('All');

  const filtered = MOCK_TRANSACTIONS.filter((tx) => {
    const matchSearch =
      !search ||
      tx.service.toLowerCase().includes(search.toLowerCase()) ||
      tx.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || tx.status === statusFilter;
    const matchCategory = categoryFilter === 'All' || tx.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  const totalSpent = MOCK_TRANSACTIONS.filter((t) => t.status !== 'Refunded').reduce((s, t) => s + t.amount, 0);
  const activeServices = MOCK_TRANSACTIONS.filter((t) => t.status === 'Active').length;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-[#007D6D]/5 blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Receipt className="w-5 h-5 text-[#007D6D]" />
            <span className="text-xs font-bold text-[#007D6D] uppercase tracking-wider">My Account</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#2C221E] tracking-tight">Transaction History</h1>
          <p className="mt-1 text-sm text-[#7E6F68]">Full record of all services purchased from Revora Trading</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, icon: CreditCard, color: '#2C221E' },
            { label: 'Active Services', value: activeServices.toString(), icon: CheckCircle2, color: '#007D6D' },
            { label: 'Total Orders', value: MOCK_TRANSACTIONS.length.toString(), icon: Receipt, color: '#8E9EB8' },
            { label: 'Member Since', value: 'May 2026', icon: Calendar, color: '#C88A75' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-[#E5DDD3] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#7E6F68] font-medium">{stat.label}</span>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
              <div className="font-extrabold text-2xl" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Active Subscriptions Highlight */}
        {MOCK_TRANSACTIONS.filter((t) => t.status === 'Active').length > 0 && (
          <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-[#007D6D]/8 to-[#8E9EB8]/8 border border-[#007D6D]/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#007D6D] animate-pulse" />
              <span className="text-sm font-bold text-[#2C221E]">Currently Active Subscriptions</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {MOCK_TRANSACTIONS.filter((t) => t.status === 'Active').map((tx) => {
                const Icon = CATEGORY_ICONS[tx.category] || Package;
                return (
                  <div key={tx.id} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#007D6D]/20 shadow-sm text-xs">
                    <Icon className="w-3.5 h-3.5 text-[#007D6D]" />
                    <span className="font-semibold text-[#2C221E]">{tx.service}</span>
                    {tx.nextRenewal && (
                      <span className="text-[#7E6F68]">· renews {new Date(tx.nextRenewal).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9EB8]" />
            <input
              id="history-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by service or order ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5DDD3] bg-white text-[#2C221E] text-sm placeholder-[#B5A9A3] focus:outline-none focus:ring-2 focus:ring-[#007D6D]/30 focus:border-[#007D6D] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-4 h-4 text-[#8E9EB8] shrink-0" />
            {(['All', 'Active', 'Completed', 'Refunded'] as const).map((s) => (
              <button
                key={s}
                id={`filter-status-${s.toLowerCase()}`}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === s ? 'bg-[#007D6D] text-white shadow-sm' : 'bg-white border border-[#E5DDD3] text-[#4E3E39] hover:bg-[#FAF7F2]'
                }`}
              >
                {s}
              </button>
            ))}
            <div className="w-px h-5 bg-[#E5DDD3] shrink-0" />
            {(['All', 'Trading Bot', 'Signal Plan', 'Account Management', 'Tools'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  categoryFilter === c ? 'bg-[#8E9EB8] text-white shadow-sm' : 'bg-white border border-[#E5DDD3] text-[#4E3E39] hover:bg-[#FAF7F2]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl border border-[#E5DDD3] shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Receipt className="w-10 h-10 text-[#B5A9A3] mx-auto mb-3" />
              <p className="text-[#7E6F68] font-medium">No transactions found</p>
              <p className="text-xs text-[#B5A9A3] mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5DDD3] bg-[#FAF7F2]">
                      <th className="text-left px-6 py-3.5 text-[10px] font-bold text-[#7E6F68] uppercase tracking-wider">Order ID</th>
                      <th className="text-left px-6 py-3.5 text-[10px] font-bold text-[#7E6F68] uppercase tracking-wider">Service</th>
                      <th className="text-left px-6 py-3.5 text-[10px] font-bold text-[#7E6F68] uppercase tracking-wider">Date</th>
                      <th className="text-left px-6 py-3.5 text-[10px] font-bold text-[#7E6F68] uppercase tracking-wider">Billing</th>
                      <th className="text-right px-6 py-3.5 text-[10px] font-bold text-[#7E6F68] uppercase tracking-wider">Amount</th>
                      <th className="text-center px-6 py-3.5 text-[10px] font-bold text-[#7E6F68] uppercase tracking-wider">Status</th>
                      <th className="text-center px-6 py-3.5 text-[10px] font-bold text-[#7E6F68] uppercase tracking-wider">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((tx, i) => {
                      const StatusIcon = STATUS_CONFIG[tx.status].icon;
                      const CategoryIcon = CATEGORY_ICONS[tx.category] || Package;
                      const sc = STATUS_CONFIG[tx.status];
                      return (
                        <tr key={tx.id} className={`border-b border-[#F0EAE3] hover:bg-[#FAF7F2] transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                          <td className="px-6 py-4">
                            <span className="font-mono text-xs font-bold text-[#007D6D]">{tx.id}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#007D6D]/10 flex items-center justify-center shrink-0 mt-0.5">
                                <CategoryIcon className="w-4 h-4 text-[#007D6D]" />
                              </div>
                              <div>
                                <div className="font-bold text-[#2C221E] text-xs">{tx.service}</div>
                                <div className="text-[11px] text-[#7E6F68]">{tx.category} · {tx.plan}</div>
                                {tx.nextRenewal && tx.status === 'Active' && (
                                  <div className="text-[11px] text-[#007D6D] font-semibold">
                                    Renews {new Date(tx.nextRenewal).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-[#7E6F68]">
                            {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E5DDD3] text-[#4E3E39] font-medium">{tx.billing}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-mono font-extrabold text-sm text-[#2C221E]">${tx.amount}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${sc.bg} ${sc.text}`}>
                              <StatusIcon className="w-3 h-3" />
                              {sc.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              id={`download-${tx.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF7F2] border border-[#E5DDD3] text-[#4E3E39] hover:bg-[#007D6D] hover:text-white hover:border-[#007D6D] transition-all"
                            >
                              <Download className="w-3 h-3" />
                              PDF
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-[#F0EAE3]">
                {filtered.map((tx) => {
                  const StatusIcon = STATUS_CONFIG[tx.status].icon;
                  const CategoryIcon = CATEGORY_ICONS[tx.category] || Package;
                  const sc = STATUS_CONFIG[tx.status];
                  return (
                    <div key={tx.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#007D6D]/10 flex items-center justify-center shrink-0">
                            <CategoryIcon className="w-4.5 h-4.5 text-[#007D6D]" />
                          </div>
                          <div>
                            <div className="font-bold text-[#2C221E] text-sm">{tx.service}</div>
                            <div className="text-[11px] text-[#7E6F68] font-mono">{tx.id}</div>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${sc.bg} ${sc.text}`}>
                          <StatusIcon className="w-2.5 h-2.5" /> {sc.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex gap-3 text-[#7E6F68]">
                          <span>{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>·</span>
                          <span>{tx.billing}</span>
                        </div>
                        <span className="font-mono font-extrabold text-[#2C221E]">${tx.amount}</span>
                      </div>
                      <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-[#E5DDD3] text-[#4E3E39] hover:bg-[#007D6D] hover:text-white hover:border-[#007D6D] transition-all">
                        <Download className="w-3.5 h-3.5" /> Download Invoice (PDF)
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E6F68]">
          <p>Showing {filtered.length} of {MOCK_TRANSACTIONS.length} transactions</p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="flex items-center gap-1.5 text-[#007D6D] font-semibold hover:underline">
              <ShieldCheck className="w-3.5 h-3.5" /> Dispute a charge
            </Link>
            <Link href="/services" className="flex items-center gap-1.5 text-[#007D6D] font-semibold hover:underline">
              <ArrowUpRight className="w-3.5 h-3.5" /> Explore more services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
