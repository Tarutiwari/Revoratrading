import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Revora Trading',
  description: 'Join the Revora Trading team. We\'re hiring engineers, designers, and traders.',
};

const OPEN_ROLES = [
  { title: 'Senior AI/ML Engineer', dept: 'Engineering', type: 'Full-time', location: 'Remote', tag: 'Hot 🔥' },
  { title: 'Frontend Developer (Next.js)', dept: 'Engineering', type: 'Full-time', location: 'Remote', tag: 'New' },
  { title: 'Quantitative Analyst', dept: 'Trading', type: 'Full-time', location: 'New York / Remote', tag: '' },
  { title: 'Product Designer (UI/UX)', dept: 'Design', type: 'Full-time', location: 'Remote', tag: 'New' },
  { title: 'Blockchain Developer', dept: 'Engineering', type: 'Contract', location: 'Remote', tag: '' },
  { title: 'Growth Marketing Manager', dept: 'Marketing', type: 'Full-time', location: 'Remote', tag: '' },
  { title: 'Customer Success Specialist', dept: 'Support', type: 'Part-time', location: 'Remote', tag: '' },
];

const PERKS = [
  { icon: '🌍', title: '100% Remote', desc: 'Work from anywhere in the world' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Top-of-market salaries + equity' },
  { icon: '📈', title: 'Bot Access', desc: 'Free Elite plan for all employees' },
  { icon: '🏖️', title: 'Unlimited PTO', desc: 'Take the time you need' },
  { icon: '🎓', title: 'Learning Budget', desc: '$2,000/year for courses & books' },
  { icon: '🤝', title: 'Equity Options', desc: 'Everyone owns a piece of the pie' },
];

const deptColors: Record<string, string> = {
  Engineering: 'text-emerald-300 bg-emerald-900/30 border-emerald-500/30',
  Trading: 'text-cyan-300 bg-cyan-900/30 border-cyan-500/30',
  Design: 'text-purple-300 bg-purple-900/30 border-purple-500/30',
  Marketing: 'text-amber-300 bg-amber-900/30 border-amber-500/30',
  Support: 'text-blue-300 bg-blue-900/30 border-blue-500/30',
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#050a10] text-white pt-24 pb-20">

      {/* ── Hero ── */}
      <section className="text-center px-6 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10">
          <span>🚀</span>
          <span className="text-sm text-gray-300">We&apos;re growing fast — come join us!</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Build the Future of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Trading
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Join a passionate team revolutionizing how the world trades with AI.
        </p>
      </section>

      {/* ── Perks ── */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-bold text-center mb-10">Why Work at Revora?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {PERKS.map((perk) => (
            <div key={perk.title} className="p-5 rounded-2xl bg-white/3 border border-white/8 text-center hover:border-white/20 transition-all">
              <div className="text-3xl mb-3">{perk.icon}</div>
              <div className="font-semibold text-white mb-1">{perk.title}</div>
              <div className="text-sm text-gray-400">{perk.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-2">Open Positions</h2>
        <p className="text-gray-400 mb-8">{OPEN_ROLES.length} roles available</p>

        <div className="space-y-4">
          {OPEN_ROLES.map((role) => (
            <div
              key={role.title}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-white/3 border border-white/8 hover:border-emerald-500/30 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {role.title}
                  </h3>
                  {role.tag && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {role.tag}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${deptColors[role.dept] ?? 'text-gray-300 bg-gray-800 border-gray-700'}`}>
                    {role.dept}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">{role.type}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">🌍 {role.location}</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 transition-all group-hover:border-emerald-500/60 whitespace-nowrap">
                Apply Now
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* No fit? section */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-cyan-900/10 border border-emerald-500/20 text-center">
          <h3 className="text-xl font-bold mb-2">Don&apos;t see your role?</h3>
          <p className="text-gray-400 mb-5">We&apos;re always looking for exceptional people. Send us your CV!</p>
          <a
            href="mailto:careers@revoratrading.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-xl hover:scale-105 transition-transform"
          >
            📧 careers@revoratrading.com
          </a>
        </div>
      </section>
    </main>
  );
}
