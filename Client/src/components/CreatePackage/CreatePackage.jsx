import TestPackageHeader from '../Header/TestPackageHeader'
import Filters from '../Home/Filters'
import ResultsToolbar from '../Listing/ResultsToolbar'
import TypeToggle from '../AllTest/TypeToggle'
import HelpBanner from '../Listing/HelpBanner'
import SelectableTestCard from './SelectableTestCard'
import PackageCart from './PackageCart'
import { wrap } from '../../constants/layout'
import { testSorts } from '../../utils/sorts'
import { useSearchParams } from 'react-router-dom'
import { useAllTest } from '../../hooks/useTest'

import { tests } from '../../constants/tests'
import { useMemo, useState } from 'react'
const selected = tests.filter((t) => [1, 2, 4, 19].includes(t.id))
const noop = () => { }


export default function CreatePackage() {

    const [searchParams, setSearchParams] = useSearchParams()

    const term = searchParams.get('q') || ''

    const [search, setSearch] = useState(term || '')

    const setParams = (key, value) => setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
    }, { replace: true, preventScrollReset: true })

    const { data: allTests = [] } = useAllTest()

    const tests = useMemo(
        () => allTests.filter((t) => !term || t.name.toLowerCase().includes(term.trim().toLowerCase())),
        [allTests, term]
    )

    return (
        <>
            <TestPackageHeader
                search={search}
                onSearch={setSearch}
                onSubmit={(value) => setParams('q' , value)}
                searchLabel="Search tests"
                placeholder="Search tests to add, e.g. CBC, Thyroid">

                <Filters
                    onChange={noop}
                    items={tests}
                    noun="test" />

            </TestPackageHeader>

            <div className={`${wrap} pb-10 pt-6`}>
                <h1 className="text-xl font-bold tracking-tight text-brand-dark sm:text-2xl">Create your own package</h1>
                <p className="mb-4 mt-1 text-sm text-slate-500">Add the tests you need, then tap Review to name your package and see the total.</p>

                <ResultsToolbar
                    shown={tests.length}
                    total={tests.length}
                    noun="test"
                    sorts={testSorts}
                    sort="popular"
                    onSort={noop}>

                    <TypeToggle type="" onChange={noop} />

                </ResultsToolbar>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {tests.map((test) =>
                        <SelectableTestCard
                            key={test.id}
                            test={test}
                            checked={selected.includes(test)} />
                    )}
                </div>

                <HelpBanner
                    title="Not sure which tests to add?"
                    text="Call us and our team will help you build the right package, or send your prescription on WhatsApp."
                />
            </div>

            <PackageCart tests={selected} />
        </>
    )
}
