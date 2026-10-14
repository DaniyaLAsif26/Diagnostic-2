import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import Icon from '../Icon/Icon'
import TestCard from './TestCard'
import { tests } from '../../constants/tests'
import Filters from '../Home/Filters'
import { concernLabel } from '../../constants/concerns'
import { EcgAccent } from '../Common/SectionAccents'
import { CONTACT, tel, whatsapp } from '../../constants/contact'
import { wrap } from '../../constants/layout'
import { finalPrice } from '../../utils/price'

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

                        <div className="mt-8">
                            <Filters
                                title="Filter by health concern"
                                subtitle="Pick what you want to check."
                                active={concern}
                                onChange={(tag) => setParam('concern', tag)}
                                items={tests}
                                noun="test"
                            />
                        </div>
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
