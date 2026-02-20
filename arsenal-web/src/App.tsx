type Match = {
  date: string
  competition: string
  home: string
  away: string
  score?: string
  review?: string
}

const recentMatches: Match[] = [
  {
    date: '2026-02-18',
    competition: 'Premier League',
    home: 'Wolverhampton Wanderers',
    away: 'Arsenal',
    score: '2-2',
    review:
      'Arsenal raced into a two-goal lead but conceded a late equaliser. Media reaction focused on game management and dropped title-race points.',
  },
  {
    date: '2026-02-12',
    competition: 'Premier League',
    home: 'Brentford',
    away: 'Arsenal',
    score: '1-1',
    review:
      'A stubborn away draw. Arsenal controlled phases but lacked a clinical final touch in key moments.',
  },
  {
    date: '2026-02-07',
    competition: 'Premier League',
    home: 'Arsenal',
    away: 'Sunderland',
    score: '3-0',
    review:
      'A comfortable win built on fast wing play and strong pressing. Defensive shape stayed solid throughout.',
  },
]

const upcomingMatches: Match[] = [
  {
    date: '2026-02-22',
    competition: 'Premier League',
    home: 'Tottenham Hotspur',
    away: 'Arsenal',
  },
  {
    date: '2026-03-01',
    competition: 'Premier League',
    home: 'Arsenal',
    away: 'Chelsea',
  },
  {
    date: '2026-03-04',
    competition: 'Premier League',
    home: 'Brighton & Hove Albion',
    away: 'Arsenal',
  },
]

function prettyDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function MatchCard({ match, showReview }: { match: Match; showReview?: boolean }) {
  return (
    <article className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-600">{prettyDate(match.date)} · {match.competition}</p>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">
        {match.home} <span aria-hidden="true">vs</span> {match.away}
      </h3>
      {match.score && (
        <p className="mt-2 text-base font-medium text-red-700" aria-label={`Final score ${match.score}`}>
          FT: {match.score}
        </p>
      )}
      {showReview && match.review && <p className="mt-3 text-slate-800">{match.review}</p>}
    </article>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded bg-white px-3 py-2"
      >
        Skip to content
      </a>

      <header className="border-b border-slate-300 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <p className="text-sm font-medium uppercase tracking-wide text-red-700">Arsenal Tracker</p>
          <h1 className="mt-1 text-3xl font-bold">Recent match reviews & upcoming fixtures</h1>
          <p className="mt-2 text-slate-700">Simple mobile-friendly dashboard. Built with React + TypeScript + Tailwind CSS.</p>
        </div>
      </header>

      <main id="main-content" className="mx-auto grid max-w-4xl gap-8 px-4 py-8 md:grid-cols-2">
        <section aria-labelledby="recent-heading">
          <h2 id="recent-heading" className="mb-4 text-2xl font-semibold">Recent reviews</h2>
          <div className="space-y-4">
            {recentMatches.map((m) => (
              <MatchCard key={`${m.date}-${m.home}`} match={m} showReview />
            ))}
          </div>
        </section>

        <section aria-labelledby="upcoming-heading">
          <h2 id="upcoming-heading" className="mb-4 text-2xl font-semibold">Upcoming games</h2>
          <div className="space-y-4">
            {upcomingMatches.map((m) => (
              <MatchCard key={`${m.date}-${m.home}`} match={m} />
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-4xl px-4 pb-8 text-sm text-slate-600">
        <p>
          Last updated manually from recent reporting and fixture lists. If you want, I can wire this to a live football API next.
        </p>
      </footer>
    </div>
  )
}
