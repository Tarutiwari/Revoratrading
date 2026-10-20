'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  Layers,
  LogIn,
  UserPlus,
  Receipt,
  HeadphonesIcon,
  ChevronDown,
  User,
  LogOut,
} from 'lucide-react';

// Demo: swap this to a real auth context hook when backend is ready
const useAuthDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return { isLoggedIn, setIsLoggedIn };
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const pathname = usePathname();

  // Replace with real auth context
  const { isLoggedIn, setIsLoggedIn } = useAuthDemo();

  const navLinks = [
    { name: 'Calculators & Tools', href: '/tools', icon: Layers },
    { name: 'Services & Plans', href: '/services', icon: ShieldCheck },
    { name: 'Contact & Support', href: '/contact', icon: HeadphonesIcon },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5DDD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#007D6D] to-[#005247] p-0.5 shadow-md shadow-[#007D6D]/15 flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-[10px] bg-[#FAF7F2] flex items-center justify-center">
                <div className="flex items-end gap-1 px-1">
                  <div className="w-1.5 h-3 bg-[#007D6D] rounded-sm" />
                  <div className="w-1.5 h-6 bg-[#007D6D] rounded-sm" />
                  <div className="w-1.5 h-4 bg-[#C88A75] rounded-sm" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#2C221E]">REVORA</span>
                <span className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#007D6D]/10 text-[#007D6D] border border-[#007D6D]/20">TRADING</span>
              </div>
              <p className="text-[10px] tracking-wider text-[#7E6F68] font-medium -mt-1">TOOLS & AUTOMATION</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#007D6D]/10 text-[#007D6D]'
                      : 'text-[#4E3E39] hover:text-[#007D6D] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#8E9EB8]" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {isLoggedIn ? (
              /* Logged-in Account Menu */
              <div className="relative">
                <button
                  id="account-menu-btn"
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E5DDD3] bg-white hover:border-[#007D6D]/40 hover:bg-[#FAF7F2] transition-all text-xs font-semibold text-[#2C221E]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#007D6D] flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  My Account
                  <ChevronDown className={`w-3.5 h-3.5 text-[#8E9EB8] transition-transform ${accountOpen ? 'rotate-180' : ''}`} />
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl border border-[#E5DDD3] shadow-xl shadow-[#2C221E]/10 py-2 z-50">
                    <Link href="/history" onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#2C221E] hover:bg-[#FAF7F2] hover:text-[#007D6D] transition-colors">
                      <Receipt className="w-4 h-4 text-[#8E9EB8]" /> Transaction History
                    </Link>
                    <Link href="/contact" onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#2C221E] hover:bg-[#FAF7F2] hover:text-[#007D6D] transition-colors">
                      <HeadphonesIcon className="w-4 h-4 text-[#8E9EB8]" /> Support
                    </Link>
                    <div className="my-1 border-t border-[#E5DDD3]" />
                    <button
                      onClick={() => { setIsLoggedIn(false); setAccountOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#C88A75] hover:bg-[#C88A75]/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Guest Auth Buttons */
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-[#E5DDD3] text-[#2C221E] hover:bg-[#F2ECE1] hover:border-[#007D6D]/30 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#007D6D]" /> Log In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#007D6D] text-white hover:bg-[#006356] transition-all shadow-sm hover:shadow-md hover:shadow-[#007D6D]/20"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Sign Up Free
                </Link>
                <Link
                  href="/services"
                  className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-[#007D6D]/30 text-[#007D6D] hover:bg-[#007D6D]/5 transition-all"
                >
                  Plans <ArrowRight className="w-3 h-3" />
                </Link>
              </>
            )}

            {/* Demo toggle for testing */}
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="hidden text-[10px] text-[#B5A9A3] px-2 py-1 rounded border border-dashed border-[#E5DDD3] hover:border-[#007D6D]/30 transition-colors"
              title="Demo: Toggle login state"
            >
              demo
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="xl:hidden flex items-center gap-2">
            {!isLoggedIn && (
              <Link href="/login" className="sm:hidden flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border border-[#E5DDD3] text-[#2C221E]">
                <LogIn className="w-3.5 h-3.5 text-[#007D6D]" /> Log In
              </Link>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-[#4E3E39] hover:bg-[#F2ECE1] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-[#E5DDD3] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#2C221E] hover:bg-[#F2ECE1]"
              >
                <Icon className="w-4 h-4 text-[#007D6D]" />
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#E5DDD3] space-y-2">
            {isLoggedIn ? (
              <>
                <Link href="/history" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#2C221E] hover:bg-[#F2ECE1]">
                  <Receipt className="w-4 h-4 text-[#007D6D]" /> Transaction History
                </Link>
                <button onClick={() => { setIsLoggedIn(false); setMobileOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#C88A75] hover:bg-[#C88A75]/5">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border border-[#E5DDD3] text-[#2C221E] hover:bg-[#F2ECE1]">
                  <LogIn className="w-3.5 h-3.5 text-[#007D6D]" /> Log In
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-[#007D6D] text-white">
                  <UserPlus className="w-3.5 h-3.5" /> Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
