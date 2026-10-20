'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setError('Demo mode: backend auth not connected yet.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#007D6D]/8 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#C88A75]/8 blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#007D6D] to-[#005247] p-0.5 shadow-lg shadow-[#007D6D]/20 flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-[#FAF7F2] flex items-center justify-center">
                <div className="flex items-end gap-1 px-1.5">
                  <div className="w-1.5 h-3 bg-[#007D6D] rounded-sm" />
                  <div className="w-1.5 h-6 bg-[#007D6D] rounded-sm" />
                  <div className="w-1.5 h-4 bg-[#C88A75] rounded-sm" />
                </div>
              </div>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-xl tracking-tight text-[#2C221E]">REVORA TRADING</div>
              <div className="text-[10px] text-[#7E6F68] font-medium tracking-widest">TOOLS & AUTOMATION</div>
            </div>
          </Link>
          <h1 className="mt-6 text-2xl font-extrabold text-[#2C221E] tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-[#7E6F68]">Sign in to access your trading dashboard</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E5DDD3] shadow-xl shadow-[#2C221E]/5 p-8">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5DDD3] text-[#2C221E] text-sm font-semibold hover:bg-[#FAF7F2] hover:border-[#007D6D]/30 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5DDD3] text-[#2C221E] text-sm font-semibold hover:bg-[#FAF7F2] hover:border-[#007D6D]/30 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.95-5.567zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
              X (Twitter)
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5DDD3]" />
            </div>
            <div className="relative flex justify-center text-[11px]">
              <span className="bg-white px-3 text-[#7E6F68] font-medium uppercase tracking-wider">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-[#C88A75]/10 border border-[#C88A75]/30 text-[#C88A75] text-xs font-medium">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-[#2C221E] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9EB8]" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] text-[#2C221E] text-sm placeholder-[#B5A9A3] focus:outline-none focus:ring-2 focus:ring-[#007D6D]/30 focus:border-[#007D6D] transition-all"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#2C221E]">Password</label>
                <Link href="#" className="text-xs text-[#007D6D] font-semibold hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9EB8]" />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] text-[#2C221E] text-sm placeholder-[#B5A9A3] focus:outline-none focus:ring-2 focus:ring-[#007D6D]/30 focus:border-[#007D6D] transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E9EB8] hover:text-[#007D6D] transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-[#007D6D] text-white hover:bg-[#006356] transition-all shadow-lg shadow-[#007D6D]/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Signing in...</>
              ) : (
                <>Sign In to Dashboard <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[#7E6F68] mt-5">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#007D6D] font-bold hover:underline">Create one free</Link>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-[#7E6F68]">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#007D6D]" /> 256-bit SSL Encryption</span>
          <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-[#007D6D]" /> Non-custodial API</span>
        </div>
      </div>
    </div>
  );
}
