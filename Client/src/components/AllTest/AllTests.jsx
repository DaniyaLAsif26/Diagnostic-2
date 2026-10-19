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
    // Filters live in the URL (?q=&concern=&type=&sort=) so home-page links can open a filtered view
    const [params, setParams] = useSearchParams()
    const concern = concernLabel[params.get('concern')] ? params.get('concern') : ''
    const type = params.get('type') ?? ''
    const sort = sorts[params.get('sort')] ? params.get('sort') : 'popular'

    // The input keeps its own state so typing stays smooth; the URL mirrors it
    const [search, setSearch] = useState(params.get('q') ?? '')

    // Sets one filter in the URL without adding history entries or jumping to the top
    const setParam = (key, value) => setParams((prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
    }, { replace: true, preventScrollReset: true })

    const updateSearch = (value) => {
        setSearch(value)
        setParam('q', value.trim())
    }

    const clearFilters = () => {
        setSearch('')
        setParams({}, { replace: true, preventScrollReset: true })
    }

    const { data: tests, isPending, isError } = useAllTest()

    const term = search.trim().toLowerCase()
    const visible = useMemo(() => (tests ?? [])
        .filter((t) => !concern || t.relevance.includes(concern))
        .filter((t) => !type || t.category.toLowerCase() === type)
        .filter((t) => !term || t.name.toLowerCase().includes(term) || t.relevance.some((tag) => (concernLabel[tag] ?? tag).toLowerCase().includes(term)))
        .sort(sorts[sort].compare),
        [tests, concern, type, term, sort])

    const hasFilters = Boolean(term || concern || type)

    return (
        <>
            <TestPackageHeader
                crumb="Tests"
                title="Lab tests & scans"
                text="Book blood tests and imaging at Vision Diagnostic Centre, with free home sample collection and reports shared online."
                search={search}
                onSearch={updateSearch}
                searchLabel="Search tests"
                placeholder="Search tests, e.g. CBC, Thyroid"
            >
                <Filters
                    title="Filter by health concern"
                    subtitle="Pick what you want to check."
                    active={concern}
                    onChange={(tag) => setParam('concern', tag)}
                    items={tests ?? []}
                    noun="test"
                />
            </TestPackageHeader>

            <div className={`${wrap} pb-16 pt-4 sm:pb-20`}>
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
