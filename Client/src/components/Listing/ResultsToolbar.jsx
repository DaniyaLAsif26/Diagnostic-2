import Icon from '../Icon/Icon'
import { wrap } from '../../constants/layout'

export default function ResultsToolbar({ shown, total, noun, hasFilters, onClear, sorts, sort, onSort, children }) {
    return (
        // Outer bar breaks out of the page container to span the full viewport; the inner row keeps the content aligned with the page
        <div className="z-30 mx-[calc(50%-50vw)] border-y border-slate-200 bg-slate-100/90 shadow-[0_10px_20px_-14px_rgba(15,27,61,0.35)] backdrop-blur sm:sticky sm:top-[61px]">
            <div className={`${wrap} flex flex-col gap-3 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-2 sm:py-2`}>
                <p className="text-sm text-slate-500">
                    Showing <span className="font-semibold text-slate-900">{shown}</span> of {total} {noun}s
                    {hasFilters && (
                        <button type="button" onClick={onClear} className="ml-3 font-semibold text-brand-light transition hover:text-brand">
                            Clear all filters
                        </button>
                    )}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                    {children}

                    <label className="relative flex items-center gap-2 text-sm text-slate-500">
                        <span className="hidden md:inline">Sort by</span>
                        <select
                            value={sort}
                            onChange={(e) => onSort(e.target.value)}
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
        </div>
    )
}
