import Icon from '../Icon/Icon'

// Sticky bar above the results: count, clear link, optional extra controls and the sort menu
export default function ResultsToolbar({ shown, total, noun, hasFilters, onClear, sorts, sort, onSort, children }) {
    return (
        <div className={`z-30 -mx-4 flex flex-col gap-4 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:sticky sm:top-[73px] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ${children ? 'lg:flex-row lg:items-center lg:justify-between' : 'sm:flex-row sm:items-center sm:justify-between'}`}>
            <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-slate-900">{shown}</span> of {total} {noun}s
                {hasFilters && (
                    <button type="button" onClick={onClear} className="ml-3 font-semibold text-brand-light transition hover:text-brand">
                        Clear all filters
                    </button>
                )}
            </p>

            <div className="flex flex-wrap items-center gap-3">
                {children}

                <label className="relative flex items-center gap-2 text-sm text-slate-500">
                    <span className="hidden sm:inline">Sort by</span>
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
    )
}
