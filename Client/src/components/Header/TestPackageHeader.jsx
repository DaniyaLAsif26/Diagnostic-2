import Icon from '../Icon/Icon'
import HeaderBackdrop from './HeaderBackdrop'
import { wrap } from '../../constants/layout'

// Compact header for the tests, packages and search pages: a search box and a slot for the concern filters.
// `onSubmit` adds a Search button (search page); without it the box filters as you type.
export default function TestPackageHeader({ search, onSearch, onSubmit, searchLabel, placeholder, children }) {
    return (
        <section className="px-2 pt-2 sm:px-4 sm:pt-4">
            <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-slate-50 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                <HeaderBackdrop />

                <div className={`${wrap} py-6 sm:py-8`}>
                    <form
                        role="search"
                        onSubmit={(e) => { e.preventDefault(); onSubmit?.() }}
                        className="flex max-w-2xl items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-brand/10 ring-1 ring-slate-900/5 transition focus-within:ring-4 focus-within:ring-brand-light/15"
                    >
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
                        {onSubmit && (
                            <button type="submit" className="shrink-0 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid sm:px-6">
                                Search
                            </button>
                        )}
                    </form>

                    {children && <div className="mt-6">{children}</div>}
                </div>
            </div>
        </section>
    )
}
