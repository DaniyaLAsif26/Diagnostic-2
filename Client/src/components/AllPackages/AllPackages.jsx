import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { CONTACT, tel, whatsapp } from '../../constants/contact'

/* ------------------------------------------------------------------
   Sample data - same shape as the Package model, swap for the API later.
   `relevance` holds the health-concern tags used by the filter.
------------------------------------------------------------------- */

const packages = [
    {
        id: 1, name: 'Full Body Checkup', price: 2999, offerPrice: 1499, isPopular: true,
        relevance: ['heart', 'liver', 'kidney', 'thyroid', 'diabetes', 'vitamin'], preparation: '10–12 hrs fasting',
        description: 'A complete head-to-toe screening for adults, ideal once a year.',
        tests: ['Complete Blood Count (CBC)', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test', 'Thyroid Profile', 'HbA1c', 'Vitamin D', 'Vitamin B12', 'Urine Routine'],
    },
    {
        id: 2, name: 'Basic Health Checkup', price: 1499, offerPrice: 799, isPopular: true,
        relevance: ['diabetes', 'kidney', 'fever'], preparation: '8 hrs fasting',
        description: 'Essential tests to get a quick picture of your overall health.',
        tests: ['Complete Blood Count (CBC)', 'Fasting Blood Sugar', 'Kidney Function Test', 'Urine Routine'],
    },
    {
        id: 3, name: 'Diabetes Care Package', price: 1899, offerPrice: 999, isPopular: true,
        relevance: ['diabetes', 'kidney'], preparation: '10–12 hrs fasting',
        description: 'Tracks blood sugar control and checks the kidneys, which diabetes can affect.',
        tests: ['HbA1c', 'Fasting Blood Sugar', 'Post-Prandial Blood Sugar', 'Urine Microalbumin', 'Kidney Function Test'],
    },
    {
        id: 4, name: 'Heart Care Package', price: 2499, offerPrice: 1599, isPopular: false,
        relevance: ['heart'], preparation: '10–12 hrs fasting',
        description: 'Assesses your heart risk with cholesterol, inflammation and an ECG.',
        tests: ['Lipid Profile', 'C-Reactive Protein (hs-CRP)', 'ECG', 'Fasting Blood Sugar', 'Complete Blood Count (CBC)'],
    },
    {
        id: 5, name: 'Thyroid Care Package', price: 1200, offerPrice: 699, isPopular: false,
        relevance: ['thyroid'], preparation: '',
        description: 'A full thyroid work-up, including antibodies.',
        tests: ['T3', 'T4', 'TSH (Ultrasensitive)', 'Anti-TPO Antibodies'],
    },
    {
        id: 6, name: 'Liver & Kidney Care', price: 1999, offerPrice: 1199, isPopular: false,
        relevance: ['liver', 'kidney'], preparation: '8 hrs fasting',
        description: 'Checks how well your liver and kidneys are working.',
        tests: ['Liver Function Test', 'Kidney Function Test', 'Uric Acid', 'Electrolytes', 'Urine Routine'],
    },
    {
        id: 7, name: 'Women’s Wellness', price: 3499, offerPrice: 1899, isPopular: true,
        relevance: ['women', 'thyroid', 'vitamin', 'bone'], preparation: '8 hrs fasting',
        description: 'Covers the tests women most often need: thyroid, iron, vitamins and bones.',
        tests: ['Thyroid Profile', 'Iron Studies', 'Vitamin D', 'Vitamin B12', 'Calcium', 'Complete Blood Count (CBC)'],
    },
    {
        id: 8, name: 'Fever Panel', price: 1599, offerPrice: 999, isPopular: false,
        relevance: ['fever'], preparation: '',
        description: 'Finds the common causes of fever, including dengue, malaria and typhoid.',
        tests: ['Complete Blood Count (CBC)', 'Dengue NS1 Antigen', 'Malaria Antigen', 'Widal Test', 'C-Reactive Protein (CRP)', 'Urine Routine'],
    },
    {
        id: 9, name: 'Bone & Joint Care', price: 1799, offerPrice: 1099, isPopular: false,
        relevance: ['bone', 'vitamin'], preparation: '',
        description: 'Checks the minerals and vitamins your bones and joints depend on.',
        tests: ['Vitamin D', 'Calcium', 'Phosphorus', 'Uric Acid', 'RA Factor'],
    },
    {
        id: 10, name: 'Allergy & Lung Care', price: 1999, offerPrice: 0, isPopular: false,
        relevance: ['lung'], preparation: '',
        description: 'For frequent coughs, wheezing or allergies.',
        tests: ['IgE (Total)', 'Absolute Eosinophil Count', 'Chest X-Ray (PA View)', 'Complete Blood Count (CBC)'],
    },
]

const concerns = [
    { tag: 'diabetes', label: 'Diabetes', icon: 'droplet', tone: 'bg-rose-50 text-rose-600' },
    { tag: 'heart', label: 'Heart', icon: 'heart', tone: 'bg-red-50 text-red-600' },
    { tag: 'thyroid', label: 'Thyroid', icon: 'thyroid', tone: 'bg-violet-50 text-violet-600' },
    { tag: 'liver', label: 'Liver', icon: 'liver', tone: 'bg-amber-50 text-amber-600' },
    { tag: 'kidney', label: 'Kidney', icon: 'kidney', tone: 'bg-orange-50 text-orange-600' },
    { tag: 'vitamin', label: 'Vitamins', icon: 'sun', tone: 'bg-yellow-50 text-yellow-600' },
    { tag: 'fever', label: 'Fever & Infection', icon: 'thermometer', tone: 'bg-sky-50 text-sky-600' },
    { tag: 'bone', label: 'Bone & Joints', icon: 'bone', tone: 'bg-stone-100 text-stone-600' },
    { tag: 'women', label: 'Women’s Health', icon: 'female', tone: 'bg-pink-50 text-pink-600' },
    { tag: 'lung', label: 'Lungs & Allergy', icon: 'lungs', tone: 'bg-teal-50 text-teal-600' },
]
const concernLabel = Object.fromEntries(concerns.map(({ tag, label }) => [tag, label]))

const sorts = {
    popular: { label: 'Most popular', compare: (a, b) => Number(b.isPopular) - Number(a.isPopular) || a.name.localeCompare(b.name) },
    'price-asc': { label: 'Price: low to high', compare: (a, b) => finalPrice(a) - finalPrice(b) },
    'price-desc': { label: 'Price: high to low', compare: (a, b) => finalPrice(b) - finalPrice(a) },
    'tests-desc': { label: 'Most tests included', compare: (a, b) => b.tests.length - a.tests.length },
}

const wrap = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'

const inr = (n) => `₹${n.toLocaleString('en-IN')}`
// offerPrice is 0 when there is no offer; only a lower offer counts as a discount
const onOffer = ({ price, offerPrice }) => offerPrice > 0 && offerPrice < price
const finalPrice = (p) => (onOffer(p) ? p.offerPrice : p.price)

const PREVIEW = 4 // tests shown before "View all"

/* ------------------------------------------------------------------
   Pieces
------------------------------------------------------------------- */

function ConcernFilter({ active, onChange }) {
    return (
        <section aria-labelledby="concern-heading">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 id="concern-heading" className="text-lg font-semibold text-brand-dark">Filter by health concern</h2>
                    <p className="mt-0.5 text-sm text-slate-500">Find a package for what you want to check.</p>
                </div>
                {active && (
                    <button type="button" onClick={() => onChange('')} className="text-sm font-semibold text-brand-light transition hover:text-brand">
                        Clear
                    </button>
                )}
            </div>

            {/* Scrolls sideways on phones, grid from sm up */}
            <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-2 pt-1 scrollbar-none sm:mx-0 sm:pt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-5">
                {concerns.map(({ tag, label, icon, tone }) => {
                    const selected = active === tag
                    const count = packages.filter((p) => p.relevance.includes(tag)).length

                    return (
                        <button
                            key={tag}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onChange(selected ? '' : tag)}
                            className={`group relative flex w-32 shrink-0 flex-col items-center gap-3 rounded-2xl bg-white p-5 text-center transition sm:w-auto ${selected ? 'shadow-lg shadow-brand/10 ring-2 ring-brand-light' : 'ring-1 ring-slate-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/5 hover:ring-brand-light/30'}`}
                        >
                            {selected && (
                                <span className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-brand-light text-white">
                                    <Icon name="check" className="size-3" />
                                </span>
                            )}
                            <span className={`grid size-14 place-items-center rounded-full transition group-hover:scale-105 ${tone}`}>
                                <Icon name={icon} className="size-7" />
                            </span>
                            <span>
                                <span className="block text-sm font-semibold text-slate-800">{label}</span>
                                <span className="text-xs text-slate-400">{count} package{count === 1 ? '' : 's'}</span>
                            </span>
                        </button>
                    )
                })}
            </div>
        </section>
    )
}

function PackageCard({ pkg }) {
    const [expanded, setExpanded] = useState(false)
    const discounted = onOffer(pkg)
    const shown = expanded ? pkg.tests : pkg.tests.slice(0, PREVIEW)

    return (
        <article className="flex flex-col rounded-3xl bg-white p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/10 hover:ring-brand-light/30">
            <div className="flex-1 pb-5">
                <div className="flex items-start justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-brand/5 text-brand">
                        <Icon name="package" className="size-5.5" />
                    </span>
                    {pkg.isPopular && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                            <Icon name="star" className="size-3 fill-current" />Most booked
                        </span>
                    )}
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900">{pkg.name}</h3>
                <p className="mt-0.5 text-sm text-slate-500">Includes {pkg.tests.length} tests</p>
                {pkg.description && <p className="mt-2 text-sm text-slate-500">{pkg.description}</p>}

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {pkg.relevance.map((tag) => (
                        <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{concernLabel[tag] ?? tag}</span>
                    ))}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {shown.map((name) => (
                        <li key={name} className="flex items-start gap-2">
                            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-emerald-500" />{name}
                        </li>
                    ))}
                </ul>
                {pkg.tests.length > PREVIEW && (
                    <button
                        type="button"
                        onClick={() => setExpanded((e) => !e)}
                        aria-expanded={expanded}
                        className="mt-2 flex items-center gap-1 text-sm font-semibold text-brand-light transition hover:text-brand"
                    >
                        {expanded ? 'Show less' : `View all ${pkg.tests.length} tests`}
                        <Icon name="chevron" className={`size-4 transition ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                )}

                {pkg.preparation && (
                    <p className="mt-4 flex w-fit items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">
                        <Icon name="clock" className="size-3.5 shrink-0" />{pkg.preparation}
                    </p>
                )}
            </div>

            <div className="border-t border-slate-100 pt-4">
                <div className="flex items-end justify-between gap-2">
                    <div>
                        {discounted && <p className="text-xs text-slate-400 line-through">{inr(pkg.price)}</p>}
                        <p className="text-2xl font-bold text-brand-dark">{inr(finalPrice(pkg))}</p>
                    </div>
                    {discounted && (
                        <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                            {Math.round((1 - pkg.offerPrice / pkg.price) * 100)}% OFF
                        </span>
                    )}
                </div>
                <Link to="/#book" className="mt-4 block rounded-xl bg-brand-dark py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid">
                    Book now
                </Link>
            </div>
        </article>
    )
}

/* ------------------------------------------------------------------
   Page
------------------------------------------------------------------- */

export default function AllPackages() {
    // Filters live in the URL (?q=&concern=&sort=) so links can open a filtered view
    const [params, setParams] = useSearchParams()
    const concern = concernLabel[params.get('concern')] ? params.get('concern') : ''
    const sort = sorts[params.get('sort')] ? params.get('sort') : 'popular'

    // The input keeps its own state so typing stays smooth; the URL mirrors it
    const [search, setSearch] = useState(params.get('q') ?? '')

    // Sets one filter in the URL without adding history entries or jumping to the top
    const setParam = (key, value) => setParams((prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
    }, { replace: true, preventScrollReset: true })

    const updateSearch = (value) => {
        setSearch(value)
        setParam('q', value.trim())
    }

    const clearFilters = () => {
        setSearch('')
        setParams({}, { replace: true, preventScrollReset: true })
    }

    // Search matches the package name, its concerns, or any test inside it
    const term = search.trim().toLowerCase()
    const visible = useMemo(() => packages
        .filter((p) => !concern || p.relevance.includes(concern))
        .filter((p) => !term
            || p.name.toLowerCase().includes(term)
            || p.relevance.some((tag) => (concernLabel[tag] ?? tag).toLowerCase().includes(term))
            || p.tests.some((t) => t.toLowerCase().includes(term)))
        .sort(sorts[sort].compare),
    [concern, term, sort])

    const hasFilters = Boolean(term || concern)

    return (
        <>
            {/* Page header */}
            <section className="px-2 pt-2 sm:px-4 sm:pt-4">
                <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-slate-50 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute -left-40 -top-40 size-120 rounded-full bg-sky-200/50 blur-3xl" />
                        <div className="absolute -right-32 -top-20 size-105 rounded-full bg-indigo-200/40 blur-3xl" />
                        <svg className="absolute inset-0 size-full text-brand mask-[radial-gradient(ellipse_80%_80%_at_50%_30%,black_30%,transparent_80%)]">
                            <defs>
                                <pattern id="packages-dots" width="26" height="26" patternUnits="userSpaceOnUse">
                                    <circle cx="1.6" cy="1.6" r="1.6" fill="currentColor" opacity="0.08" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#packages-dots)" />
                        </svg>
                    </div>

                    <div className={`${wrap} py-10 sm:py-12`}>
                        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500">
                            <Link to="/" className="transition hover:text-brand">Home</Link>
                            <Icon name="chevron" className="size-3.5 -rotate-90" />
                            <span className="font-medium text-brand-dark">Health packages</span>
                        </nav>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">Health checkup packages</h1>
                        <p className="mt-3 max-w-2xl text-slate-600">
                            Preventive checkups that bundle the right tests together, at a lower price than booking them one by one.
                        </p>

                        <div className="mt-7 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-brand/10 ring-1 ring-slate-900/5 transition focus-within:ring-4 focus-within:ring-brand-light/15">
                            <Icon name="search" className="ml-2.5 size-5 shrink-0 text-slate-400" />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => updateSearch(e.target.value)}
                                aria-label="Search packages"
                                placeholder="Search packages or tests, e.g. Full Body"
                                className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base [&::-webkit-search-cancel-button]:hidden"
                            />
                            {search && (
                                <button type="button" onClick={() => updateSearch('')} aria-label="Clear search" className="grid size-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                                    <Icon name="close" className="size-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className={`${wrap} pb-16 pt-10 sm:pb-20`}>
                <ConcernFilter active={concern} onChange={(tag) => setParam('concern', tag)} />

                {/* Toolbar */}
                <div className="mt-10 flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                        Showing <span className="font-semibold text-slate-900">{visible.length}</span> of {packages.length} packages
                        {hasFilters && (
                            <button type="button" onClick={clearFilters} className="ml-3 font-semibold text-brand-light transition hover:text-brand">
                                Clear all filters
                            </button>
                        )}
                    </p>

                    <label className="relative flex items-center gap-2 self-start text-sm text-slate-500 sm:self-auto">
                        <span className="hidden sm:inline">Sort by</span>
                        <select
                            value={sort}
                            onChange={(e) => setParam('sort', e.target.value === 'popular' ? '' : e.target.value)}
                            className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3.5 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-light focus:ring-4 focus:ring-brand-light/15"
                        >
                            {Object.entries(sorts).map(([value, { label }]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                        <Icon name="chevron" className="pointer-events-none absolute right-3 size-4 text-slate-400" />
                    </label>
                </div>

                {/* Results */}
                {visible.length ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {visible.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
                    </div>
                ) : (
                    <div className="mt-6 flex flex-col items-center rounded-3xl bg-slate-50 px-6 py-14 text-center ring-1 ring-slate-200/70">
                        <span className="grid size-14 place-items-center rounded-full bg-white text-brand shadow-sm ring-1 ring-slate-900/5">
                            <Icon name="search" className="size-6" />
                        </span>
                        <h2 className="mt-4 text-lg font-semibold text-slate-900">No packages match your filters</h2>
                        <p className="mt-1 max-w-sm text-sm text-slate-500">Try a different search or clear the filters.</p>
                        <button type="button" onClick={clearFilters} className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand ring-1 ring-slate-200 transition hover:ring-brand-light/40">
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Help banner */}
                <div className="mt-14 flex flex-col items-start gap-5 rounded-3xl bg-linear-to-br from-sky-50 to-indigo-50 p-6 ring-1 ring-slate-200/60 sm:p-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-brand-dark">Need a custom package?</h2>
                        <p className="mt-1 text-sm text-slate-600">Tell us what you need checked and our team will put the right tests together.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a href={tel} className="inline-flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid">
                            <Icon name="phone" className="size-4" />{CONTACT.phone}
                        </a>
                        <a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand ring-1 ring-slate-200 transition hover:ring-brand-light/40">
                            <Icon name="chat" className="size-4" />WhatsApp us
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
