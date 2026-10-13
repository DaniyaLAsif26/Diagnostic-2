import { Form, Link } from 'react-router-dom'

import LOGO from '../../assets/logo.png'
import Icon from '../Icon/Icon'
import { Eyebrow, EcgAccent, tint } from '../Common/SectionAccents'
import { CONTACT, tel, whatsapp } from '../../constants/contact'

/* ------------------------------------------------------------------
   Placeholder content - swap for API data (tests / packages).
------------------------------------------------------------------- */

// Rotating words in the hero headline
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

const quickActions = [
    { icon: 'tube', title: 'Book Lab Tests', text: '500+ tests available', href: '/tests', tone: 'bg-sky-50 text-sky-600' },
    { icon: 'package', title: 'Health Packages', text: 'Full body & more', href: '/packages', tone: 'bg-indigo-50 text-indigo-600' },
    { icon: 'scan', title: 'Radiology & Scans', text: 'X-Ray, USG, ECG', href: '/tests?type=radiology', tone: 'bg-teal-50 text-teal-600' },
    { icon: 'upload', title: 'Upload Prescription', text: 'We’ll book it for you', href: '/#book', tone: 'bg-amber-50 text-amber-600' },
]

// Offers for health awareness days. Each one shows from 'startsOn' (optional)
// until the end of 'validTill', then hides itself - just add or edit entries here.
const occasionOffers = [
    {
        occasion: 'World Heart Day', date: '2026-09-29', validTill: '2026-10-15', theme: 'rose', icon: 'heart',
        title: 'Heart Care Package', text: 'Lipid profile, hs-CRP, ECG and more to check how your heart is doing.',
        price: 2499, offerPrice: 1499, to: '/packages?concern=heart',
    },
    {
        occasion: 'World Arthritis Day', date: '2026-10-12', validTill: '2026-10-25', theme: 'amber', icon: 'bone',
        title: 'Bone & Joint Care', text: 'Vitamin D, calcium, uric acid and RA factor for stronger bones and joints.',
        price: 1799, offerPrice: 1169, to: '/packages?concern=bone',
    },
    {
        occasion: 'World Diabetes Day', date: '2026-11-14', startsOn: '2026-10-10', validTill: '2026-11-20', theme: 'blue', icon: 'droplet',
        title: 'Diabetes Care Package', text: 'HbA1c, fasting and post-meal sugar, plus kidney checks, in one visit.',
        price: 1899, offerPrice: 949, to: '/packages?concern=diabetes',
    },
]

// Colour of each offer's band - pick one per occasion
const offerThemes = {
    rose: 'from-rose-500 to-red-600',
    blue: 'from-sky-500 to-blue-700',
    amber: 'from-amber-500 to-orange-600',
    pink: 'from-pink-500 to-fuchsia-600',
    violet: 'from-violet-500 to-purple-700',
    teal: 'from-teal-500 to-emerald-600',
}

const packages = [
    { name: 'Full Body Checkup', tests: 72, price: 2999, offerPrice: 1499, isPopular: true, relevance: ['Heart', 'Liver', 'Kidney', 'Thyroid'], highlights: ['Complete Blood Count', 'Lipid Profile', 'Liver & Kidney Function', 'Thyroid Profile'] },
    { name: 'Basic Health Checkup', tests: 40, price: 1499, offerPrice: 799, relevance: ['Blood', 'Diabetes', 'Kidney'], highlights: ['Complete Blood Count', 'Blood Sugar (Fasting)', 'Kidney Function Test', 'Urine Routine'] },
    { name: 'Diabetes Care Package', tests: 28, price: 1899, offerPrice: 999, relevance: ['Diabetes', 'Kidney'], highlights: ['HbA1c', 'Blood Sugar (F & PP)', 'Urine Microalbumin', 'Kidney Function Test'] },
    { name: 'Women’s Wellness', tests: 58, price: 3499, offerPrice: 1899, relevance: ['Thyroid', 'Hormones', 'Vitamins'], highlights: ['Thyroid Profile', 'Iron Studies', 'Vitamin D & B12', 'Complete Blood Count'] },
]

const concerns = [
    { label: 'Diabetes', tag: 'diabetes', icon: 'droplet', tone: 'bg-rose-50 text-rose-600' },
    { label: 'Heart', tag: 'heart', icon: 'heart', tone: 'bg-red-50 text-red-600' },
    { label: 'Thyroid', tag: 'thyroid', icon: 'thyroid', tone: 'bg-violet-50 text-violet-600' },
    { label: 'Liver', tag: 'liver', icon: 'liver', tone: 'bg-amber-50 text-amber-600' },
    { label: 'Kidney', tag: 'kidney', icon: 'kidney', tone: 'bg-orange-50 text-orange-600' },
    { label: 'Vitamins', tag: 'vitamin', icon: 'sun', tone: 'bg-yellow-50 text-yellow-600' },
    { label: 'Fever & Infection', tag: 'fever', icon: 'thermometer', tone: 'bg-sky-50 text-sky-600' },
    { label: 'Bone & Joints', tag: 'bone', icon: 'bone', tone: 'bg-stone-100 text-stone-600' },
    { label: 'Women’s Health', tag: 'women', icon: 'female', tone: 'bg-pink-50 text-pink-600' },
    { label: 'Lungs & Allergy', tag: 'lung', icon: 'lungs', tone: 'bg-teal-50 text-teal-600' },
]

const tests = [
    { name: 'Complete Blood Count (CBC)', price: 450, offerPrice: 299, tat: '12 hrs', fasting: false },
    { name: 'Thyroid Profile (T3, T4, TSH)', price: 700, offerPrice: 449, tat: '24 hrs', fasting: false },
    { name: 'Lipid Profile', price: 800, offerPrice: 499, tat: '24 hrs', fasting: true },
    { name: 'HbA1c', price: 600, offerPrice: 399, tat: '12 hrs', fasting: false },
    { name: 'Vitamin D (25-OH)', price: 1500, offerPrice: 899, tat: '24 hrs', fasting: false },
    { name: 'Liver Function Test (LFT)', price: 900, offerPrice: 549, tat: '24 hrs', fasting: true },
    { name: 'Kidney Function Test (KFT)', price: 900, offerPrice: 549, tat: '24 hrs', fasting: false },
    { name: 'Vitamin B12', price: 1100, offerPrice: 649, tat: '24 hrs', fasting: false },
]

const scans = [
    { name: 'Digital X-Ray', icon: 'xray', note: 'Same-day reports' },
    { name: 'Ultrasound', icon: 'ultrasound', note: 'Abdomen, pelvis & more' },
    { name: 'ECG', icon: 'activity', note: 'Results in minutes' },
    { name: 'Colour Doppler', icon: 'scan', note: 'Vascular studies' },
]

const steps = [
    { icon: 'calendar', title: 'Book a test', text: 'Search and book online, or simply give us a call.' },
    { icon: 'home', title: 'Sample collection', text: 'A trained phlebotomist visits your home, or walk in to the centre.' },
    { icon: 'flask', title: 'Lab processing', text: 'Samples are tested on calibrated, quality-checked analysers.' },
    { icon: 'report', title: 'Get your report', text: 'Download your report online or receive it on WhatsApp.' },
]

const stats = [
    { value: '15+', label: 'Years of service' },
    { value: '500+', label: 'Tests available' },
    { value: '1 Lakh+', label: 'Patients served' },
    { value: '24 hrs', label: 'Average report time' },
]

const features = [
    { icon: 'flask', title: 'Modern lab equipment', text: 'Automated analysers with daily calibration and quality controls.' },
    { icon: 'award', title: 'Experienced team', text: 'Qualified pathologists and radiologists review every report.' },
    { icon: 'shield', title: 'Safe & hygienic', text: 'Sterile, single-use kits for every sample collection.' },
    { icon: 'tag', title: 'Honest pricing', text: 'Transparent rates with no hidden charges.' },
]

const testimonials = [
    { name: 'Priya Sharma', meta: 'Full Body Checkup', text: 'The phlebotomist arrived on time at 7 AM and it was all done in five minutes. Reports were on my WhatsApp the same evening.' },
    { name: 'Rahul Verma', meta: 'Diabetes Care Package', text: 'Booked tests for my parents over a phone call. The staff explained the fasting instructions clearly and the prices were very reasonable.' },
    { name: 'Ayesha Khan', meta: 'Ultrasound', text: 'Clean centre, minimal waiting and a very polite team. The radiologist took the time to explain my report.' },
]

const faqs = [
    { q: 'Do I need to fast before my test?', a: 'Some tests, like Lipid Profile and Fasting Blood Sugar, need 10–12 hours of fasting (water is fine). Preparation is listed for every test, and we remind you when confirming your booking.' },
    { q: 'Is home sample collection available?', a: 'Yes. A trained phlebotomist will collect your sample at home at no extra charge within our service area. Just pick a convenient slot while booking.' },
    { q: 'When will I get my reports?', a: 'Most routine blood tests are reported within 24 hours. Reports are shared online and on WhatsApp, and you can also collect a printed copy from the centre.' },
    { q: 'Can I book a test without a prescription?', a: 'Most lab tests and health packages can be booked without a prescription. Some radiology scans may need a referral from your doctor.' },
    { q: 'What payment methods do you accept?', a: 'We accept cash, UPI, debit and credit cards. For home collection you can pay online in advance or at the time of collection.' },
]

const inr = (n) => `₹${n.toLocaleString('en-IN')}`
const discount = (price, offerPrice) => Math.round((1 - offerPrice / price) * 100)

const DAY = 24 * 60 * 60 * 1000
const toDate = (iso) => new Date(`${iso}T00:00:00`) // local midnight
// Fixed 3-letter months - browsers vary ("Sep" vs "Sept")
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const shortDate = (iso) => `${toDate(iso).getDate()} ${MONTHS[toDate(iso).getMonth()]}`

/** Days left on an offer, worded for the card; urgent in the last 3 days. */
function offerDeadline(validTill) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const days = Math.round((toDate(validTill) - today) / DAY)

    if (days === 0) return { label: 'Ends today', urgent: true }
    if (days === 1) return { label: 'Ends tomorrow', urgent: true }
    if (days <= 3) return { label: `Ends in ${days} days`, urgent: true }
    return { label: `Valid till ${shortDate(validTill)}`, urgent: false }
}

const wrap = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'

const band = `${tint} py-16 sm:py-20`

/* ------------------------------------------------------------------
   Shared bits
------------------------------------------------------------------- */

function SectionHeading({ eyebrow, icon, title, text, action, center = false }) {
    return (
        <div className={`flex flex-col gap-4 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
            <div className="max-w-2xl">
                <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">{title}</h2>
                <EcgAccent center={center} />
                {text && <p className="mt-3 text-slate-600">{text}</p>}
            </div>
            {action}
        </div>
    )
}

function ViewAll({ to, children }) {
    return (
        <Link to={to} className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-light transition hover:text-brand">
            {children}
            <Icon name="arrow" className="size-4 transition group-hover:translate-x-0.5" />
        </Link>
    )
}

const field = 'w-full rounded-xl border border-transparent bg-slate-100/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:bg-white focus:ring-4 focus:ring-brand-light/15'

/* ------------------------------------------------------------------
   Hero
------------------------------------------------------------------- */

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

function Hero() {
    return (
        <section id="top" className="px-2 pt-2 sm:px-4 sm:pt-4">
            <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-slate-50 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                <HeroBackdrop />

                <div className={`${wrap} grid items-center gap-14 pb-28 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-36 lg:pt-20`}>
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand shadow-sm ring-1 ring-slate-900/5">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                                <span className="relative size-2 rounded-full bg-emerald-500" />
                            </span>
                            Home collection slots open today
                        </span>

                        <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
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

function QuickActions() {
    return (
        <section aria-label="Quick actions" className={`${wrap} relative -mt-12`}>
            <div className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-xl shadow-brand/10 ring-1 ring-slate-900/5 sm:gap-3 sm:p-3 lg:grid-cols-4">
                {quickActions.map(({ icon, title, text, href, tone }) => (
                    <Link key={title} to={href} className="group flex flex-col gap-3 rounded-2xl p-3 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:p-4">
                        <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${tone}`}>
                            <Icon name={icon} className="size-6" />
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-slate-900 sm:text-base">{title}</span>
                            <span className="block text-xs text-slate-500 sm:text-sm">{text}</span>
                        </span>
                        <Icon name="arrow" className="hidden size-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand sm:block" />
                    </Link>
                ))}
            </div>
        </section>
    )
}

function OfferCard({ offer, featured }) {
    const { label, urgent } = offerDeadline(offer.validTill)
    const date = toDate(offer.date)

    return (
        <article className={`flex overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/10 ${featured ? 'flex-col md:flex-row' : 'w-[85%] shrink-0 snap-start flex-col md:w-auto'}`}>
            {/* Occasion band */}
            <div className={`relative overflow-hidden bg-linear-to-br p-5 text-white sm:p-6 ${offerThemes[offer.theme]} ${featured ? 'md:flex md:w-80 md:shrink-0 md:flex-col md:justify-between md:p-8' : ''}`}>
                <Icon name={offer.icon} className="pointer-events-none absolute -bottom-6 -right-6 size-36 text-white/15" />

                <div className="relative flex items-center gap-3">
                    <span className="flex w-12 shrink-0 flex-col items-center rounded-xl bg-white/15 py-1.5 leading-none ring-1 ring-white/25">
                        <span className="text-lg font-bold">{date.getDate()}</span>
                        <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                            {MONTHS[date.getMonth()]}
                        </span>
                    </span>
                    <span className="leading-tight">
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/75">Special day offer</span>
                        <span className="block font-bold">{offer.occasion}</span>
                    </span>
                </div>

                <p className="relative mt-5 flex items-baseline gap-1.5">
                    <span className="text-5xl font-extrabold tracking-tight">{discount(offer.price, offer.offerPrice)}%</span>
                    <span className="text-lg font-bold">OFF</span>
                </p>
            </div>

            {/* Details */}
            <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? 'md:justify-center md:p-8' : ''}`}>
                <h3 className="text-lg font-semibold text-slate-900">{offer.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{offer.text}</p>

                <p className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-brand-dark">{inr(offer.offerPrice)}</span>
                    <span className="text-sm text-slate-400 line-through">{inr(offer.price)}</span>
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${urgent ? 'text-rose-600' : 'text-slate-500'}`}>
                        {urgent ? (
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-500 opacity-60 motion-reduce:animate-none" />
                                <span className="relative size-2 rounded-full bg-rose-500" />
                            </span>
                        ) : (
                            <Icon name="clock" className="size-3.5" />
                        )}
                        {label}
                    </span>
                    <Link to={offer.to} className="rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid">
                        Book now
                    </Link>
                </div>
            </div>
        </article>
    )
}

function OccasionOffers() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const active = occasionOffers.filter((o) => (!o.startsOn || toDate(o.startsOn) <= today) && toDate(o.validTill) >= today)

    if (!active.length) return null

    return (
        <section aria-labelledby="offers-heading" className={`${wrap} mt-14 pb-16 sm:pb-20`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-rose-600">
                        <span className="size-2 rounded-full bg-rose-500" />Limited-time offers
                    </p>
                    <h2 id="offers-heading" className="mt-2 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">Health day specials</h2>
                </div>
                <p className="text-sm text-slate-500">Special prices on awareness days, for a short time only.</p>
            </div>

            {active.length === 1 ? (
                <div className="mt-8">
                    <OfferCard offer={active[0]} featured />
                </div>
            ) : (
                // Swipe on phones, grid from md up
                <div className={`-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-none md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 ${active.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
                    {active.map((offer) => <OfferCard key={offer.occasion} offer={offer} />)}
                </div>
            )}
        </section>
    )
}

/* ------------------------------------------------------------------
   Packages & tests
------------------------------------------------------------------- */

function PackageCard({ pkg }) {
    return (
        <article className="flex w-[82%] shrink-0 snap-start flex-col rounded-3xl bg-white p-5 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10 hover:ring-brand-light/30 sm:w-auto">
            <div className="flex items-start justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand/5 text-brand">
                    <Icon name="package" className="size-5.5" />
                </span>
                {pkg.isPopular && (
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">Most booked</span>
                )}
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">{pkg.name}</h3>
            <p className="mt-0.5 text-sm text-slate-500">Includes {pkg.tests} tests</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
                {pkg.relevance.map((r) => (
                    <span key={r} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{r}</span>
                ))}
            </div>

            <ul className="mb-6 mt-4 space-y-2 text-sm text-slate-600">
                {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                        <Icon name="check" className="size-4 shrink-0 text-emerald-500" />{h}
                    </li>
                ))}
            </ul>

            <div className="mt-auto border-t border-slate-100 pt-4">
                <div className="flex items-end justify-between gap-2">
                    <div>
                        <p className="text-xs text-slate-400 line-through">{inr(pkg.price)}</p>
                        <p className="text-2xl font-bold text-brand-dark">{inr(pkg.offerPrice)}</p>
                    </div>
                    <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                        {discount(pkg.price, pkg.offerPrice)}% OFF
                    </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link to="/packages" className="rounded-xl border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-brand-light hover:text-brand">
                        Details
                    </Link>
                    <button type="button" className="rounded-xl bg-brand-dark py-2.5 text-sm font-semibold text-white transition hover:bg-brand-mid">
                        Book now
                    </button>
                </div>
            </div>
        </article>
    )
}

function Packages() {
    return (
        <section id="packages" className={`${band} scroll-mt-24`}>
            <div className={wrap}>
                <SectionHeading
                    eyebrow="Health checkups"
                    icon="package"
                    title="Popular health packages"
                    text="Comprehensive checkups at a fraction of the price of individual tests."
                    action={<ViewAll to="/packages">View all packages</ViewAll>}
                />
                {/* Scrolls sideways on phones, grid from sm up */}
                <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
                    {packages.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} />)}
                </div>
            </div>
        </section>
    )
}

function Concerns() {
    return (
        <section className="py-16 sm:py-20">
            <div className={wrap}>
                <SectionHeading
                    center
                    eyebrow="Find the right test"
                    icon="search"
                    title="Tests by health concern"
                    text="Not sure what to book? Start with what you want to check."
                />
                {/* Wraps and centres any leftover circles on smaller screens, one row on desktop */}
                <div className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-6 lg:justify-between">
                    {concerns.map(({ label, tag, icon, tone }) => (
                        <Link key={label} to={`/tests?concern=${tag}`} className="group flex w-24 flex-col items-center gap-2.5 text-center">
                            <span className="grid size-20 place-items-center rounded-full bg-white ring-1 ring-slate-200 transition group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-brand/5 group-hover:ring-brand-light/30">
                                <span className={`grid size-14 place-items-center rounded-full transition group-hover:scale-105 ${tone}`}>
                                    <Icon name={icon} className="size-7" />
                                </span>
                            </span>
                            <span className="text-sm font-semibold leading-tight text-slate-800">{label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Tests() {
    return (
        <section id="tests" className={`${band} scroll-mt-24`}>
            <div className={wrap}>
                <SectionHeading
                    eyebrow="Lab tests"
                    icon="tube"
                    title="Most booked tests"
                    text="Individual tests with transparent pricing and quick turnaround."
                    action={<ViewAll to="/tests">View all tests</ViewAll>}
                />
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {tests.map((t) => (
                        <article key={t.name} className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:shadow-lg hover:shadow-brand/5 hover:ring-brand-light/30">
                            <div className="flex items-start gap-3">
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600">
                                    <Icon name="tube" className="size-5" />
                                </span>
                                <h3 className="pt-0.5 text-sm font-semibold leading-snug text-slate-900">{t.name}</h3>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                    <Icon name="clock" className="size-3.5" />Report in {t.tat}
                                </span>
                            </div>
                            <span className={`mt-3 w-fit rounded-md px-2 py-0.5 text-[11px] font-medium ${t.fasting ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                                {t.fasting ? '10–12 hrs fasting' : 'No fasting needed'}
                            </span>

                            <div className="mt-auto flex items-end justify-between gap-2 pt-5">
                                <div>
                                    <span className="text-lg font-bold text-brand-dark">{inr(t.offerPrice)}</span>
                                    <span className="ml-2 text-xs text-slate-400 line-through">{inr(t.price)}</span>
                                    <p className="text-xs font-semibold text-emerald-600">{discount(t.price, t.offerPrice)}% off</p>
                                </div>
                                <button type="button" className="rounded-xl border border-brand/20 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white">
                                    Book
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Radiology() {
    return (
        <section id="radiology" className={`${wrap} scroll-mt-24 py-16 sm:py-20`}>
            <div className="grid items-center gap-10 rounded-3xl bg-linear-to-br from-sky-50 to-indigo-50 p-6 ring-1 ring-slate-200/60 sm:p-10 lg:grid-cols-2 lg:p-14">
                <div>
                    <Eyebrow icon="scan">Radiology & imaging</Eyebrow>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">Scans and imaging under one roof</h2>
                    <EcgAccent />
                    <p className="mt-3 text-slate-600">
                        From X-rays to ultrasound, get your imaging done at our centre with reports reviewed by experienced radiologists.
                    </p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-700">
                        {['Walk-in or pre-booked slots', 'Digital films and online reports', 'Comfortable, private scan rooms'].map((p) => (
                            <li key={p} className="flex items-center gap-2.5">
                                <span className="grid size-5 place-items-center rounded-full bg-brand-light text-white"><Icon name="check" className="size-3" /></span>
                                {p}
                            </li>
                        ))}
                    </ul>
                    <a href="#book" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid">
                        Book a scan<Icon name="arrow" className="size-4" />
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {scans.map(({ name, icon, note }) => (
                        <div key={name} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/10">
                            <span className="grid size-12 place-items-center rounded-2xl bg-brand-dark text-white">
                                <Icon name={icon} className="size-6" />
                            </span>
                            <h3 className="mt-4 font-semibold text-slate-900">{name}</h3>
                            <p className="mt-1 text-xs text-slate-500">{note}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------
   Trust & info
------------------------------------------------------------------- */

function HowItWorks() {
    return (
        <section id="how-it-works" className={`${band} scroll-mt-24`}>
            <div className={wrap}>
                <SectionHeading center eyebrow="How it works" icon="calendar" title="Your test in 4 simple steps" />
                <div className="relative mt-12">
                    {/* dashed connector behind the step icons */}
                    <div aria-hidden="true" className="absolute inset-x-[12.5%] top-8 hidden border-t-2 border-dashed border-brand/15 lg:block" />
                    <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {steps.map(({ icon, title, text }, i) => (
                            <li key={title} className="flex flex-col items-center text-center">
                                <span className="relative grid size-16 place-items-center rounded-2xl bg-white text-brand shadow-lg shadow-brand/10 ring-1 ring-slate-900/5">
                                    <Icon name={icon} className="size-7" />
                                    <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-brand-dark text-xs font-bold text-white">{i + 1}</span>
                                </span>
                                <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                                <p className="mt-2 max-w-60 text-sm text-slate-500">{text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}

function WhyUs() {
    return (
        <section className="relative overflow-hidden bg-brand-dark py-16 text-white sm:py-20">
            {/* rings + ECG trace */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -right-40 -top-40 size-[520px] rounded-full border border-white/5" />
                <div className="absolute -right-24 -top-24 size-[360px] rounded-full border border-white/5" />
                <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="absolute inset-x-0 bottom-8 h-20 w-full text-white/5">
                    <path
                        d="M0 60h180l24-40 20 74 26-56 18 22h150l24-40 20 74 26-56 18 22h150l24-40 20 74 26-56 18 22h436"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <div className={`${wrap} relative grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center`}>
                <div>
                    <Eyebrow icon="shield" dark>Why Vision Diagnostic</Eyebrow>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Care and accuracy at every step</h2>
                    <EcgAccent dark />
                    <p className="mt-4 max-w-lg text-white/70">
                        From the moment you book to the moment you read your report, our team makes sure every result is accurate,
                        on time and easy to understand.
                    </p>
                    <dl className="mt-10 grid grid-cols-2 gap-6">
                        {stats.map(({ value, label }) => (
                            <div key={label} className="flex flex-col-reverse border-l-2 border-sky-300/40 pl-4">
                                <dt className="text-sm text-white/60">{label}</dt>
                                <dd className="text-3xl font-bold">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {features.map(({ icon, title, text }) => (
                        <div key={title} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/[0.08]">
                            <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-sky-300">
                                <Icon name={icon} className="size-5.5" />
                            </span>
                            <h3 className="mt-4 font-semibold">{title}</h3>
                            <p className="mt-1.5 text-sm text-white/60">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Testimonials() {
    return (
        <section className={`${wrap} py-16 sm:py-20`}>
            <SectionHeading center eyebrow="Testimonials" icon="chat" title="What our patients say" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
                {testimonials.map(({ name, meta, text }) => (
                    <figure key={name} className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                        <div className="flex gap-0.5 text-amber-400">
                            {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" className="size-4 fill-current" />)}
                        </div>
                        <blockquote className="mt-4 flex-1 leading-relaxed text-slate-600">“{text}”</blockquote>
                        <figcaption className="mt-6 flex items-center gap-3">
                            <span className="grid size-10 place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand">{name[0]}</span>
                            <span>
                                <span className="block text-sm font-semibold text-slate-900">{name}</span>
                                <span className="text-xs text-slate-500">{meta}</span>
                            </span>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    )
}

function Faqs() {
    return (
        <section id="faqs" className={`${band} scroll-mt-24`}>
            <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.5fr]`}>
                <div>
                    <SectionHeading
                        eyebrow="FAQs"
                        icon="list"
                        title="Frequently asked questions"
                        text="Can’t find what you’re looking for? Our team is happy to help."
                    />
                    <a href={tel} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand shadow-sm ring-1 ring-slate-900/5 transition hover:ring-brand-light/40">
                        <Icon name="phone" className="size-4" />Talk to us
                    </a>
                </div>

                <div className="space-y-3">
                    {faqs.map(({ q, a }) => (
                        <details key={q} className="group rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition open:shadow-lg open:shadow-brand/5 open:ring-brand-light/30">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                                {q}
                                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-180 group-open:bg-brand group-open:text-white">
                                    <Icon name="chevron" className="size-4" />
                                </span>
                            </summary>
                            <p className="mt-3 pr-12 text-sm leading-relaxed text-slate-600">{a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}

function BookCta() {
    return (
        <section id="book" className={`${wrap} scroll-mt-24 py-16 sm:py-20`}>
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-dark to-brand-light px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
                <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full border border-white/10" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 size-96 rounded-full bg-white/5 blur-2xl" />

                <div className="relative grid items-center gap-10 lg:grid-cols-2">
                    <div className="text-white">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Book a home sample collection today</h2>
                        <p className="mt-3 max-w-md text-white/75">
                            Share your details and our team will call you back to confirm your test and a convenient time slot.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href={tel} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-dark transition hover:bg-slate-100">
                                <Icon name="phone" className="size-4" />{CONTACT.phone}
                            </a>
                            <a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10">
                                <Icon name="chat" className="size-4" />WhatsApp us
                            </a>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-2xl shadow-black/20 sm:p-6">
                        <h3 className="font-semibold text-slate-900">Request a callback</h3>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <input type="text" aria-label="Full name" placeholder="Full name" className={field} />
                            <input type="tel" aria-label="Mobile number" placeholder="Mobile number" className={field} />
                            <input type="text" aria-label="Test or package" placeholder="Test or package (optional)" className={`${field} sm:col-span-2`} />
                        </div>
                        <button type="button" className="mt-4 w-full rounded-xl bg-brand-dark py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                            Request a callback
                        </button>
                        <p className="mt-3 text-center text-xs text-slate-400">We usually call back within 30 minutes during working hours.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function Home() {
    return (
        <>
            <Hero />
            <QuickActions />
            <OccasionOffers />
            <Packages />
            <Concerns />
            <Tests />
            <Radiology />
            <HowItWorks />
            <WhyUs />
            <Testimonials />
            <Faqs />
            <BookCta />
        </>
    )
}
