import PackageCard from './PackageCard'
import ResultsToolbar from '../Listing/ResultsToolbar'
import NoResults from '../Listing/NoResults'
import { packageSorts } from '../../utils/sorts'

/**
 * The packages results area: toolbar (count, clear, sort), loading / error / empty states and the card grid.
 * Purely presentational - used by /packages and /search, which own the filtering.
 */
export default function PackageResults({ packages, total, isPending, isError, hasFilters, onClear, sort, onSort }) {
    return (
        <>
            <ResultsToolbar
                shown={packages.length}
                total={total}
                noun="package"
                hasFilters={hasFilters}
                onClear={onClear}
                sorts={packageSorts}
                sort={sort}
                onSort={onSort}
            />

            {isPending ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2].map((i) => <div key={i} className="h-96 animate-pulse rounded-3xl bg-slate-100" />)}
                </div>
            ) : isError ? (
                <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">Couldn’t load packages. Please refresh the page.</p>
            ) : packages.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
                </div>
            ) : (
                <NoResults noun="package" onClear={onClear} />
            )}
        </>
    )
}
