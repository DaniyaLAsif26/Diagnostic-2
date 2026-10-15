import Icon from '../Icon/Icon'

// Shown when the search and filters match nothing
export default function NoResults({ noun, onClear }) {
    return (
        <div className="mt-6 flex flex-col items-center rounded-3xl bg-slate-50 px-6 py-14 text-center ring-1 ring-slate-200/70">
            <span className="grid size-14 place-items-center rounded-full bg-white text-brand shadow-sm ring-1 ring-slate-900/5">
                <Icon name="search" className="size-6" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">No {noun}s match your filters</h2>
            <p className="mt-1 max-w-sm text-sm text-slate-500">Try a different search or clear the filters.</p>
            <button type="button" onClick={onClear} className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand ring-1 ring-slate-200 transition hover:ring-brand-light/40">
                Clear filters
            </button>
        </div>
    )
}
