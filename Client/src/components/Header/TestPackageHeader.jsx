import Icon from '../Icon/Icon'
import HeaderBackdrop from './HeaderBackdrop'
import { wrap } from '../../constants/layout'

export default function TestPackageHeader({ search, onSearch, onSubmit, searchLabel, placeholder, children }) {
    return (
        <section className="px-2 pt-2 sm:px-4 sm:pt-4">
            <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-slate-50 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                <HeaderBackdrop />

                <div className={`${wrap} py-4 sm:py-5`}>
                    <form
                        role="search"
                        onSubmit={(e) => { e.preventDefault(); onSubmit(search.trim()) }}
                        className="flex items-center gap-2 rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200 transition focus-within:ring-2 focus-within:ring-brand-light/40"
                    >
                        <Icon name="search" className="ml-2.5 size-4.5 shrink-0 text-slate-400" />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => onSearch(e.target.value)}
                            aria-label={searchLabel}
                            placeholder={placeholder}
                            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 [&::-webkit-search-cancel-button]:hidden"
                        />
                        {search && (
                            <button type="button" onClick={() => onSearch('')} aria-label="Clear search" className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                                <Icon name="close" className="size-4" />
                            </button>
                        )}
                        <button type="submit" className="shrink-0 rounded-lg bg-brand-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-mid sm:px-5">
                            Search
                        </button>
                    </form>

                    {children && <div className="mt-4">{children}</div>}
                </div>
            </div>
        </section>
    )
}
