'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Clock, Send, CheckCircle2, Zap, ShieldCheck, ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'How do I connect my broker to Revora Trading bots?',
    a: 'After signup, go to your Dashboard → Broker Settings. Enter your MT4/MT5 broker server, login ID and investor password (read-only, we never request withdraw access). Binance & Bybit connect via API key + secret.',
  },
  {
    q: 'Are my funds safe? Does Revora hold my money?',
    a: 'No. Revora is 100% non-custodial. We only use read/trade permissions — never withdrawal permissions. Your funds stay in your own brokerage account at all times.',
  },
  {
    q: 'How quickly do I receive trading signals?',
    a: 'Signals are pushed instantly via Telegram and displayed live on the dashboard. Typical latency from signal generation to delivery is under 3 seconds.',
  },
  {
    q: 'Can I cancel my subscription at any time?',
    a: 'Yes. All plans are month-to-month. Cancel before your next billing date from your account settings — no cancellation fees, no questions asked.',
  },
  {
    q: 'What is the refund policy?',
    a: 'We offer a 7-day satisfaction guarantee. If you are not satisfied within the first 7 days, contact support and we will issue a full refund.',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#007D6D]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#007D6D]/10 text-[#007D6D] text-xs font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            Support & Contact
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2C221E] tracking-tight">
            We&apos;re here to help
          </h1>
          <p className="mt-3 text-base text-[#7E6F68] max-w-xl mx-auto leading-relaxed">
            Have a question about our trading tools, billing, or technical setup? Our team typically responds within 2 hours during market hours.
          </p>
        </div>

        {/* Contact Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {[
            { icon: Mail, title: 'Email Support', detail: 'support@revoratrading.com', sub: 'Reply within 2 hours', color: '#007D6D' },
            { icon: Phone, title: 'WhatsApp & Telegram', detail: '+1 (800) REVORA-1', sub: 'Mon–Fri, 9 AM – 8 PM UTC', color: '#007D6D' },
            { icon: Clock, title: 'Live Chat', detail: 'Available on Dashboard', sub: 'For active subscribers', color: '#8E9EB8' },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-2xl border border-[#E5DDD3] p-6 flex items-start gap-4 shadow-sm hover:shadow-md hover:border-[#007D6D]/30 transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${card.color}15` }}>
                <card.icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
              <div>
                <div className="font-bold text-sm text-[#2C221E]">{card.title}</div>
                <div className="text-sm text-[#007D6D] font-semibold mt-0.5">{card.detail}</div>
                <div className="text-xs text-[#7E6F68] mt-0.5">{card.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-extrabold text-[#2C221E] mb-6">Send us a message</h2>

            {sent ? (
              <div className="bg-[#007D6D]/8 border border-[#007D6D]/30 rounded-3xl p-10 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#007D6D] mx-auto mb-4" />
                <h3 className="text-xl font-extrabold text-[#2C221E] mb-2">Message Received!</h3>
                <p className="text-sm text-[#7E6F68] leading-relaxed">
                  Thank you, <strong>{form.name}</strong>. We&apos;ll reply to <strong>{form.email}</strong> within 2 hours during business hours.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 px-6 py-2.5 rounded-xl text-sm font-bold bg-[#007D6D] text-white hover:bg-[#006356] transition-all">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2C221E] mb-1.5">Full Name *</label>
                    <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" required
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] text-[#2C221E] text-sm placeholder-[#B5A9A3] focus:outline-none focus:ring-2 focus:ring-[#007D6D]/30 focus:border-[#007D6D] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2C221E] mb-1.5">Email Address *</label>
                    <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] text-[#2C221E] text-sm placeholder-[#B5A9A3] focus:outline-none focus:ring-2 focus:ring-[#007D6D]/30 focus:border-[#007D6D] transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C221E] mb-1.5">Subject</label>
                  <select id="contact-subject" name="subject" value={form.subject} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] text-[#2C221E] text-sm focus:outline-none focus:ring-2 focus:ring-[#007D6D]/30 focus:border-[#007D6D] transition-all">
                    <option value="">Select a topic...</option>
                    <option value="billing">Billing & Subscription</option>
                    <option value="technical">Technical Support</option>
                    <option value="broker">Broker Connection Help</option>
                    <option value="signals">Signal Queries</option>
                    <option value="bots">Trading Bot Setup</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C221E] mb-1.5">Message *</label>
                  <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} rows={6} placeholder="Describe your issue or question in detail..." required
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] text-[#2C221E] text-sm placeholder-[#B5A9A3] focus:outline-none focus:ring-2 focus:ring-[#007D6D]/30 focus:border-[#007D6D] transition-all resize-none" />
                </div>

                <button id="contact-submit" type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-[#007D6D] text-white hover:bg-[#006356] transition-all shadow-lg shadow-[#007D6D]/20 disabled:opacity-60">
                  {loading ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" />Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-extrabold text-[#2C221E] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#E5DDD3] overflow-hidden shadow-sm hover:border-[#007D6D]/30 transition-all">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                    id={`faq-${i}`}
                  >
                    <span className="text-sm font-bold text-[#2C221E] leading-snug">{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#007D6D] shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-[#7E6F68] leading-relaxed border-t border-[#E5DDD3] pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-[#007D6D]/10 to-[#8E9EB8]/10 border border-[#007D6D]/15">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-[#007D6D]" />
                <span className="font-bold text-sm text-[#2C221E]">Quick Support Links</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  'Broker Setup Guides (MT4/MT5, Binance)',
                  'Bot Strategy Documentation',
                  'Signal Interpretation Guide',
                  'Risk Management Best Practices',
                ].map((link) => (
                  <div key={link} className="flex items-center gap-2 text-[#007D6D] font-semibold hover:underline cursor-pointer">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> {link}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Office / Location */}
        <div className="mt-14 p-6 bg-white rounded-3xl border border-[#E5DDD3] shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-[#007D6D]/10 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-[#007D6D]" />
          </div>
          <div>
            <div className="font-bold text-[#2C221E] text-sm">Revora Trading Technologies Inc.</div>
            <div className="text-xs text-[#7E6F68] mt-0.5">123 Financial District, Suite 400 · New York, NY 10004, USA</div>
            <div className="text-xs text-[#7E6F68]">Registered & Regulated · All data protected under GDPR & CCPA</div>
          </div>
          <div className="sm:ml-auto text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#007D6D]/10 text-[#007D6D] text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#007D6D] animate-pulse" />
              System Status: All Operational
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
