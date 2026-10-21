import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Icon from '../Icon/Icon'
import {useSearch} from '../../hooks/useSearch'
import { slugify } from '../../utils/slug'
import { inr, finalPrice } from '../../utils/price'

function ResultRow({ to, icon, name, type, price }) {
    return (
        <Link to={to} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-slate-100">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/5 text-brand">
                <Icon name={icon} className="size-4.5" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-slate-900">{name}</span>
                <span className="text-xs text-slate-500">{type}</span>
            </span>
            <span className="text-sm font-bold text-brand-dark">{inr(price)}</span>
        </Link>
    )
}

/** Hero search: suggestions open their detail page, the search icon / button opens /search?q=... */
export default function HeroSearch() {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)

    const { tests, packages, hasQuery, isSearching } = useSearch(query)
    const term = query.trim()

    const submit = (e) => {
        e.preventDefault()
        if (term) navigate(`/search?q=${encodeURIComponent(term)}`)
    }

    return (
        <form
            role="search"
            onSubmit={submit}
            onFocus={() => setOpen(true)}
            // close only when focus leaves the whole search (not when moving into the dropdown)
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
            className="relative mt-8 max-w-xl"
        >
            <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-brand/10 ring-1 ring-slate-900/5 transition focus-within:ring-4 focus-within:ring-brand-light/15">
                <button type="submit" aria-label="See all results" className="ml-0.5 grid size-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:text-brand">
                    <Icon name="search" className="size-5" />
                </button>
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search tests and packages"
                    placeholder="Search tests or packages, e.g. CBC"
                    autoComplete="off"
                    className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
                />
                <button type="submit" className="shrink-0 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid sm:px-6">
                    Search
                </button>
            </div>

            {open && hasQuery && (
                // preventDefault keeps focus in the input, so clicks inside never close the dropdown first
                <div onMouseDown={(e) => e.preventDefault()} className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl bg-white shadow-2xl shadow-brand/15 ring-1 ring-slate-900/5">
                    <div className="max-h-80 overflow-y-auto p-2">
                        {tests.map((t) => (
                            <ResultRow
                                key={`test-${t.id}`}
                                to={`/test/${slugify(t.name)}/${t.id}`}
                                icon={t.category === 'RADIOLOGY' ? 'scan' : 'tube'}
                                name={t.name}
                                type={t.category === 'RADIOLOGY' ? 'Scan' : 'Lab test'}
                                price={finalPrice(t)}
                            />
                        ))}
                        {packages.map((p) => (
                            <ResultRow
                                key={`package-${p.id}`}
                                to={`/package/${slugify(p.name)}/${p.id}`}
                                icon="package"
                                name={p.name}
                                type={`Package · ${p.tests.length} tests`}
                                price={finalPrice(p)}
                            />
                        ))}
                        {!tests.length && !packages.length && (
                            <p className="px-3 py-6 text-center text-sm text-slate-500">
                                {isSearching ? 'Searching…' : `No matches for “${term}”`}
                            </p>
                        )}
                    </div>

                    <button type="submit" className="flex w-full items-center justify-between border-t border-slate-100 px-4 py-3 text-sm font-semibold text-brand-light transition hover:bg-slate-50">
                        See all results for “{term}”
                        <Icon name="arrow" className="size-4" />
                    </button>
                </div>
            )}
        </form>
    )
}
