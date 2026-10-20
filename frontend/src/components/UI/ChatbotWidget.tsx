'use client';

import { useState, useRef, useEffect } from 'react';

// ─── Message Type ─────────────────────────────────────────────────────────────
interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, role: 'bot', text: "👋 Hey! I'm Revora AI. How can I help you today?" },
];

const QUICK_REPLIES = ['View Trading Bots', 'Pricing Plans', 'How it works', 'Contact Support'];

// ─── Chatbot Widget ───────────────────────────────────────────────────────────
export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Clear unread when opened
  useEffect(() => {
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  // Simulate bot reply
  const getBotReply = (userMsg: string): string => {
    const msg = userMsg.toLowerCase();
    if (msg.includes('bot') || msg.includes('trading')) return "🤖 We offer 50+ AI trading bots! Head to our Services page to explore them all.";
    if (msg.includes('price') || msg.includes('plan') || msg.includes('pricing')) return "💰 We have Free, Pro ($29/mo), and Elite ($99/mo) plans. Check our Services page for details!";
    if (msg.includes('how') || msg.includes('work')) return "⚡ Simple! 1) Choose a bot, 2) Download it, 3) Connect your exchange API, 4) Let it trade 24/7!";
    if (msg.includes('contact') || msg.includes('support')) return "📧 You can reach us at support@revoratrading.com or visit our Contact page!";
    if (msg.includes('career') || msg.includes('job')) return "🚀 We're hiring! Visit our Careers page to see open positions.";
    return "🤔 Great question! For detailed info, you can explore our pages or email us at support@revoratrading.com.";
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, role: 'bot', text: getBotReply(text) };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip */}
        {!isOpen && (
          <div className="bg-[#0d1117] border border-white/10 text-white text-sm px-3 py-2 rounded-xl shadow-lg animate-bounce-slow whitespace-nowrap">
            💬 Ask Revora AI
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          id="chatbot-toggle"
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-emerald-500/40 hover:shadow-emerald-500/70 hover:scale-110 transition-all duration-300"
          aria-label="Open chatbot"
        >
          {/* Unread badge */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
          )}

          {/* Icon */}
          <svg
            className={`w-6 h-6 text-black transition-all duration-300 ${isOpen ? 'rotate-180 scale-75' : ''}`}
            fill={isOpen ? 'none' : 'currentColor'}
            stroke={isOpen ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            )}
          </svg>
        </button>
      </div>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 flex flex-col"
          style={{ maxHeight: '70vh' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-black/30 flex items-center justify-center text-xl">🤖</div>
            <div>
              <div className="font-bold text-white text-sm">Revora AI</div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-100">
                <span className="w-2 h-2 rounded-full bg-green-300 inline-block animate-pulse" />
                Online · Typically replies instantly
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#0a0f1a] p-4 space-y-3" style={{ minHeight: '280px', maxHeight: '360px' }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-black font-medium rounded-tr-sm'
                      : 'bg-white/8 border border-white/10 text-gray-200 rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/8 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="bg-[#0a0f1a] px-4 pb-2 flex flex-wrap gap-2">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="text-xs px-3 py-1.5 rounded-full border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 transition-all duration-200"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="bg-[#0d1117] border-t border-white/10 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all"
              id="chatbot-input"
            />
            <button
              onClick={() => sendMessage(input)}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
              disabled={!input.trim()}
            >
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
