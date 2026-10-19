import Icon from '../Icon/Icon'
import Filters from '../Home/Filters'
import TestResults from '../AllTest/TestResults'
import PackageResults from '../AllPackages/PackageResults'
import HelpBanner from '../Listing/HelpBanner'
import ResultTypeToggle from './ResultTypeToggle'
import { wrap } from '../../constants/layout'

export default function SearchResults() {
    // ---------------------------------------------------------------
    // React part - replace these placeholders with your state / URL params / hooks
    // ---------------------------------------------------------------
    const q = ''                         // search term from ?q=
    const search = ''                    // input value
    const concern = ''                   // selected health concern tag
    const view = 'tests'                 // 'tests' | 'packages'
    const tests = []                     // filtered tests to show
    const packages = []                  // filtered packages to show
    const isPending = false
    const isError = false
    const hasFilters = false
    const noop = () => {}

    return (
        <>
            {/* 1. Search box + 2. search by health concern - kept compact so results show without scrolling */}
            <section className={`${wrap} pt-4 sm:pt-6`}>
                <div className="rounded-3xl bg-slate-50 p-3 ring-1 ring-slate-900/5 sm:p-4">
                    <form role="search" onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-900/5 transition focus-within:ring-4 focus-within:ring-brand-light/15">
                        <Icon name="search" className="ml-2.5 size-5 shrink-0 text-slate-400" />
                        <input
                            type="search"
                            value={search}
                            onChange={noop}
                            aria-label="Search tests and packages"
                            placeholder="Search tests or packages, e.g. CBC, Full Body"
                            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
                        />
                        <button type="submit" className="shrink-0 rounded-xl bg-brand-dark px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid sm:px-5">
                            Search
                        </button>
                    </form>

                    <div className="mt-3">
                        <Filters compact active={concern} onChange={noop} />
                    </div>
                </div>
            </section>

            <div className={`${wrap} pb-16 pt-6 sm:pb-20`}>
                {/* 3. Heading + Tests / Packages toggle */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                        <h1 className="text-xl font-bold tracking-tight text-brand-dark sm:text-2xl">
                            Search results for <span className="text-brand-light">“{q}”</span>
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            <span className="font-semibold text-slate-900">{tests.length}</span> tests
                            <span className="mx-2 text-slate-300">·</span>
                            <span className="font-semibold text-slate-900">{packages.length}</span> packages
                        </p>
                    </div>

                    <ResultTypeToggle value={view} onChange={noop} counts={{ tests: tests.length, packages: packages.length }} />
                </div>

                {/* 4. Results - the same results area as /tests or /packages */}
                <div className="mt-4">
                    {view === 'tests' ? (
                        <TestResults
                            tests={tests}
                            total={tests.length}
                            isPending={isPending}
                            isError={isError}
                            hasFilters={hasFilters}
                            onClear={noop}
                            sort="popular"
                            onSort={noop}
                            type=""
                            onTypeChange={noop}
                        />
                    ) : (
                        <PackageResults
                            packages={packages}
                            total={packages.length}
                            isPending={isPending}
                            isError={isError}
                            hasFilters={hasFilters}
                            onClear={noop}
                            sort="popular"
                            onSort={noop}
                        />
                    )}
                </div>

                <HelpBanner
                    title="Can’t find what you’re looking for?"
                    text="Call us and our team will help you find the right test or package, or send your prescription on WhatsApp."
                />
            </div>
        </>
    )
}
