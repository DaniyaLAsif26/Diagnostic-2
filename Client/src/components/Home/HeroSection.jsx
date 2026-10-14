import { Form } from 'react-router-dom'

import LOGO from '../../assets/logo.png'
import Icon from '../Icon/Icon'
import { wrap } from '../../constants/layout'

// Rotating words in the headline
const tickerWords = ['heart health', 'thyroid levels', 'blood sugar', 'vitamin levels']

const heroPerks = ['Free home collection', 'Reports in 24 hrs', 'Expert pathologists']

// Body systems circling the seal in the hero (angle in degrees, 0 = right)
const orbitIcons = [
    { icon: 'heart', angle: 225 },
    { icon: 'thyroid', angle: 315 },
    { icon: 'droplet', angle: 45 },
    { icon: 'lungs', angle: 135 },
]

const ECG = 'M0 60h50l12-34 14 70 14-52 10 16h70l8-20 10 40 10-30 6 10h192l8-20 10 40 10-30 6 10h70l12-34 14 70 14-52 10 16h50'

function HeroBackdrop() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            {/* soft colour washes, same family as the login backdrop */}
            <div className="absolute -left-40 -top-40 size-[520px] rounded-full bg-sky-200/50 blur-3xl" />
            <div className="absolute -right-32 top-1/4 size-[560px] rounded-full bg-indigo-200/40 blur-3xl" />
            <div className="absolute -bottom-48 left-1/3 size-[420px] rounded-full bg-cyan-100/70 blur-3xl" />

            {/* dot grid, faded towards the edges */}
            <svg className="absolute inset-0 size-full text-brand [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black_30%,transparent_80%)]">
                <defs>
                    <pattern id="hero-dots" width="26" height="26" patternUnits="userSpaceOnUse">
                        <circle cx="1.6" cy="1.6" r="1.6" fill="currentColor" opacity="0.08" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-dots)" />
            </svg>
        </div>
    )
}

/** Places a child on a ring at `angle` and spins it the other way so it stays upright. */
function OrbitNode({ angle, counter, children }) {
    const rad = (angle * Math.PI) / 180
    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${50 + 50 * Math.cos(rad)}%`, top: `${50 + 50 * Math.sin(rad)}%` }}
        >
            <div className={`${counter} motion-reduce:animate-none`}>{children}</div>
        </div>
    )
}

function StatusChip({ icon, tone, title, text, className, delay }) {
    return (
        <div className={`absolute animate-float motion-reduce:animate-none ${className}`} style={delay ? { animationDelay: delay } : undefined}>
            <div className="flex items-center gap-3 rounded-2xl bg-white/90 p-2.5 pr-4 shadow-xl shadow-brand/10 ring-1 ring-slate-900/5 backdrop-blur">
                <span className={`grid size-10 place-items-center rounded-xl ${tone}`}>
                    <Icon name={icon} className="size-5" />
                </span>
                <span className="text-xs leading-tight">
                    <span className="block font-semibold text-slate-900">{title}</span>
                    <span className="text-slate-500">{text}</span>
                </span>
            </div>
        </div>
    )
}

function HeroOrbit() {
    return (
        <div aria-hidden="true" className="relative mx-auto hidden aspect-square w-full max-w-[500px] sm:block">
            {/* ECG trace running through the seal */}
            <svg viewBox="0 0 600 120" preserveAspectRatio="none" className="absolute -left-[6%] top-[40%] h-[20%] w-[112%]">
                <path d={ECG} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand/10" />
                <path
                    d={ECG}
                    pathLength="1000"
                    strokeDasharray="160 840"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-ecg text-sky-500 drop-shadow-[0_0_4px_rgba(14,165,233,0.5)] motion-reduce:animate-none"
                />
            </svg>

            {/* rings echoing the seal */}
            <div className="absolute inset-0 rounded-full border border-brand/[0.06]" />
            <div className="absolute inset-[12%] animate-orbit-outer rounded-full border border-dashed border-brand/15 motion-reduce:animate-none">
                <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 ring-4 ring-sky-400/20" />
            </div>
            <div className="absolute inset-[24%] animate-orbit-inner rounded-full border border-brand/10 motion-reduce:animate-none">
                {orbitIcons.map(({ icon, angle }) => (
                    <OrbitNode key={icon} angle={angle} counter="animate-orbit-inner-counter">
                        <span className="grid size-12 place-items-center rounded-full bg-white text-brand shadow-lg shadow-brand/10 ring-1 ring-slate-900/5">
                            <Icon name={icon} className="size-5.5" />
                        </span>
                    </OrbitNode>
                ))}
            </div>

            {/* seal */}
            <div className="absolute inset-[35%]">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand/10 motion-reduce:animate-none" />
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand/10 motion-reduce:animate-none" style={{ animationDelay: '1.5s' }} />
                <div className="relative size-full rounded-full bg-white p-[6%] shadow-2xl shadow-brand/25 ring-8 ring-white/70">
                    <img src={LOGO} alt="" className="size-full rounded-full" />
                </div>
            </div>

            <StatusChip className="-left-[4%] top-[12%]" icon="home" tone="bg-sky-50 text-sky-600" title="Sample collected" text="At home · 8:30 AM" />
            <StatusChip className="-right-[4%] bottom-[14%]" delay="-3s" icon="check" tone="bg-emerald-50 text-emerald-600" title="Report ready" text="Within 24 hrs" />
        </div>
    )
}

export default function HeroSection() {
    return (
        <section className="px-2 pt-2 sm:px-4 sm:pt-4">
            <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-slate-50 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                <HeroBackdrop />

                <div className={`${wrap} grid items-center gap-14 pb-28 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-36 lg:pt-20`}>
                    <div>
                        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
                            <span className="sr-only">Check your health from home.</span>
                            <span aria-hidden="true">
                                Check your
                                <span className="block h-[1.25em] overflow-hidden">
                                    <span className="flex animate-ticker flex-col motion-reduce:animate-none">
                                        {[...tickerWords, tickerWords[0]].map((w, i) => (
                                            <span key={i} className="block h-[1.25em] bg-linear-to-r from-brand-light to-sky-500 bg-clip-text leading-[1.25em] text-transparent">
                                                {w}
                                            </span>
                                        ))}
                                    </span>
                                </span>
                                from home.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
                            Blood tests, health checkups and scans, collected at your doorstep with reports online,
                            usually within 24 hours.
                        </p>

                        {/* Search - submits to /tests?q=... */}
                        <Form action="/tests" role="search" className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-brand/10 ring-1 ring-slate-900/5 transition focus-within:ring-4 focus-within:ring-brand-light/15">
                            <Icon name="search" className="ml-2.5 size-5 shrink-0 text-slate-400" />
                            <input
                                type="search"
                                name="q"
                                aria-label="Search tests and scans"
                                placeholder="Search tests and scans, e.g. CBC"
                                className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
                            />
                            <button type="submit" className="shrink-0 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid sm:px-6">
                                Search
                            </button>
                        </Form>

                        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-700">
                            {heroPerks.map((p) => (
                                <li key={p} className="flex items-center gap-2">
                                    <span className="grid size-5 place-items-center rounded-full bg-brand/10 text-brand">
                                        <Icon name="check" className="size-3" />
                                    </span>
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <HeroOrbit />
                </div>
            </div>
        </section>
    )
}
