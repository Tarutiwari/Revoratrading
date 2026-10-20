import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upcoming Features | Revora Trading',
  description: 'Sneak peek at upcoming features and innovations coming to Revora Trading.',
};

const UPCOMING = [
  {
    eta: 'Q1 2025',
    status: 'In Development',
    statusColor: 'text-emerald-300 bg-emerald-900/40 border-emerald-500/30',
    title: 'Mobile App (iOS & Android)',
    desc: 'Full-featured mobile app to monitor and control your bots from anywhere in the world.',
    icon: '📱',
    progress: 75,
  },
  {
    eta: 'Q1 2025',
    status: 'Beta Soon',
    statusColor: 'text-cyan-300 bg-cyan-900/40 border-cyan-500/30',
    title: 'Social Trading',
    desc: 'Copy top traders\' strategies automatically. Follow, rate, and learn from the best.',
    icon: '👥',
    progress: 55,
  },
  {
    eta: 'Q2 2025',
    status: 'In Design',
    statusColor: 'text-purple-300 bg-purple-900/40 border-purple-500/30',
    title: 'NFT Bot Marketplace',
    desc: 'Trade and collect unique AI bot strategies as NFTs on our decentralized marketplace.',
    icon: '🎨',
    progress: 30,
  },
  {
    eta: 'Q2 2025',
    status: 'In Design',
    statusColor: 'text-amber-300 bg-amber-900/40 border-amber-500/30',
    title: 'DeFi Protocol Integration',
    desc: 'Direct integration with major DeFi protocols — Uniswap, Aave, Compound, and more.',
    icon: '🔗',
    progress: 25,
  },
  {
    eta: 'Q3 2025',
    status: 'Planned',
    statusColor: 'text-gray-300 bg-gray-900/40 border-gray-500/30',
    title: 'GPT-5 Powered Advisor',
    desc: 'An AI personal trading advisor that learns your risk profile and suggests optimal strategies.',
    icon: '🧠',
    progress: 10,
  },
  {
    eta: 'Q3 2025',
    status: 'Planned',
    statusColor: 'text-gray-300 bg-gray-900/40 border-gray-500/30',
    title: 'Multi-Account Manager',
    desc: 'Manage multiple trading accounts and portfolios from a single unified dashboard.',
    icon: '🗂️',
    progress: 10,
  },
];

export default function UpcomingPage() {
  return (
    <main className="min-h-screen bg-[#050a10] text-white pt-24 pb-20">

      {/* ── Hero ── */}
      <section className="text-center px-6 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10">
          <span className="text-lg">🚀</span>
          <span className="text-sm text-gray-300">Roadmap 2025</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          What&apos;s{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">
            Coming Next
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          We&apos;re constantly building. Here&apos;s a sneak peek at what&apos;s in our pipeline.
        </p>
      </section>

      {/* ── Timeline Cards ── */}
      <section className="max-w-4xl mx-auto px-6 space-y-6">
        {UPCOMING.map((item, i) => (
          <div
            key={i}
            className="group relative p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                {item.icon}
              </div>

              <div className="flex-1">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${item.statusColor}`}>
                    {item.status}
                  </span>
                  <span className="ml-auto text-xs text-gray-500 font-mono">{item.eta}</span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.desc}</p>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{item.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="text-center mt-20 px-6">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-3">Stay in the Loop</h2>
          <p className="text-gray-400 mb-6">Get notified when new features go live.</p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
            <button className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-xl hover:from-emerald-400 hover:to-cyan-400 transition-all text-sm whitespace-nowrap">
              Notify Me
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
