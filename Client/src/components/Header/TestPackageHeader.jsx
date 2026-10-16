import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import HeaderBackdrop from './HeaderBackdrop'
import { EcgAccent } from '../Common/SectionAccents'
import { wrap } from '../../constants/layout'

// Page header for the tests and packages listings: breadcrumb, title, search box and a slot for filters
export default function TestPackageHeader({ crumb, title, text, search, onSearch, searchLabel, placeholder, children }) {
    return (
        <section className="px-2 pt-2 sm:px-4 sm:pt-4">
            <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-slate-50 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                <HeaderBackdrop />

                <div className={`${wrap} py-10 sm:py-12`}>
                    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Link to="/" className="transition hover:text-brand">Home</Link>
                        <Icon name="chevron" className="size-3.5 -rotate-90" />
                        <span className="font-medium text-brand-dark">{crumb}</span>
                    </nav>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">{title}</h1>
                    <EcgAccent />
                    <p className="mt-3 max-w-2xl text-slate-600">{text}</p>

                    <div className="mt-7 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-brand/10 ring-1 ring-slate-900/5 transition focus-within:ring-4 focus-within:ring-brand-light/15">
                        <Icon name="search" className="ml-2.5 size-5 shrink-0 text-slate-400" />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => onSearch(e.target.value)}
                            aria-label={searchLabel}
                            placeholder={placeholder}
                            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base [&::-webkit-search-cancel-button]:hidden"
                        />
                        {search && (
                            <button type="button" onClick={() => onSearch('')} aria-label="Clear search" className="grid size-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                                <Icon name="close" className="size-4" />
                            </button>
                        )}
                    </div>

                    {children && <div className="mt-8">{children}</div>}
                </div>
            </div>
        </section>
    )
}
