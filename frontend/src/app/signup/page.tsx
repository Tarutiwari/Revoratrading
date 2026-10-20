'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2, Phone } from 'lucide-react';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('Please accept the Terms of Service to continue.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setError('Demo mode: backend auth not connected yet.');
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { level: 1, label: 'Weak', color: '#C88A75' };
    if (p.length < 10 || !/[A-Z]/.test(p) || !/\d/.test(p)) return { level: 2, label: 'Fair', color: '#D49B74' };
    return { level: 3, label: 'Strong', color: '#007D6D' };
  };
  const strength = passwordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#007D6D]/8 blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#8E9EB8]/8 blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="w-full max-w-lg relative z-10">
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
          <h1 className="mt-6 text-2xl font-extrabold text-[#2C221E] tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-[#7E6F68]">Start trading smarter with automated bots & live signals</p>
        </div>

        {/* Benefit Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['Free 7-day trial', 'No credit card needed', 'Cancel anytime'].map((b) => (
            <span key={b} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#007D6D]/10 text-[#007D6D] text-[11px] font-semibold border border-[#007D6D]/15">
              <CheckCircle2 className="w-3 h-3" /> {b}
            </span>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-[#E5DDD3] shadow-xl shadow-[#2C221E]/5 p-8">
          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5DDD3] text-[#2C221E] text-sm font-semibold hover:bg-[#FAF7F2] hover:border-[#007D6D]/30 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5DDD3] text-[#2C221E] text-sm font-semibold hover:bg-[#FAF7F2] hover:border-[#007D6D]/30 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.95-5.567zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
              Sign up with X
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E5DDD3]" /></div>
            <div className="relative flex justify-center text-[11px]">
              <span className="bg-white px-3 text-[#7E6F68] font-medium uppercase tracking-wider">or register with email</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-[#C88A75]/10 border border-[#C88A75]/30 text-[#C88A75] text-xs font-medium">{error}</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9EB8]" />
                  <input id="signup-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="John Smith"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] text-[#2C221E] text-sm placeholder-[#B5A9A3] focus:outline-none focus:ring-2 focus:ring-[#007D6D]/30 focus:border-[#007D6D] transition-all" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1.5">Phone (optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9EB8]" />
                  <input id="signup-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] text-[#2C221E] text-sm placeholder-[#B5A9A3] focus:outline-none focus:ring-2 focus:ring-[#007D6D]/30 focus:border-[#007D6D] transition-all" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#2C221E] mb-1.5">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9EB8]" />
                <input id="signup-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] text-[#2C221E] text-sm placeholder-[#B5A9A3] focus:outline-none focus:ring-2 focus:ring-[#007D6D]/30 focus:border-[#007D6D] transition-all" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#2C221E] mb-1.5">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9EB8]" />
                <input id="signup-password" name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] text-[#2C221E] text-sm placeholder-[#B5A9A3] focus:outline-none focus:ring-2 focus:ring-[#007D6D]/30 focus:border-[#007D6D] transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E9EB8] hover:text-[#007D6D] transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {strength && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all" style={{ backgroundColor: i <= strength.level ? strength.color : '#E5DDD3' }} />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold" style={{ color: strength.color }}>{strength.label}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-[#2C221E] mb-1.5">Confirm Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9EB8]" />
                <input id="signup-confirm" name="confirm" type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={handleChange} placeholder="Re-enter password"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-[#FAF7F2] text-[#2C221E] text-sm placeholder-[#B5A9A3] focus:outline-none focus:ring-2 transition-all ${
                    form.confirm && form.confirm !== form.password
                      ? 'border-[#C88A75] focus:ring-[#C88A75]/30 focus:border-[#C88A75]'
                      : 'border-[#E5DDD3] focus:ring-[#007D6D]/30 focus:border-[#007D6D]'
                  }`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E9EB8] hover:text-[#007D6D] transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input id="signup-terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[#E5DDD3] accent-[#007D6D] cursor-pointer" />
              <label htmlFor="signup-terms" className="text-xs text-[#7E6F68] leading-relaxed cursor-pointer">
                I agree to Revora&apos;s{' '}
                <Link href="#" className="text-[#007D6D] font-semibold hover:underline">Terms of Service</Link> and{' '}
                <Link href="#" className="text-[#007D6D] font-semibold hover:underline">Privacy Policy</Link>. I understand trading involves risk of capital loss.
              </label>
            </div>

            <button
              id="signup-submit"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-[#007D6D] text-white hover:bg-[#006356] transition-all shadow-lg shadow-[#007D6D]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating Account...</>
              ) : (
                <>Create Free Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[#7E6F68] mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-[#007D6D] font-bold hover:underline">Sign in</Link>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-[#7E6F68]">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#007D6D]" /> Your data is encrypted</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#007D6D]" /> No broker credentials stored</span>
        </div>
      </div>
    </div>
  );
}
