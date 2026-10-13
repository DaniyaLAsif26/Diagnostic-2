import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { EcgAccent } from '../Common/SectionAccents'
import { CONTACT, tel, whatsapp } from '../../constants/contact'

/* ------------------------------------------------------------------
   Sample data - same shape as the Test model, swap for the API later.
   `relevance` holds the health-concern tags used by the filter.
------------------------------------------------------------------- */

const tests = [
    { id: 1, name: 'Complete Blood Count (CBC)', category: 'LABORATORY', price: 450, offerPrice: 299, isPopular: true, relevance: ['fever'], preparation: '', description: 'Checks red cells, white cells and platelets to screen for infection, anaemia and more.' },
    { id: 2, name: 'Thyroid Profile (T3, T4, TSH)', category: 'LABORATORY', price: 700, offerPrice: 449, isPopular: true, relevance: ['thyroid', 'women'], preparation: '', description: 'Measures thyroid hormones to check for an under- or over-active thyroid.' },
    { id: 3, name: 'TSH (Ultrasensitive)', category: 'LABORATORY', price: 350, offerPrice: 0, isPopular: false, relevance: ['thyroid'], preparation: '', description: 'The main screening test for thyroid function.' },
    { id: 4, name: 'Lipid Profile', category: 'LABORATORY', price: 800, offerPrice: 499, isPopular: true, relevance: ['heart'], preparation: '10–12 hrs fasting', description: 'Cholesterol and triglycerides, to assess your risk of heart disease.' },
    { id: 5, name: 'HbA1c', category: 'LABORATORY', price: 600, offerPrice: 399, isPopular: true, relevance: ['diabetes'], preparation: '', description: 'Average blood sugar over the last 3 months.' },
    { id: 6, name: 'Fasting Blood Sugar', category: 'LABORATORY', price: 100, offerPrice: 60, isPopular: false, relevance: ['diabetes'], preparation: 'Overnight fasting', description: 'Blood glucose after an overnight fast.' },
    { id: 7, name: 'Vitamin D (25-OH)', category: 'LABORATORY', price: 1500, offerPrice: 899, isPopular: true, relevance: ['vitamin', 'bone'], preparation: '', description: 'Checks for vitamin D deficiency, which affects bones and immunity.' },
    { id: 8, name: 'Vitamin B12', category: 'LABORATORY', price: 1100, offerPrice: 649, isPopular: false, relevance: ['vitamin'], preparation: '', description: 'Low B12 can cause tiredness, weakness and numbness.' },
    { id: 9, name: 'Liver Function Test (LFT)', category: 'LABORATORY', price: 900, offerPrice: 549, isPopular: false, relevance: ['liver'], preparation: '8 hrs fasting', description: 'Enzymes, proteins and bilirubin that show how well your liver works.' },
    { id: 10, name: 'Kidney Function Test (KFT)', category: 'LABORATORY', price: 900, offerPrice: 549, isPopular: false, relevance: ['kidney'], preparation: '', description: 'Urea, creatinine and electrolytes to check kidney health.' },
    { id: 11, name: 'Urine Routine & Microscopy', category: 'LABORATORY', price: 250, offerPrice: 0, isPopular: false, relevance: ['kidney', 'fever'], preparation: 'First morning sample', description: 'Screens for urinary infection and kidney problems.' },
    { id: 12, name: 'C-Reactive Protein (CRP)', category: 'LABORATORY', price: 600, offerPrice: 399, isPopular: false, relevance: ['fever', 'heart'], preparation: '', description: 'A marker of inflammation or infection in the body.' },
    { id: 13, name: 'Dengue NS1 Antigen', category: 'LABORATORY', price: 900, offerPrice: 699, isPopular: false, relevance: ['fever'], preparation: '', description: 'Early detection of dengue in the first days of fever.' },
    { id: 14, name: 'Calcium (Serum)', category: 'LABORATORY', price: 300, offerPrice: 0, isPopular: false, relevance: ['bone'], preparation: '', description: 'Calcium level, important for bones, muscles and nerves.' },
    { id: 15, name: 'Uric Acid', category: 'LABORATORY', price: 300, offerPrice: 199, isPopular: false, relevance: ['bone', 'kidney'], preparation: '', description: 'High levels can cause gout and joint pain.' },
    { id: 16, name: 'Iron Studies', category: 'LABORATORY', price: 1200, offerPrice: 799, isPopular: false, relevance: ['women', 'vitamin'], preparation: '', description: 'Iron, ferritin and TIBC to check for iron deficiency.' },
    { id: 17, name: 'IgE (Total)', category: 'LABORATORY', price: 900, offerPrice: 0, isPopular: false, relevance: ['lung'], preparation: '', description: 'Raised levels can point to allergies or asthma.' },
    { id: 18, name: 'Beta hCG', category: 'LABORATORY', price: 800, offerPrice: 549, isPopular: false, relevance: ['women'], preparation: '', description: 'Confirms and monitors pregnancy.' },
    { id: 19, name: 'Chest X-Ray (PA View)', category: 'RADIOLOGY', price: 500, offerPrice: 399, isPopular: true, relevance: ['lung'], preparation: '', description: 'Digital X-ray of the chest for lungs and heart outline.' },
    { id: 20, name: 'ECG', category: 'RADIOLOGY', price: 300, offerPrice: 0, isPopular: false, relevance: ['heart'], preparation: '', description: 'Records the heart’s electrical activity in a few minutes.' },
    { id: 21, name: 'Ultrasound Abdomen', category: 'RADIOLOGY', price: 1500, offerPrice: 1199, isPopular: false, relevance: ['liver', 'kidney'], preparation: '6 hrs fasting, full bladder', description: 'Images the liver, gallbladder, kidneys and other abdominal organs.' },
    { id: 22, name: 'X-Ray Knee (AP & Lateral)', category: 'RADIOLOGY', price: 600, offerPrice: 0, isPopular: false, relevance: ['bone'], preparation: '', description: 'Checks the knee joint for injury or arthritis.' },
    { id: 23, name: 'Ultrasound Pelvis', category: 'RADIOLOGY', price: 1400, offerPrice: 1099, isPopular: false, relevance: ['women'], preparation: 'Full bladder', description: 'Images the uterus, ovaries and bladder.' },
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

const types = [
    { value: '', label: 'All' },
    { value: 'laboratory', label: 'Laboratory', icon: 'tube' },
    { value: 'radiology', label: 'Radiology', icon: 'scan' },
]

const sorts = {
    popular: { label: 'Most popular', compare: (a, b) => Number(b.isPopular) - Number(a.isPopular) || a.name.localeCompare(b.name) },
    'price-asc': { label: 'Price: low to high', compare: (a, b) => finalPrice(a) - finalPrice(b) },
    'price-desc': { label: 'Price: high to low', compare: (a, b) => finalPrice(b) - finalPrice(a) },
    name: { label: 'Name: A to Z', compare: (a, b) => a.name.localeCompare(b.name) },
}

const wrap = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'

const inr = (n) => `₹${n.toLocaleString('en-IN')}`
// offerPrice is 0 when there is no offer; only a lower offer counts as a discount
const onOffer = ({ price, offerPrice }) => offerPrice > 0 && offerPrice < price
const finalPrice = (t) => (onOffer(t) ? t.offerPrice : t.price)

/* ------------------------------------------------------------------
   Pieces
------------------------------------------------------------------- */

function ConcernFilter({ active, onChange }) {
    return (
        <section aria-labelledby="concern-heading" className="mt-8">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 id="concern-heading" className="text-lg font-semibold text-brand-dark">Filter by health concern</h2>
                    <p className="mt-0.5 text-sm text-slate-500">Pick what you want to check.</p>
                </div>
                {active && (
                    <button type="button" onClick={() => onChange('')} className="text-sm font-semibold text-brand-light transition hover:text-brand">
                        Clear
                    </button>
                )}
            </div>

            {/* One row of circles - scrolls sideways on phones */}
            <div className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:justify-between">
                {concerns.map(({ tag, label, icon, tone }) => {
                    const selected = active === tag
                    const count = tests.filter((t) => t.relevance.includes(tag)).length

                    return (
                        <button
                            key={tag}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onChange(selected ? '' : tag)}
                            className="group flex w-24 shrink-0 flex-col items-center gap-2.5 text-center"
                        >
                            <span className={`relative grid size-20 place-items-center rounded-full bg-white transition ${selected ? 'shadow-lg shadow-brand/10 ring-2 ring-brand-light' : 'ring-1 ring-slate-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-brand/5 group-hover:ring-brand-light/30'}`}>
                                <span className={`grid size-14 place-items-center rounded-full transition group-hover:scale-105 ${tone}`}>
                                    <Icon name={icon} className="size-7" />
                                </span>
                                {selected && (
                                    <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-brand-light text-white ring-2 ring-white">
                                        <Icon name="check" className="size-3" />
                                    </span>
                                )}
                            </span>
                            <span>
                                <span className="block text-sm font-semibold leading-tight text-slate-800">{label}</span>
                                <span className="text-xs text-slate-400">{count} test{count === 1 ? '' : 's'}</span>
                            </span>
                        </button>
                    )
                })}
            </div>
        </section>
    )
}

function TestCard({ test }) {
    const isScan = test.category === 'RADIOLOGY'
    const discounted = onOffer(test)

    return (
        <article className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/5 hover:ring-brand-light/30">
            <div className="flex-1 pb-5">
                <div className="flex items-start justify-between gap-3">
                    <span className={`grid size-11 place-items-center rounded-xl ${isScan ? 'bg-teal-50 text-teal-600' : 'bg-sky-50 text-sky-600'}`}>
                        <Icon name={isScan ? 'scan' : 'tube'} className="size-5" />
                    </span>
                    {test.isPopular && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                            <Icon name="star" className="size-3 fill-current" />Popular
                        </span>
                    )}
                </div>

                <h3 className="mt-4 font-semibold leading-snug text-slate-900">{test.name}</h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-400">{isScan ? 'Radiology' : 'Laboratory'}</p>
                {test.description && <p className="mt-2 line-clamp-2 text-sm text-slate-500">{test.description}</p>}

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {test.relevance.map((tag) => (
                        <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{concernLabel[tag] ?? tag}</span>
                    ))}
                </div>

                {test.preparation && (
                    <p className="mt-3 flex w-fit items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">
                        <Icon name="clock" className="size-3.5 shrink-0" />{test.preparation}
                    </p>
                )}
            </div>

            <div className="flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                <div>
                    {discounted && (
                        <p className="flex items-center gap-2 text-xs">
                            <span className="text-slate-400 line-through">{inr(test.price)}</span>
                            <span className="font-semibold text-emerald-600">{Math.round((1 - test.offerPrice / test.price) * 100)}% off</span>
                        </p>
                    )}
                    <p className="text-xl font-bold text-brand-dark">{inr(finalPrice(test))}</p>
                </div>
                <Link to="/#book" className="rounded-xl border border-brand/20 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white">
                    Book
                </Link>
            </div>
        </article>
    )
}

/* ------------------------------------------------------------------
   Page
------------------------------------------------------------------- */

export default function AllTests() {
    // Filters live in the URL (?q=&concern=&type=&sort=) so home-page links can open a filtered view
    const [params, setParams] = useSearchParams()
    const concern = concernLabel[params.get('concern')] ? params.get('concern') : ''
    const type = params.get('type') ?? ''
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

    const term = search.trim().toLowerCase()
    const visible = useMemo(() => tests
        .filter((t) => !concern || t.relevance.includes(concern))
        .filter((t) => !type || t.category.toLowerCase() === type)
        .filter((t) => !term || t.name.toLowerCase().includes(term) || t.relevance.some((tag) => (concernLabel[tag] ?? tag).toLowerCase().includes(term)))
        .sort(sorts[sort].compare),
    [concern, type, term, sort])

    const hasFilters = Boolean(term || concern || type)

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
                                <pattern id="tests-dots" width="26" height="26" patternUnits="userSpaceOnUse">
                                    <circle cx="1.6" cy="1.6" r="1.6" fill="currentColor" opacity="0.08" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#tests-dots)" />
                        </svg>
                    </div>

                    <div className={`${wrap} py-10 sm:py-12`}>
                        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500">
                            <Link to="/" className="transition hover:text-brand">Home</Link>
                            <Icon name="chevron" className="size-3.5 -rotate-90" />
                            <span className="font-medium text-brand-dark">Tests</span>
                        </nav>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">Lab tests & scans</h1>

                        <EcgAccent />
                        <p className="mt-3 max-w-2xl text-slate-600">
                            Book blood tests and imaging at Vision Diagnostic Centre, with free home sample collection and reports shared online.
                        </p>

                        <div className="mt-7 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-brand/10 ring-1 ring-slate-900/5 transition focus-within:ring-4 focus-within:ring-brand-light/15">
                            <Icon name="search" className="ml-2.5 size-5 shrink-0 text-slate-400" />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => updateSearch(e.target.value)}
                                aria-label="Search tests"
                                placeholder="Search tests, e.g. CBC, Thyroid"
                                className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base [&::-webkit-search-cancel-button]:hidden"
                            />
                            {search && (
                                <button type="button" onClick={() => updateSearch('')} aria-label="Clear search" className="grid size-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                                    <Icon name="close" className="size-4" />
                                </button>
                            )}
                        </div>

                        <ConcernFilter active={concern} onChange={(tag) => setParam('concern', tag)} />
                    </div>
                </div>
            </section>

            <div className={`${wrap} pb-16 pt-4 sm:pb-20`}>
                {/* Toolbar */}
                <div className="z-30 sm:sticky sm:top-[73px] -mx-4 flex flex-col gap-4 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
                    <p className="text-sm text-slate-500">
                        Showing <span className="font-semibold text-slate-900">{visible.length}</span> of {tests.length} tests
                        {hasFilters && (
                            <button type="button" onClick={clearFilters} className="ml-3 font-semibold text-brand-light transition hover:text-brand">
                                Clear all filters
                            </button>
                        )}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        <div role="group" aria-label="Type" className="flex rounded-xl bg-slate-100 p-1">
                            {types.map(({ value, label, icon }) => (
                                <button
                                    key={label}
                                    type="button"
                                    aria-pressed={type === value}
                                    onClick={() => setParam('type', value)}
                                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${type === value ? 'bg-white text-brand-dark shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                                >
                                    {icon && <Icon name={icon} className="hidden size-4 sm:block" />}
                                    {label}
                                </button>
                            ))}
                        </div>

                        <label className="relative flex items-center gap-2 text-sm text-slate-500">
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
                </div>

                {/* Results */}
                {visible.length ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {visible.map((test) => <TestCard key={test.id} test={test} />)}
                    </div>
                ) : (
                    <div className="mt-6 flex flex-col items-center rounded-3xl bg-slate-50 px-6 py-14 text-center ring-1 ring-slate-200/70">
                        <span className="grid size-14 place-items-center rounded-full bg-white text-brand shadow-sm ring-1 ring-slate-900/5">
                            <Icon name="search" className="size-6" />
                        </span>
                        <h2 className="mt-4 text-lg font-semibold text-slate-900">No tests match your filters</h2>
                        <p className="mt-1 max-w-sm text-sm text-slate-500">Try a different search or clear the filters.</p>
                        <button type="button" onClick={clearFilters} className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand ring-1 ring-slate-200 transition hover:ring-brand-light/40">
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Help banner */}
                <div className="mt-14 flex flex-col items-start gap-5 rounded-3xl bg-linear-to-br from-sky-50 to-indigo-50 p-6 ring-1 ring-slate-200/60 sm:p-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-brand-dark">Not sure which test to book?</h2>
                        <p className="mt-1 text-sm text-slate-600">Call us and our team will help you choose, or send your prescription on WhatsApp.</p>
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
