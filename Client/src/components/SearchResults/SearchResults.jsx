import TestPackageHeader from '../Header/TestPackageHeader'
import Filters from '../Home/Filters'
import TestResults from '../AllTest/TestResults'
import PackageResults from '../AllPackages/PackageResults'
import HelpBanner from '../Listing/HelpBanner'
import ResultTypeToggle from './ResultTypeToggle'
import { wrap } from '../../constants/layout'

import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useSearchResults } from '../../hooks/useSearch'

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();

    const term = searchParams.get('q') ?? ''

    const { tests, packages, isPending, isError } = useSearchResults(term)

    const [view , setView] = useState('tests')

    const search = ''                    // input value
    const concern = ''                   // selected health concern tag
    const hasFilters = false
    const noop = () => { }

    return (
        <>
            {/* 1. Search box + 2. search by health concern */}
            <TestPackageHeader
                search={search}
                onSearch={noop}
                onSubmit={noop}
                searchLabel="Search tests and packages"
                placeholder="Search tests or packages, e.g. CBC, Full Body"
            >
                <Filters active={concern} onChange={noop} />
            </TestPackageHeader>

            <div className={`${wrap} pb-16 pt-6 sm:pb-20`}>
                {/* 3. Heading + Tests / Packages toggle */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                        <h1 className="text-xl font-bold tracking-tight text-brand-dark sm:text-2xl">
                            Search results for <span className="text-brand-light">“{term}”</span>
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            <span className="font-semibold text-slate-900">{tests.length}</span> tests
                            <span className="mx-2 text-slate-300">·</span>
                            <span className="font-semibold text-slate-900">{packages.length}</span> packages
                        </p>
                    </div>

                    <ResultTypeToggle value={view} onChange={setView} counts={{ tests: tests.length, packages: packages.length }} />
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
