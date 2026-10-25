import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import TestResults from './TestResults'
import TestPackageHeader from '../Header/TestPackageHeader'
import Filters from '../Home/Filters'
import HelpBanner from '../Listing/HelpBanner'
import { concernLabel } from '../../constants/concerns'
import { wrap } from '../../constants/layout'
import { testSorts as sorts } from '../../utils/sorts'

import { useAllTest } from '../../hooks/useTest'

export default function AllTests() {

    const [params, setParams] = useSearchParams()
    const concern = concernLabel[params.get('concern')] ? params.get('concern') : ''
    const type = params.get('type') ?? ''
    const sort = sorts[params.get('sort')] ? params.get('sort') : 'popular'

    const [search, setSearch] = useState(params.get('q') ?? '')

    const setParam = (key, value) => setParams((prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
    }, { replace: true, preventScrollReset: true })

    const clearFilters = () => {
        setSearch('')
        setParams({}, { replace: true, preventScrollReset: true })
    }

    const { data: tests, isPending, isError } = useAllTest()

    const term = (params.get('q') ?? '').trim().toLowerCase()

    const visible = useMemo(() => (tests ?? [])
        .filter((t) => !concern || t.relevance.includes(concern))
        .filter((t) => !type || t.category.toLowerCase() === type)
        .filter((t) => !term || t.name.toLowerCase().includes(term) || 
        t.relevance.some((tag) => (concernLabel[tag] ?? tag).toLowerCase().includes(term)))
        .sort(sorts[sort].compare),
        [tests, concern, type, term, sort])

    const hasFilters = Boolean(term || concern || type)

    return (
        <>
            <TestPackageHeader
                search={search}
                onSearch={setSearch}
                onSubmit={(value) => setParam('q', value)}
                searchLabel="Search tests"
                placeholder="Search tests, e.g. CBC, Thyroid"
            >
                <Filters
                    active={concern}
                    onChange={(tag) => setParam('concern', tag)}
                    items={tests ?? []}
                    noun="test"
                />
            </TestPackageHeader>

            <div className={`${wrap} pb-16 pt-6 sm:pb-20`}>
                <h1 className="text-xl font-bold tracking-tight text-brand-dark sm:text-2xl">Lab tests & scans</h1>
                <p className="mb-4 mt-1 text-sm text-slate-500">Blood tests and imaging with free home sample collection and reports shared online.</p>

                <TestResults
                    tests={visible}
                    total={tests?.length ?? 0}
                    isPending={isPending}
                    isError={isError}
                    hasFilters={hasFilters}
                    onClear={clearFilters}
                    sort={sort}
                    onSort={(value) => setParam('sort', value === 'popular' ? '' : value)}
                    type={type}
                    onTypeChange={(value) => setParam('type', value)}
                />

                <HelpBanner
                    title="Not sure which test to book?"
                    text="Call us and our team will help you choose, or send your prescription on WhatsApp."
                />
            </div>
        </>
    )
}
