import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

type Match = {
  date: string
  competition: string
  home: string
  away: string
  score?: string
  review?: string
}

type Episode = {
  no: number
  title: string
  summary: string
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

const episodeList: Episode[] = [
  { no: 1, title: '初到小巷', summary: '两家人在小巷相识，生活背景与性格差异逐渐显现。' },
  { no: 2, title: '邻里之间', summary: '日常摩擦与互相照应并存，小巷的人情味慢慢建立。' },
  { no: 3, title: '家里家外', summary: '家庭分工与现实压力浮现，人物关系开始出现张力。' },
  { no: 4, title: '一次误会', summary: '一场误会引发争执，也让彼此看见对方真实处境。' },
  { no: 5, title: '站在岔路口', summary: '关于工作与未来的选择摆在眼前，家人意见不一。' },
  { no: 6, title: '旧事重提', summary: '过去的经历被重新提起，影响到当下的信任关系。' },
  { no: 7, title: '为孩子打算', summary: '围绕孩子教育与成长方向，几位大人展开拉扯。' },
  { no: 8, title: '风雨将至', summary: '外部变化带来不安，小巷里人人都在调整节奏。' },
  { no: 9, title: '硬着头皮前行', summary: '面对困难，角色们尝试用各自方式撑住生活。' },
  { no: 10, title: '转机与代价', summary: '机会出现的同时也伴随代价，关系再度被考验。' },
  { no: 11, title: '说不开的话', summary: '一些话没说出口，误解在沉默里继续累积。' },
  { no: 12, title: '谁先让一步', summary: '冲突进入白热化，是否妥协成为关键。' },
  { no: 13, title: '彼此体谅', summary: '在现实磨合中，人物开始重新理解彼此。' },
  { no: 14, title: '守住体面', summary: '面对外界压力，家庭想守住尊严与底线。' },
  { no: 15, title: '最难的一天', summary: '突发事件打乱计划，关系与责任被重新分配。' },
  { no: 16, title: '低谷之后', summary: '情绪落到谷底后，大家尝试重建秩序。' },
  { no: 17, title: '新的机会', summary: '一条新路出现，角色对未来有了不同想法。' },
  { no: 18, title: '旧观念新问题', summary: '代际观念碰撞加剧，家庭沟通难度升级。' },
  { no: 19, title: '为爱争取', summary: '情感线推进，人物为重要关系做出选择。' },
  { no: 20, title: '小巷夜谈', summary: '一场长谈拉近距离，也揭开更多真实心声。' },
  { no: 21, title: '风向变化', summary: '生活环境再起变化，大家不得不重新规划。' },
  { no: 22, title: '各有坚持', summary: '不同立场都在坚持，矛盾进入僵持阶段。' },
  { no: 23, title: '不愿放弃', summary: '面对挫折，角色们开始主动争取想要的生活。' },
  { no: 24, title: '一次和解', summary: '旧怨得到部分化解，关系出现回暖迹象。' },
  { no: 25, title: '新的难题', summary: '问题解决后又有新挑战，平衡变得更难。' },
  { no: 26, title: '走出去', summary: '有人尝试离开熟悉环境，探索更大的可能。' },
  { no: 27, title: '留下的人', summary: '留下的人承担更多现实压力，也更显韧性。' },
  { no: 28, title: '再见与再会', summary: '离别与重逢交织，情感关系进入新阶段。' },
  { no: 29, title: '局面反转', summary: '关键决定带来反转，角色命运方向改变。' },
  { no: 30, title: '把话说明白', summary: '隐藏的情绪与真相被摊开，冲突得到正面回应。' },
  { no: 31, title: '共担风雨', summary: '在困境中重新结盟，家庭凝聚力增强。' },
  { no: 32, title: '各自成长', summary: '人物在经历后成熟，处理问题方式更稳。' },
  { no: 33, title: '决定未来', summary: '关于事业、家庭、感情的长期选择正式落地。' },
  { no: 34, title: '背后的牺牲', summary: '看似平静的生活背后，牺牲与成全被看见。' },
  { no: 35, title: '一次告别', summary: '重要节点上的告别让大家重新审视初心。' },
  { no: 36, title: '重新出发', summary: '带着遗憾和希望，角色们迈向下一阶段。' },
  { no: 37, title: '回到小巷', summary: '回到熟悉场景后，过去与现在形成对照。' },
  { no: 38, title: '终于懂得', summary: '多年心结逐步解开，关系更加坦诚。' },
  { no: 39, title: '守住我们', summary: '面对最后考验，大家选择守住彼此与家庭。' },
  { no: 40, title: '小巷人家', summary: '主线收束，角色在现实中找到属于自己的位置。' },
]

function prettyDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function readWatchedMap(): Record<number, boolean> {
  try {
    const raw = localStorage.getItem('xiaoxiang-watched-v1')
    if (!raw) return {}
    return JSON.parse(raw) as Record<number, boolean>
  } catch {
    return {}
  }
}

function saveWatchedMap(map: Record<number, boolean>) {
  localStorage.setItem('xiaoxiang-watched-v1', JSON.stringify(map))
}

function MatchCard({ match, showReview }: { match: Match; showReview?: boolean }) {
  return (
    <article className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-600">
        {prettyDate(match.date)} · {match.competition}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">
        {match.home} <span aria-hidden="true">vs</span> {match.away}
      </h3>
      {match.score && <p className="mt-2 text-base font-medium text-red-700">FT: {match.score}</p>}
      {showReview && match.review && <p className="mt-3 text-slate-800">{match.review}</p>}
    </article>
  )
}

function ArsenalPage() {
  return (
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
  )
}

function XiaoXiangPage() {
  const [watchedMap, setWatchedMap] = useState<Record<number, boolean>>(() => readWatchedMap())
  const watchedCount = useMemo(() => Object.values(watchedMap).filter(Boolean).length, [watchedMap])

  function toggleEpisode(no: number) {
    setWatchedMap((prev) => {
      const next = { ...prev, [no]: !prev[no] }
      saveWatchedMap(next)
      return next
    })
  }

  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-8">
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
        <h2 className="text-2xl font-semibold text-rose-900">小巷人家 · 追剧清单</h2>
        <p className="mt-2 text-rose-800">已看 <strong>{watchedCount}</strong> / {episodeList.length} 集（保存在本机浏览器）</p>
      </section>
      <section className="mt-6 space-y-3">
        {episodeList.map((ep) => {
          const checked = !!watchedMap[ep.no]
          return (
            <article key={ep.no} className={`rounded-xl border p-4 shadow-sm ${checked ? 'border-green-300 bg-green-50' : 'border-slate-300 bg-white'}`}>
              <div className="flex items-start gap-3">
                <input id={`ep-${ep.no}`} type="checkbox" checked={checked} onChange={() => toggleEpisode(ep.no)} className="mt-1 h-5 w-5" />
                <div>
                  <label htmlFor={`ep-${ep.no}`} className="cursor-pointer text-lg font-semibold text-slate-900">第 {ep.no} 集 · {ep.title}</label>
                  <p className="mt-1 text-slate-700">{ep.summary}</p>
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}

function MingDaoSkewerPage() {
  const flavorTags = [
    '外焦里嫩',
    '咸香入骨',
    '炭火香气',
    '越嚼越香',
    '一口上头',
  ]

  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-8">
      <section className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-100 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">明道肉串研究所</p>
        <h2 className="mt-2 text-3xl font-bold text-amber-950">这串，不讲武德地好吃</h2>
        <p className="mt-3 text-lg text-amber-900">
          第一口先是炭火香打头阵，第二口肉汁直接接管味蕾，第三口开始认真思考：
          <strong>为什么不一次买二十串？</strong>
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2" aria-label="flavor notes">
        {flavorTags.map((tag) => (
          <article key={tag} className="rounded-xl border border-amber-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-amber-900">{tag}</h3>
            <p className="mt-1 text-slate-700">吃的时候安静两秒，是对这串肉最基本的尊重。</p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-xl font-semibold">今日结论</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-800">
          <li>明道肉串是那种“本来只想尝一口，最后拿签子算账”的类型。</li>
          <li>适合朋友局、家庭局、以及“今天必须奖励自己局”。</li>
          <li>建议搭配：可乐 / 冰啤 / 开心聊天。</li>
        </ul>
      </section>


    </main>
  )
}

function NavigationPage() {
  const cards = [
    { title: 'Arsenal', desc: '比赛回顾和赛程', href: '/arsenal' },
    { title: '小巷人家追剧', desc: '40 集追剧清单打勾', href: '/xiaoxiang' },
    { title: '明道肉串', desc: '轻松页面', href: '/mingdao' },
    { title: 'AI Token 价格趋势', desc: '各厂商价格与图表', href: '/ai-pricing' },
    { title: 'Token 用量看板', desc: '会话用量近似快照', href: '/token-usage' },
  ]

  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold">站点导航</h2>
        <p className="mt-2 text-slate-700">你可以从这里自由进入各个 tab / 页面。</p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.href} to={c.href} className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm hover:border-slate-400 hover:shadow transition">
            <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
            <p className="mt-1 text-slate-700">{c.desc}</p>
            <p className="mt-3 text-sm text-blue-700">打开 {c.href}</p>
          </Link>
        ))}
      </section>
    </main>
  )
}

function AiPricingPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold">AI Token 价格趋势</h2>
        <p className="mt-2 text-slate-700">已恢复完整图表（含厂商多选、Input/Output 切换）。</p>
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <iframe
          title="AI Token Pricing"
          src="/ai-token-pricing.html"
          className="h-[920px] w-full"
        />
      </section>
    </main>
  )
}

type UsageData = {
  updatedAt?: string
  tokens?: { input?: number; output?: number }
  quota?: { window5h?: { leftPercent?: number }; day?: { leftPercent?: number } }
}

function TokenUsagePage() {
  const [data, setData] = useState<UsageData | null>(null)

  async function load() {
    const res = await fetch(`/api/usage.json?t=${Date.now()}`)
    const json = (await res.json()) as UsageData
    setData(json)
  }

  useEffect(() => {
    void load()
  }, [])

  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold">Token 用量看板</h2>
        <p className="mt-2 text-slate-700">每次对话后更新快照（近似值）。</p>
        <button onClick={() => void load()} className="mt-3 rounded-md bg-slate-900 px-3 py-2 text-sm text-white">刷新</button>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="text-xs text-slate-500">Input</div><div className="text-2xl font-bold">{data?.tokens?.input ?? '-'}</div></div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="text-xs text-slate-500">Output</div><div className="text-2xl font-bold">{data?.tokens?.output ?? '-'}</div></div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="text-xs text-slate-500">5h 剩余</div><div className="text-2xl font-bold">{data?.quota?.window5h?.leftPercent ?? '-'}%</div></div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="text-xs text-slate-500">Day 剩余</div><div className="text-2xl font-bold">{data?.quota?.day?.leftPercent ?? '-'}%</div></div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-sm text-slate-700">
        最后更新时间：{data?.updatedAt ?? '-'}
      </section>
    </main>
  )
}

function Layout() {
  const { pathname } = useLocation()
  const isNav = pathname.startsWith('/nav')
  const isArsenal = pathname.startsWith('/arsenal')
  const isXiaoXiang = pathname.startsWith('/xiaoxiang')
  const isMingdao = pathname.startsWith('/mingdao')
  const isPricing = pathname.startsWith('/ai-pricing')
  const isUsage = pathname.startsWith('/token-usage')

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-300 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <h1 className="text-3xl font-bold">XC 的个人网站</h1>
          <p className="mt-2 text-slate-700">Arsenal 只是其中一个 Tab，其他模块也会持续加入</p>
          <nav className="mt-4" aria-label="Main tabs">
            <div className="inline-flex flex-wrap rounded-lg border border-slate-300 bg-slate-50 p-1">
              <Link to="/nav" className={`rounded-md px-4 py-2 text-sm font-medium ${isNav ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-700'}`}>导航</Link>
              <Link to="/arsenal" className={`rounded-md px-4 py-2 text-sm font-medium ${isArsenal ? 'bg-white text-red-700 shadow-sm' : 'text-slate-700'}`}>Arsenal</Link>
              <Link to="/xiaoxiang" className={`rounded-md px-4 py-2 text-sm font-medium ${isXiaoXiang ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-700'}`}>小巷人家追剧</Link>
              <Link to="/mingdao" className={`rounded-md px-4 py-2 text-sm font-medium ${isMingdao ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-700'}`}>明道肉串</Link>
              <Link to="/ai-pricing" className={`rounded-md px-4 py-2 text-sm font-medium ${isPricing ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-700'}`}>AI Token 价格</Link>
              <Link to="/token-usage" className={`rounded-md px-4 py-2 text-sm font-medium ${isUsage ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-700'}`}>Token 用量</Link>
            </div>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/nav" element={<NavigationPage />} />
        <Route path="/arsenal" element={<ArsenalPage />} />
        <Route path="/xiaoxiang" element={<XiaoXiangPage />} />
        <Route path="/mingdao" element={<MingDaoSkewerPage />} />
        <Route path="/ai-pricing" element={<AiPricingPage />} />
        <Route path="/token-usage" element={<TokenUsagePage />} />
        <Route path="*" element={<Navigate to="/nav" replace />} />
      </Routes>
    </div>
  )
}

export default Layout
