import TestCard from './TestCard'
import TypeToggle from './TypeToggle'
import ResultsToolbar from '../Listing/ResultsToolbar'
import NoResults from '../Listing/NoResults'
import { testSorts } from '../../utils/sorts'

/**
 * The tests results area: toolbar (count, clear, Lab/Radiology, sort), loading / error / empty states and the card grid.
 * Purely presentational - used by /tests and /search, which own the filtering.
 */
export default function TestResults({ tests, total, isPending, isError, hasFilters, onClear, sort, onSort, type, onTypeChange }) {
    return (
        <>
            <ResultsToolbar
                shown={tests.length}
                total={total}
                noun="test"
                hasFilters={hasFilters}
                onClear={onClear}
                sorts={testSorts}
                sort={sort}
                onSort={onSort}
            >
                <TypeToggle type={type} onChange={onTypeChange} />
            </ResultsToolbar>

            {isPending ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[0, 1, 2, 3].map((i) => <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-100" />)}
                </div>
            ) : isError ? (
                <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">Couldn’t load tests. Please refresh the page.</p>
            ) : tests.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {tests.map((test) => <TestCard key={test.id} test={test} />)}
                </div>
            ) : (
                <NoResults noun="test" onClear={onClear} />
            )}
        </>
    )
}
